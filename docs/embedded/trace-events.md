---
id: trace-events
title: Error Tracking with Trace Events
sidebar_label: Error Tracking with Trace Events
---

We recommend capturing a full coredump trace in case the system encounters a
fatal problem, like a hard fault or a failed assertion. However, in some cases
it may not be desirable or possible to do so. For example, if stopping &
rebooting the system is not an option, or if the error is recoverable but you
would still like to understand how often it happens.

The
[trace event](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/include/memfault/core/trace_event.h)
module within the SDK makes it easy to track errors in a way that requires less
storage than full coredump traces and also allows the system to keep running
after capturing the event. Only the program counter, return address and a custom
"reason" are saved. Once uploaded to Memfault, each trace event will be
associated with an Issue just like a coredump.

Here's an example where Trace Events are captured for Bluetooth protocol CRC
errors and invalid message IDs:

![](/img/docs/embedded/trace-reason-example.png)

## Integration Steps

<br/>

:::note Prerequisite
This guide assumes you have already completed the minimal port
of the Memfault SDK. If you have not, check out the
[getting started section](/docs/embedded/introduction#getting-started).
:::

### 1. Create trace reasons definition file

Aside from the program counter and return address, a trace event also contains a
user-defined "error reason". The list of custom reasons is defined in a separate
configuration file named `memfault_trace_reason_user_config.def` which you need
to create.

In this guide we'll assume it is located at `$YOUR_PROJECT_ROOT/config`. The
file will get `#include`-ed, so make sure the directory in which you create the
file is part of the header search paths, such that the compiler can find it.

To start, we recommend adding a "test" trace error reason you can easily trigger
(i.e via a CLI command) and a couple for error paths in your codebase (such as
peripheral bus read/write failures, transport errors and unexpected timeouts).

Here is what the `memfault_trace_reason_user_config.def` file should look like:

```c
// memfault_trace_reason_user_config.def
MEMFAULT_TRACE_REASON_DEFINE(test)
MEMFAULT_TRACE_REASON_DEFINE(your_custom_error_reason_1)
MEMFAULT_TRACE_REASON_DEFINE(your_custom_error_reason_2)
// ...
```

### 2. Generate Some Trace Events

Next, we'll need to use the `MEMFAULT_TRACE_EVENT` macro to capture a trace
event when an error occurs.

Note that it is perfectly fine to use the same reason in different places if
that makes sense in the context of your code. Because the program counter and
return address are captured in the trace event, you will be able to see the 2
topmost frames (function name, source file and line) in Memfault's Issue UI and
distinguish between the two.

For test purposes, you can add a CLI command that logs a trace event:

```c
#include "memfault/core/trace_event.h"
// [ ...]
void test_trace_event_cli_cmd(void) {
    MEMFAULT_TRACE_EVENT(test);
}
```

You can also start to add trace events for error paths:

```c
#include "memfault/core/trace_event.h"
// [ ...]
void ble_le_process_ll_pkt(...) {
  // ...
  if (invalid_msg_id) {
    MEMFAULT_TRACE_EVENT(bt_invalid_msg_id);
    // ...
  }
  // ..
}
```

### 3. Initialize Trace Module on Bootup

All events generated in the Memfault SDK are stored and transmitted using a
compressed format (**CBOR**). As they await to be sent, they are stored in the
"event storage" core component. The size of each trace event requires ~50 bytes
of storage. The exact size needed to store a single event can be determined with
`memfault_trace_event_compute_worst_case_storage_size()`. On bootup, initialize
trace event storage like this:

```c
#include "memfault/core/debug_log.h"
#include "memfault/core/event_storage.h"
#include "memfault/core/trace_event.h"
// [...]
int main(void) {
  // [... other initialization code ...]

  // Budget storage for up to ~5 trace events (~50 bytes each):
  static uint8_t s_event_storage[250];
  const sMemfaultEventStorageImpl *evt_storage =
      memfault_events_storage_boot(s_event_storage, sizeof(s_event_storage));

  // Minimum storage we need to hold at least 1 trace event
  const size_t bytes_needed = memfault_trace_event_compute_worst_case_storage_size();
  if (bytes_needed > sizeof(s_event_storage)) {
    MEMFAULT_LOG_ERROR("Storage must be at least %d for events but is %d",
                       (int)bytes_needed, sizeof(s_event_storage));
  }

  // Pass the storage to initialize the trace event module
  memfault_trace_event_boot(evt_storage);
}
```

At this point data collection for trace events is fully implemented! Now we just
need to publish the push the data to the Memfault cloud ...

### 4. Publish data to the Memfault cloud

Extensive details about how data from the Memfault SDK makes it to the cloud
[can be found here](data-from-firmware-to-cloud.md). In short, the Memfault SDK
"chunks" up data that is collected and then it must be pushed to the Memfault
cloud via the
[chunk REST endpoint](https://api-docs.memfault.com/?version=latest#66b0e390-2c3e-4c0d-b6c2-836a287b9e5f)

A typical integration looks like this:

```c
#include "memfault/core/data_packetizer.h"
// [...]

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

void send_memfault_data(void) {
  // [... user specific logic deciding when & how much data to send
  while (try_send_memfault_data()) { }
}
```

### 5. (Optional) Collecting Trace Events from Interrupts

It is also safe to use the `MEMFAULT_TRACE_EVENT()` macro from an interrupt.
When called from an interrupt, the trace event info will just copy the collected
info to a temporary storage region in RAM to minimize interrupt latency. The
collected data can then be serialized to event storage by explicitly calling
`memfault_trace_event_try_flush_isr_event()`. The data will also be flushed
automatically anytime `MEMFAULT_TRACE_EVENT()` is called and the processor is
**not** in an interrupt.
