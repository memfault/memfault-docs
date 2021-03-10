---
id: event-serialization-overview
title: Event Serialization
sidebar_label: Event Serialization
---

This article walks through the serialization strategy used by the Memfault
[Metrics Component](/docs/embedded/metrics-api) and event subsystem in the
[memfault-firmware-sdk](https://github.com/memfault/memfault-firmware-sdk). It
also discusses the advantages of the approach over other standard embedded
serialization strategies by walking through a real-world example.

## Design Goals

- Minimize Serialization Overhead
  - Minimize bandwidth costs (such as situations where a cellular connection is
    in use).
  - Maximize the amount of data that can be sent over slow data transports such
    as LoRa or BLE.
  - Minimize the amount of RAM or flash storage needed to batch up events while
    a device is offline.
- Flexible Schema
  - Over the lifecycle of a device, the metrics being tracked will evolve.
    Adding or removing a tracker should be a few line change and not require
    writing migration handlers or require coordinating release updates between
    many teams within an organization (e.g firmware/mobile/cloud).
- Small RAM and Code Footprint
  - Solution must scale down to devices with kBs of Flash & RAM to accommodate
    the most deeply embedded devices.

## Comparison Summary

In the sections below we will walk through the pros and cons of various
serialization strategies. A quick summary of the highlights can be found in the
table below.

| Encoding        | Example Payload <br/> Encode Size (bytes) | Arch Agnostic<br/> Value Encodings | No Mobile/Cloud Changes needed <br/> when fields are added | Compact Key Representation <br/> (Not a String) | Integers Compressed <br/> based on Magnitude | No Custom Migration Handlers Required |
| --------------- | :---------------------------------------: | :--------------------------------: | :--------------------------------------------------------: | :---------------------------------------------: | :------------------------------------------: | :-----------------------------------: |
| JSON            |                    471                    |                 ✅                 |                             ✅                             |                       ❌                        |                      ❌                      |                  ✅                   |
| MsgPack         |                    399                    |                 ✅                 |                             ✅                             |                       ❌                        |                      ✅                      |                  ✅                   |
| Protobuf        |                    72                     |                 ✅                 |                             ❌                             |                       ✅                        |                      ✅                      |                  ✅                   |
| packed c struct |                    69                     |                 ❌                 |                             ❌                             |                       ✅                        |                      ❌                      |                  ❌                   |
| Memfault        |                    68                     |                 ✅                 |                             ✅                             |                       ✅                        |                      ✅                      |                  ✅                   |

## Example Payload

For comparison, let's walk through encoding a typical heartbeat metric used for
tracking the health of a BLE based iOT device:

```json
{
  "schema_version": 1,
  "device_serial": "D12345678",
  "software_type": "nrf52",
  "software_version": "1.0.0",
  "hardware_version": "evt",
  "event_info": {
    "BleAppConnectTimeMs": 1000,
    "BleAvgConnIntervalMs": 200,
    "BleAvgRssi": -54,
    "BleBytesTransferred": 20000,
    "BleConnParamChangeReq": 10,
    "BleCrcErrors": 4,
    "BleDisconnectedTimeMs": 600000,
    "BleMicErrors": 0,
    "BleNumDisconnects": 3,
    "BleStackHwm": 3000,
    "BleTxBufferFullErrors": 0,
    "MemfaultSdkMetric_IntervalMs": 3600000,
    "MemfaultSdkMetric_RebootCount": 0
  }
}
```

## Serialization Options

### JSON Encoding

One approach for embedded devices is just sending JSON. This gives us a very
flexible way to add and remove arbitrary key value pairs. However, C based JSON
encoders wind up consuming a lot of RAM and flash space and often wind up being
handwritten because no standard C implementation for embedded devices exists.

Even if we minify (strip the whitespace from) the example above, the event
message payload winds up being 471 bytes!

### MessagePack / CBOR

One way we can optimize the size of the JSON is to use
[MsgPack](https://msgpack.org/index.html) (or CBOR). This still lets us flexibly
add and remove key value pairs but encodes the values in a compressed binary
form. For example, the largest uint32_t value (4294967295) can be encoded in 5
bytes instead of the 10 it would take up with JSON.

Using msgpack we can reduce the minified size down to 399 bytes (15%):

```
// xxd dump of msgpack encoding
00000000: 86ae 7363 6865 6d61 5f76 6572 7369 6f6e  ..schema_version
00000010: 01ad 6465 7669 6365 5f73 6572 6961 6ca9  ..device_serial.
00000020: 4431 3233 3435 3637 38ad 736f 6674 7761  D12345678.softwa
00000030: 7265 5f74 7970 65a5 6e72 6635 32b0 736f  re_type.nrf52.so
00000040: 6674 7761 7265 5f76 6572 7369 6f6e a531  ftware_version.1
00000050: 2e30 2e30 b068 6172 6477 6172 655f 7665  .0.0.hardware_ve
00000060: 7273 696f 6ea3 6576 74aa 6576 656e 745f  rsion.evt.event_
00000070: 696e 666f 8db3 426c 6541 7070 436f 6e6e  info..BleAppConn
00000080: 6563 7454 696d 654d 73cd 03e8 b442 6c65  ectTimeMs....Ble
00000090: 4176 6743 6f6e 6e49 6e74 6572 7661 6c4d  AvgConnIntervalM
000000a0: 73cc c8aa 426c 6541 7667 5273 7369 d0ca  s...BleAvgRssi..
000000b0: b342 6c65 4279 7465 7354 7261 6e73 6665  .BleBytesTransfe
000000c0: 7272 6564 cd4e 20b5 426c 6543 6f6e 6e50  rred.N .BleConnP
000000d0: 6172 616d 4368 616e 6765 5265 710a ac42  aramChangeReq..B
000000e0: 6c65 4372 6345 7272 6f72 7304 b542 6c65  leCrcErrors..Ble
000000f0: 4469 7363 6f6e 6e65 6374 6564 5469 6d65  DisconnectedTime
00000100: 4d73 ce00 0927 c0ac 426c 654d 6963 4572  Ms...'..BleMicEr
00000110: 726f 7273 00b1 426c 654e 756d 4469 7363  rors..BleNumDisc
00000120: 6f6e 6e65 6374 7303 ab42 6c65 5374 6163  onnects..BleStac
00000130: 6b48 776d cd0b b8b5 426c 6554 7842 7566  kHwm....BleTxBuf
00000140: 6665 7246 756c 6c45 7272 6f72 7300 bc4d  ferFullErrors..M
00000150: 656d 6661 756c 7453 646b 4d65 7472 6963  emfaultSdkMetric
00000160: 5f49 6e74 6572 7661 6c4d 73ce 0036 ee80  _IntervalMs..6..
00000170: bd4d 656d 6661 756c 7453 646b 4d65 7472  .MemfaultSdkMetr
00000180: 6963 5f52 6562 6f6f 7443 6f75 6e74 00    ic_RebootCount.
```

### Protobuf

We can see from the binary dump above, a main reason our binary payload is so
large is because the key names are all encoded as strings which takes up a lot
of space. One way to reduce this is to use a structured serialization format. A
typical approach is to use
[protobuf](https://developers.google.com/protocol-buffers/).

With Protobuf, key names are encoded with an integer "field number" and like
MsgPack integers are encoded using a variable length scheme so that small
integer numbers can be represented in very few bytes.

A user must define a representation of the data to be serialized in a ".proto"
file and then can autogenerate code to assist packing and unpacking the data.
For embedded devices, [nanopb](https://github.com/nanopb/nanopb) is a popular
library used for the actual encoding.

#### Proto Definitions for Example Payload

```c
// heartbeat.proto
syntax = "proto2";

message HeartbeatMetric {
    required int32 event_type = 1;
    required int32 schema_version = 2;
    required string device_serial = 3;
    required string software_type = 4;
    required string software_version = 5;
    required string hardware_version = 6;

   message EventInfo {
      required int32 unexpected_reboot_count = 1;
      required int32 elapsed_time_ms = 2;

      required int32 ble_bytes_transferred = 3;
      required int32 ble_disconnected_time_ms = 4;
      required int32 ble_avg_conn_interval_ms = 5;
      required int32 ble_num_disconnects = 6;
      required int32 ble_stack_hwm = 7;
      required int32 ble_tx_buffer_full_errors = 8;
      required int32 ble_conn_param_change_requests = 9;
      required int32 ble_crc_errors = 10;
      required int32 ble_mic_errors = 11;
      required sint32 ble_avg_rssi = 12;
      required int32 ble_app_connect_time_ms = 13;
   }

   required EventInfo event_info = 7;
}
```

```
// heartbeat.options
HeartbeatMetric.device_serial max_size:32
HeartbeatMetric.software_type max_size:32
HeartbeatMetric.software_version max_size:32
HeartbeatMetric.hardware_version max_size:32
```

#### Protobuf Analysis

With protobuf, our example above encodes in 72 bytes (an 82% decrease over
MsgPack!)

```
// xxd dump of protobuf encoding
00000000: 0802 1001 1a09 4431 3233 3435 3637 3822  ......D12345678"
00000010: 056e 7266 3532 2a05 312e 302e 3032 0365  .nrf52*.1.0.02.e
00000020: 7674 3a24 0800 1080 dddb 0118 a09c 0120  vt:$...........
00000030: c0cf 2428 c801 3003 38b8 1740 0048 0a50  ..$(..0.8..@.H.P
00000040: 0458 0060 6b68 e807                      .X.`kh..
```

While this is a great improvement, there are a few things to note:

- `protoc` and auto-generation need to be integrated into all the projects
  involved in encoding/decoding the data.
- Anytime we add a new key we will need to update the decoders to parse them. So
  for example if a new field is added on the firmware a decoder will need to be
  added on the consumer side (e.g. within a mobile app or a web backend) to
  decode it. This means any update will likely involve several teams within an
  organization to coordinate in order for a new event to be published from the
  firmware.
- If decoders are out of sync, new data will be silently dropped.
- A lot of boilerplate code is needed to serialize the data which can be
  cumbersome to write and read.

### Packed C Structures

Due to some of the challenges with integrating protobuf many projects fallback
to using packed C structures.

However, this is typically the worst approach that can be taken for numerous
reasons. Notably,

- Value encoding is not standardized and is architecture dependent! Whereas
  JSON, MsgPack, CBOR and Protobuf all have a platform neutral way to represent
  numbers, with packed C structs it's usually up to the mobile or web engineer
  to manually deal with endianness issues and make sure multi-byte integer
  values are decoded correctly.
- You need to pick the right size integer encoding upfront for all the values to
  encode to save space when packing the structure. When doing this you also need
  to make sure you handle overflow. Otherwise counters will rollover and bogus
  values will get reported in your trackers.
- Encoding and decoding has to be written manually, often in different languages
  and by different engineering teams. This makes it much more likely to have
  subtle decode errors and integration issues.
- All migration logic from one version of an event to another has to be manually
  handled by developers.

#### Example C Structure Representation

```c

// Note: If all fields as a uint32_t, the size of sHeartbeatEvent would be 86 bytes
// (greater than the encoded protobuf size!)
typedef struct __attribute__((packed)) {
  // Note: integer sizes chosen based on expected
  // possible range.
  uint16_t unexpected_reboot_count;
  uint32_t elapsed_time_ms;
  uint32_t ble_bytes_transferred;
  uint32_t ble_disconnected_time_ms;
  uint16_t ble_avg_conn_interval_ms;
  uint16_t ble_num_disconnects;
  uint16_t ble_stack_hwm;
  uint32_t ble_tx_buffer_full_errors;
  uint32_t ble_conn_param_change_requests;
  uint32_t ble_crc_errors;
  uint32_t ble_mic_errors;
  int8_t ble_avg_rssi;
  uint32_t ble_app_connect_time_ms;
} sHeartbeatEventInfo;

typedef struct __attribute__((packed)) {
  uint8_t schema_version;
  uint8_t event_type;
  // Note: perfectly sized for purposes of comparison
  char device_serial[sizeof("D12345678")];
  char software_type[sizeof("nrf52")];
  char software_version[sizeof("1.0.0")];
  char hardware_version[sizeof("evt")];
  sHeartbeatEventInfo event_info;
} sHeartbeatEvent;
```

The c-struct representation winds up being 69 bytes (only 3 bytes smaller than
protobuf):

```
// xxd dump of c struct encoding
00000000: 0102 4431 3233 3435 3637 3800 6e72 6635  ..D12345678.nrf5
00000010: 3200 312e 302e 3000 6576 7400 0000 80ee  2.1.0.0.evt.....
00000020: 3600 204e 0000 c027 0900 c800 0300 b80b  6. N...'........
00000030: 0000 0000 0a00 0000 0400 0000 0000 0000  ................
00000040: cae8 0300 00
```

### Memfault Serialization

The Memfault Firmware SDK balances space utilization with ease of use based on
the pros and cons explored above. Notably,

- All data values are encoded using CBOR. This means new fields can be added
  without breaking the decode process and all data types (e.g integers) are
  encoded using a standard platform-agnostic format (developers don't need to
  deal with endianness issues!)
- No key information is encoded during serialization at all! Instead an array of
  CBOR values is stored for `event_info`. This means as the number of keys
  increases, the encoding winds up being more optimal than protobuf because no
  bytes are needed for the key.
- To alleviate any decode burden or integration of any new tooling to generate
  mappings, the Memfault cloud makes use of the symbol file for the firmware
  release to autogenerate a mapping back to the key names. This means metrics
  can be updated on the firmware at any time via a firmware update and opaquely
  passed through a mobile app or cloud backend without requiring any updates!

With this approach, the example above has a serialization size of 68 bytes,
which winds up being 1 byte less than the packed C structure!

```
// Memfault Heartbeat Metric Serialization
00000000: a702 0103 0107 6944 3132 3334 3536 3738  ......iD12345678
00000010: 0a65 6e72 6635 3209 6531 2e30 2e33 0663  .enrf52.e1.0.3.c
00000020: 6576 7404 a101 8d1a 0036 ee80 0019 4e20  evt......6....N
00000030: 1a00 0927 c018 c803 190b b800 0a04 0038  ...'...........8
00000040: 3519 03e8
```
