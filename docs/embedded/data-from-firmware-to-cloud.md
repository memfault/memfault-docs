---
id: data-from-firmware-to-the-cloud
title: Data from Firmware to the Cloud
sidebar_label: Data from Firmware to the Cloud
---

## Introduction

A part of integrating the Memfault Firmware SDK inside your devices' firmware is
to create a path to the Memfault cloud. The SDK will collect data from your
devices in the field such as coredumps, heartbeats and events. This data needs
to be sent to the Memfault cloud for analysis.

The ways in which devices get data back to the internet varies a lot. Some
devices have a direct internet connection, for example, through an LTE modem.
Others are indirectly connected and send data back through a "gateway" of sort,
for example by connecting over Bluetooth to a phone app that relays the data
back to the internet.

To make the integration as easy as possible while catering to as many different
connectivity paths, the
[Memfault Firmware SDK contains a "data packetizer"](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/include/memfault/core/data_packetizer.h).
The data packetizer breaks up all data that the SDK needs to send out
(heartbeats, coredumps, events, etc.) into smaller pieces called _chunks_. The
chunks can be sized as large or small as required to match the capabilities and
constraints of the device and its connectivity stack.

Each of these chunks need to be posted to Memfault's
[chunks HTTP API](https://api-docs.memfault.com/). The buffering, reassembly and
interpretation of the chunks is done by the Memfault cloud.

Building the path between getting chunks from the SDK to posting them to the
HTTP API is the only integration work which needs to be done to get the data

## Implementation Notes

- The mechanism to send the chunks back to the Memfault cloud will need to be
  _reliable_. By that we mean that data integrity is checked and that chunks are
  not dropped unknowingly (and are retransmitted in case of data corruption or
  drops). Missing data and corrupt data errors will be _detected_ by the
  Memfault cloud, but those chunks will be discarded.
- The device firmware is expected to periodically check whether there is data
  available and send the chunks out. See the
  [data_packetizer.h](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/include/memfault/core/data_packetizer.h)
  header file for the C API.
- The Memfault cloud buffers chunks, until the sequence of related chunks are
  received. However, if it takes a prolonged period of time to post the
  remainder of the related chunks, the chunks may be dropped. Because of this
  and to minimize reporting latencies, it is recommended to drain the data
  packetizer at least daily.
- Chunks from a given device need to be posted to the
  [chunks HTTP API](https://api-docs.memfault.com/) sequentially, in the order
  in which the Firmware SDK's packetizer created the chunks. When posting chunks
  concurrently, ensure that requests for _the same device_ cannot happen
  concurrently, to avoid violating the ordering requirement.
- To minimize overhead and optimize throughput, batch-upload chunks to the
  [chunks HTTP API](https://api-docs.memfault.com/) using `multipart/mixed`
  requests and re-use HTTP connections to Memfault's servers.
- The smallest allowed chunk size is 9 bytes. That said, it is recommended to
  use the largest possible chunk size that your transport path allows. Smaller
  chunk sizes generally equate to slower transfers. The (maximum) chunk size can
  be changed from chunk to chunk (see the
  [memfault_packetizer_get_next C API](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/include/memfault/core/data_packetizer.h)).

## Firmware SDK Example Usage

### Basic Operation Mode

In this mode a call to `memfault_packetizer_get_next` always returns a complete
"chunk". The size of the "chunk" is completely up to you (just needs to be ≥9
bytes). It is your responsibility to get the "chunk" reliably to the Memfault
cloud. Typically, the size of the chunk will align with the MTU size of the
underlying transport. Some size examples:

- For BLE, the "chunk" size may be close to 20 bytes to align with the minimal
  MTU size (23 bytes)
- For a network stack, the "chunk" size may be closer to 1500 bytes to align
  with the size of an ethernet frame

#### Example Code

```c
#include "memfault/core/data_packetizer.h"

//! Example usage of "Basic Operation Mode" of Packetizer
//! return true if there is more data to send, false otherwise
bool try_send_memfault_data(void) {
  // buffer to copy chunk data into
  uint8_t buf[USER_CHUNK_SIZE];
  size_t buf_len = sizeof(buf);

  bool data_available = memfault_packetizer_get_chunk(buf, &buf_len);
  if (!data_available ) {
    return false; // no more data to send
  }

  // send payload collected to chunks/ endpoint
  user_transport_send_chunk_data(buf, buf_len);
  return true;
}
```

### Advanced Operation Mode

The Memfault packetizer has two API calls that operate as a pair,
`memfault_packetizer_begin` and `memfault_packetizer_get_next`:

- `memfault_packetizer_begin(...)` lets you configure the operation mode of the
  packetizer and returns true if there is more data to send
- `memfault_packetizer_get_next(...)` fills a user provided buffer with the next
  "chunk" of data to send out over the transport

In this mode, the packetizer is capable of building "chunks" which span multiple
calls to `memfault_packetizer_get_next()`. This mode can be used as an
optimization when a transport is capable of sending messages of an arbitrarily
large size.

For example, some use case examples include a raw TCP socket or a serial
streaming abstraction such as Bluetooth Classic SPP.

In these situations it's unlikely the entire message could be read into RAM all
at once so the API can be configured to split the read of the chunk across
multiple `memfault_packetizer_get_next()` calls.

#### Example Code

```c
#include "memfault/core/data_packetizer.h"

//! Example Usage of "Advanced Operation Mode" where a single "chunk" spans multiple calls
//! to `memfault_packetizer_get_next()`. This lets us keep the RAM footprint low while
//! sending large payloads in a single HTTP request
bool send_memfault_data_multi_part(void) {
  const sPacketizerConfig cfg = {
    // Enable multi packet chunking. This means a chunk may span multiple calls to
    // memfault_packetizer_get_next().
    .enable_multi_packet_chunk = true,
  };

  sPacketizerMetadata metadata;
  bool data_available = memfault_packetizer_begin(&cfg, &metadata);
  if (!data_available) {
    // there are no more chunks to send
    MEMFAULT_LOG_INFO("All data has been sent!");
    return false;
  }

  // Note: metadata.single_chunk_message_length contains the entire length of the chunk
  //
  // This is the "Content-Length" for the HTTP POST request to the Memfault "chunks" endpoint
  //
  // When using HTTP directly on your device, this is where you would start the http request and
  // build the headers

  while (1) {
    uint8_t buffer[20];
    size_t read_size = sizeof(buffer);

    // We pass in the buffer to fill and the size of the buffer.
    // On return, read_size will be populated with how much data was actually written
    eMemfaultPacketizerStatus packetizer_status = memfault_packetizer_get_next(buffer, &read_size);
    if (packetizer_status == kMemfaultPacketizerStatus_NoMoreData) {
      // We know data is available from the memfault_packetizer_begin() call above
      // so _NoMoreData is an unexpected result
      MEMFAULT_LOG_ERROR("Unexpected packetizer status: %d", (int)packetizer_status);
      break;
    }

    // this is the call to a system specific function for sending data over the transport
    send_data_over_socket(buffer, read_size);

    if (packetizer_status == kMemfaultPacketizerStatus_EndOfChunk) {
      // we have reached the end of the chunk
      break;
    }
  }

  return true;
}
```

### Asynchronous Operation Mode

Occasionally, you may want to read data from one of the data sources the
packetizer is accessing in an asynchronous / event driven fashion. For example,
this may be desirable if a bare metal environment is being used and coredumps
are being saved to a storage medium which can be slow to access (such as
external flash).

There are several properties of the SDK packetizer that are helpful for
achieving this behavior:

1. The packetizer guarantees individual data sources (i.e platform coredump
   storage) will be read sequentially.
2. Each call to `memfault_packetizer_get_chunk()` will result in exactly _one_
   read to the data source which is active. The size of the read will be less
   than or equal to the size of the chunk requested.
3. The Memfault SDK allows for different APIs to be used when saving data and
   when reading back data via the packetizer. For the "coredump" feature,
   [`memfault_coredump_read()`](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/panics/include/memfault/panics/platform/coredump.h#L106-L118)
   is the routine which is called when reading data from the packetizer.

These features are all verified on each release as part of the Memfault Firmware
SDK
[unit test suite](https://github.com/memfault/memfault-firmware-sdk/tree/master/tests).

Using these features, we can easily load data from a slower storage in an
asynchronous fashion. Once the data has been preloaded, we can then call
Memfault packetizer APIs. Let's walk some example code for how asynchronous
reads to coredump storage could be achieved.

#### Example Code

:::note
In order to operate in asychronous operation mode, RLE data source
compression must be disabled. This is because RLE Compression requires several
passes over the underlying data. The feature can be disabled by either
removing `memfault_data_source_rle.c` from your build system or by adding the
define `MEMFAULT_DATA_SOURCE_RLE_ENABLED=0` to your compilation flags.
:::

```c
#include "memfault/core/data_packetizer.h"

bool try_send_memfault_data(void) {
  uint8_t buffer[USER_CHUNK_SIZE];

  bool async_call_dispatched = memfault_platform_coredump_prepare_async(USER_CHUNK_SIZE);
  if (async_call_dispatched) {
    // we need to wait for the call to complete before we can load new data
    // via memfault_packetizer_get_chunk()
    return false;
  }

  size_t read_size = sizeof(buffer);
  bool data_available = memfault_packetizer_get_chunk(buffer, &read_size);
  if (!data_available) {
    return false;
  }

  //! this is a call to the system specific function which sends the data
  send_ble_gatt_packet(buffer, read_size);
  return true;
}
```

and then in the platform coredump code,
`memfault_platform_coredump_prepare_async()` would look something like:

```c
//! Structure used to track data which has been preloaded prior to making
//! calls to `memfault_packetizer_get_chunk()`
typedef struct {
  // buffer to hold pre-loaded data
  // Size just needs to be >= the chunk size that will be read
  uint8_t buf[128];
  // the amount of data which has been loaded
  uint32_t bytes_loaded;
  // the address the buffer starts at. So, for example, if the buffer holds bytes from offset 200-240
  // of coredump storage, this value would be 200
  uint32_t start_addr;
  // the offset within 'buf' that last call to memfault_coredump_read() ended at
  uint32_t last_read_offset;
} sMfltCoredumpAsyncReadBuf;

static sMfltCoredumpAsyncReadBuf s_read_buf;

//! Checks to see if more coredump data needs to be loaded from slow storage prior to invoking the
//! next `memfault_packetizer_get_chunk()` call
//!
//! @return true if an asynchronous read operation was dispatched, else true if
//! `memfault_packetizer_get_chunk()` can be called immediately
bool memfault_platform_coredump_prepare_async(size_t next_chunk_size) {
  const size_t bytes_remaining = s_read_buf.bytes_loaded - s_read_buf.last_read_offset;
  if (bytes_remaining > next_chunk_size) {
    // we have enough data pre-loaded for the next memfault_packetizer_get_chunk()
    // call to succeed
    return false;
  }

  sMfltCoredumpStorageInfo info;
  memfault_platform_coredump_storage_get_info(&info);
  const size_t start_addr = s_read_buf.start_addr + s_read_buf.last_read_offset;
  const size_t bytes_to_read = MEMFAULT_MIN(sizeof(s_read_buf.buf), info.size - start_addr);

  s_read_buf.start_addr = start_addr;
  s_read_buf.last_read_offset = start_addr;
  s_read_buf.bytes_loaded = bytes_to_read;

  // Call async read routine for flash storage and let caller know we will have to wait for a result
  user_coredump_storage_read_async(start_addr, &s_read_buf.buf, bytes_to_read);
  return true;
}
```

Then `memfault_coredump_read()` can just access data from the `s_read_buf` we
populated asynchronously.

```c
bool memfault_coredump_read(uint32_t offset, void *data, size_t read_len) {
  if (offset < s_read_buf.start_addr ||
      ((offset + read_len) > (s_read_buf.start_addr + s_read_buf.bytes_loaded))) {
    // This means memfault_platform_coredump_prepare_async() was not
    // run prior to calling `memfault_packetizer_get_chunk()` and should never happen
    return false;
  }

  const size_t read_offset = offset - s_read_buf.start_addr;
  const uint8_t *read_ptr = &s_read_buf.buf[read_offset];
  memcpy(data, read_ptr, read_len);
  s_read_buf.last_read_offset = read_offset + read_len;
  return true;
}
```

Finally, when the data is cleared at the end of reading the data source, we
reset the ram buffer so it looks empty and dispatch an erase to the backing
storage.

```c
void memfault_platform_coredump_storage_clear(void) {
  // reset pre-loaded storage to offset zero and "erase" the data by
  // populating the buffer with all zeros
  s_read_buf = (sMfltCoredumpAsyncReadBuf) {
    .bytes_loaded = sizeof(s_read_buf.buf),
    .start_addr = 0,
    .last_read_offset = 0,
  };

  // erase backing flash storage as well
  user_coredump_storage_erase_async();
}
```
