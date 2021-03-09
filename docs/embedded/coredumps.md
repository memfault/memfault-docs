---
id: coredumps
title: Coredump Integration Guide
sidebar_label: Coredumps
---

This tutorial will cover integrating the **panics** component of the
[Memfault Firmware SDK](https://github.com/memfault/memfault-firmware-sdk) into
a system that is using the
[GNU ARM Embedded Toolchain](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)
(GCC) compiler.

:::note Prerequisite
This guide assumes you have already completed the minimal
integration of the Memfault SDK. If you have not, check out the
[getting started section](/docs/embedded/introduction#getting-started).
:::

## Integration Steps

### 1. Add "panics" component to Build System

If you are using the `makefiles/MemfaultWorker.mk` or `cmake/Memfault.cmake` to
automatically collect sources, all you have to do is add `panics` to your
`MEMFAULT_COMPONENTS`

```
MEMFAULT_COMPONENTS := core util panics
// ...
```

If you are using another build system, the `panics` component sources can also
be added to the projects source list manually:

<details>
<summary> Details </summary>

```
MEMFAULT_PANICS_SRC_DIR = $(MEMFAULT_SDK_ROOT)/components/panics/src

YOUR_SRC_FILES += \
  $(MEMFAULT_PANICS_SRC_DIR)/memfault_coredump.c \
  $(MEMFAULT_PANICS_SRC_DIR)/memfault_coredump_regions_armv7.c \
  $(MEMFAULT_PANICS_SRC_DIR)/memfault_fault_handling_arm.c \

YOUR_INC_PATHS += $(MEMFAULT_SDK_ROOT)/components/panics/include
```

</details>

### 2. Implement platform specific storage region for crash data

We typically recommend starting with the RAM based Coredump port. By default
this will only save the top of the stack at the time of crash but it lets you
quickly get coredumps up and running and get a feel for how things work. To do
this:

1.  Add
    `$(MEMFAULT_SDK_ROOT)/ports/panics/src/memfault_platform_ram_backed_coredump.c`
    to the build
2.  Mark the section being used to hold the coredump as a `NOLOAD` region in
    your linker script so it remains uninitialized when the device reboots
    ```
    /* your linker script (.ld file) */
    .noinit (NOLOAD): { KEEP(*(*.mflt_coredump)) } > RAM
    ```

Coredump data can also be stored to any other backing storage (eMMC, external
NOR flash, internal flash, etc) by implementing the required
[dependencies](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/panics/include/memfault/panics/platform/coredump.h)
instead of using `memfault_platform_ram_backed_coredump.c`.

### 3. Implement other platform dependencies

In order to save coredumps, you will need to fill in the functions in the block
below

```c
#include "memfault/core/platform/core.h"

void memfault_platform_reboot(void) {
  // Last function called before memfault after a crash
  // expect the platform to reboot the system
  __asm("bkpt 1");
  while (1) { }
}
```

### 4. Publish data to the Memfault cloud

This step was already have been taken care of as part of the
[initial minimal integration](/docs/embedded/arm-gcc-guide#publish-data-to-the-memfault-cloud)!
