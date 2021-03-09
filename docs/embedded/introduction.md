---
id: introduction
title: Introduction
sidebar_label: Introduction
---

Memfault is a full device monitoring solution which can be integrated into any
embedded device utilizing ARM Cortex-M or ESP32 MCUs irrespective of the RTOS in
use or connectivity path in place.

### How does it work?

1. Using the lightweight
   [memfault-firmware-sdk](https://github.com/memfault/memfault-firmware-sdk),
   full device core dumps, backtraces, debug registers, logs, and custom metrics
   can be collected.
2. Data structures collected are framed into packets that can be as small as 9
   bytes so they can be sent over whatever transport you use (e.g. Bluetooth,
   LTE, WiFi, LoRa, Zigbee, or even proprietary protocols).
3. The Memfault cloud reassembles data structures from received packets and
   analyzes them to classify the issue, identify a possible root cause, and
   recover items such as variable and function names from the binary data.
4. The Memfault cloud automatically de-duplicates similar issues. Notifications
   are used to let you know when problems are detected. From the Memfault web
   application, individual issues can be drilled into and overall fleet health
   can be examined via dashboard views.

### Getting Started

The [memfault-firmware-sdk](https://github.com/memfault/memfault-firmware-sdk)
is designed as a collection of components, so you can include only what is
needed for your project.

We have step-by-step guides which cover how to add the SDK to a project, capture
an error, and publish data to the Memfault cloud:

:::caution
The following guides assume you already have a Memfault Account. If
you don't yet have one, you can
[create one here](https://memfault.typeform.com/to/zHsZBg?plan=starter).
:::

<center>

| MCU Architecture |                  Getting Started Guide                   |
| ---------------- | :------------------------------------------------------: |
| ARM Cortex-M    |      [ARM Cortex-M Integration Guide](/docs/embedded/arm-cortex-m-guide)       |
| nRF Connect SDK  | [nRF Connect SDK Integration Guide](/docs/embedded/nrf-connect-sdk-guide) |
| ESP32 ESP-IDF           | [ESP32 ESP-IDF Integration Guide](/docs/embedded/esp32-guide)  |
| ESP8266            | [ESP8266 RTOS Integration Guide](/docs/embedded/esp8266-rtos-sdk-guide)  |

</center>

### Modules

Once the
[memfault-firmware-sdk](https://github.com/memfault/memfault-firmware-sdk) is in
place, a number of modules can easily be integrated into the system:

- [Coredumps](/docs/embedded/coredumps) - Allows one to collect the system state
  when the device hangs, crashes or asserts unexpectedly.
- [Reboot Reason Tracking](/docs/embedded/reboot-reason-tracking) - allows one
  to collect why devices are rebooting in the field (whether it be due to a
  crash, brown out, crash or a firmware update). Summaries and aggregates and
  then be viewed from the Memfault web application.
- [Device Metrics](/docs/embedded/metrics-api) - A flexible way to collect
  system health vitals that are important to your application (whether it be
  battery life, connectivity statistics, performance measurements or something
  else!). From the Memfault web application, metrics are plotted over time for
  any device and fleet wide summaries can be viewed via dashboards.
- [Error Tracking with Trace Events](/docs/embedded/trace-events) - allows one
  to collect lightweight events (<40 bytes) when error conditions occur. These
  events can be collected while the system is running and can be used to
  discover how often unexpected errors are occuring (flash write failures, I2C
  bus timeouts, etc).

### Design Documents

The Memfault data collection system was designed from the ground up with
embedded devices in mind. Deeper explorations into the designs of the subsytems
can be found below:

- [Event Serialization](/docs/embedded/event-serialization-overview) - Describes
  how Memfault event serialization was optimized for embedded applications and
  how it compares against other serialization strategies.
- [Data Transport](/docs/embedded/data-from-firmware-to-the-cloud) - Examines
  how data is shuttled from the device to the cloud
