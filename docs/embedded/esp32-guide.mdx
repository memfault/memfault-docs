---
id: esp32-guide
title: ESP32 ESP-IDF Integration Guide
sidebar_label: ESP32 ESP-IDF
---

This tutorial will go over integrating the **panics** component of the
[Memfault Firmware SDK](https://github.com/memfault/memfault-firmware-sdk) into
a system that is using the
[ESP-IDF](https://docs.espressif.com/projects/esp-idf) for an ESP32 chip. It
assumes you already have a working project/toolchain for the ESP32. If you do
not, the official getting started guide is a great resource!

The integration works for both ESP-IDF 3.x and 4.x releases.

### Clone Memfault SDK

Using a [Git](https://git-scm.com/) client, clone the `memfault-firmware-sdk`
repository from:

```
https://github.com/memfault/memfault-firmware-sdk.git
```

### Add Memfault SDK to the ESP-IDF CMake Build System

In your top level CMakeLists.txt, you can register the Memfault esp-idf port as
a "component" by simply including `ports/esp_idf/memfault.cmake`:

```c
# CMakeLists.txt
# [...]

include(<PATH_TO_MEMFAULT_FIRMARE_SDK>/ports/esp_idf/memfault.cmake)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(<YOUR_PROJECT>)
```

### Enable Coredump Collection in sdkconfig

By default, the esp-idf uses the `CONFIG_ESP32_ENABLE_COREDUMP_TO_NONE=y`. You
will need to update `sdkconfig` (either via `idf.py menuconfig` or manually) to
`CONFIG_ESP32_ENABLE_COREDUMP_TO_FLASH=y`. The change you will see in the
`sdkconfig` file will look something like:

```diff
diff --git a/sdkconfig b/sdkconfig
index a49446d..83a81a8 100644
--- a/sdkconfig
+++ b/sdkconfig
@@ -274,7 +274,7 @@ CONFIG_ESP32_DEFAULT_CPU_FREQ_MHZ=160
 CONFIG_TRACEMEM_RESERVE_DRAM=0x0
 # CONFIG_ESP32_ENABLE_COREDUMP_TO_FLASH is not set
 # CONFIG_ESP32_ENABLE_COREDUMP_TO_UART is not set
-CONFIG_ESP32_ENABLE_COREDUMP_TO_NONE=y
+CONFIG_ESP32_ENABLE_COREDUMP_TO_FLASH=y
```

### Create a Coredump Flash Partition

You will need to allocate an internal flash partition for panic data to be
stored in to your partition\*.csv file. The change will look something like
this:

```diff
diff --git a/partitions_example.csv b/partitions_example.csv
index 7e28b56..5621e89 100644
--- a/partitions_example.csv
+++ b/partitions_example.csv
@@ -3,4 +3,5 @@
 nvs,      data, nvs,     0x9000,  0x6000,
 phy_init, data, phy,     0xf000,  0x1000,
 factory,  app,  factory, 0x10000, 1M,
-storage,  data, fat,     ,        1M,
+storage,  data, fat,     ,        1M,
+coredump, data, coredump,,        256K
```

### Add Memfault SDK configuration files to project

The [device metrics](/docs/embedded/metrics-api) and
[trace event](/docs/embedded/trace-events) subsystems require configuration
files to be added to your include path. ("memfault_metrics_heartbeat_config.def"
& "memfault_trace_reason_user_config.def", respectively)

As a starting point, simply create empty files and add them to your include
path:

```
$ touch ${PATH_INCLUDED_IN_BUILD}/memfault_metrics_heartbeat_config.def
$ touch ${PATH_INCLUDED_IN_BUILD}/memfault_trace_reason_user_config.def
```

### Implement memfault_platform_get_device_info

When a panic occurs, information is collected to uniquely identify the device
and version of software running. Create a file, (i.e `memfault_platform_info.c`)
and add it to your projects `main` component CMakeLists.txt.

Then implement the following function:

```c
// memfault_platform_info.c

#include "memfault/core/platform/device_info.h"

// [... other code ...]

// NOTE: This needs to be safe to call from the exception handler so
// if you are reading from data from subsytems which uses locking esp_efuse_*
// you will need to pre-populate the data on bootup
void memfault_platform_get_device_info(sMemfaultDeviceInfo *info) {
  // platform specific version information
  *info = (sMemfaultDeviceInfo) {
    .device_serial = "ESP32_DEMOSERIAL",
    .software_type = "esp32-main",
    .software_version = "1.0.0",
    .hardware_version = "esp-wrover",
  };
}
```

### Implement g_mflt_http_client_config

An API key will need to be included in order to communicate with Memfault's web
services. Go to https://app.memfault.com/, navigate to the project you want to
use and select 'Settings'. Copy the 'Project API Key' and replace
`<YOUR API KEY HERE>` below and then add the following to your code:

```c
// memfault_platform_info.c
// [...]

#include "memfault/http/http_client.h"

sMfltHttpClientConfig g_mflt_http_client_config = {
  .api_key = "<YOUR API KEY HERE>",
};
```

### Regenerate sdkconfig and recompile

At this point, the Memfault SDK has been integrated into your ESP-IDF project
and you need to rebuild:

```bash
$ idf.py clean
$ idf.py menuconfig
$ idf.py build
```

### Testing things out

The esp-idf port registers some CLI commands so you can easily try things out!

As a first step you can try collecting and sending a coredump with the following
commands:

```
// force a crash
esp32> crash 3
// wait for reboot
// join network
esp32> join <SSID> <PASSWORD>
// Post data
esp32> post_chunks
```

### Publish data to the Memfault cloud

With the esp-idf, data can be posted anytime you are connected to the internet
by calling the following code. We recommend running it at a periodic interval.
If there is no new data to send, the call reduces to a no-op. The same logic can
also be invoked via the memfault CLI with the `mflt post_chunks` mentioned
above.

```c
#include "memfault/core/debug_log.h"
#include "memfault/http/http_client.h"

int memfault_post_data(void) {
  sMfltHttpClient *http_client = memfault_http_client_create();
  if (!http_client) {
    MEMFAULT_LOG_ERROR("Failed to create HTTP client");
    return -1;
  }
  const eMfltPostDataStatus rv = memfault_http_client_post_data(http_client);
  if (rv < 0) {
    MEMFAULT_LOG_ERROR("%s error: %d", __func__, rv);
  }
  const uint32_t timeout_ms = 30 * 1000;
  memfault_http_client_wait_until_requests_completed(http_client, timeout_ms);
  memfault_http_client_destroy(http_client);
  return rv;
}
```
