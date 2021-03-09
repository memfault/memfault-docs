---
id: test-data-collection-with-gdb
title: Using GDB to Test Data Collection
sidebar_label: Using GDB to Test Data Collection
---

In the following tutorial we will walk through how to post chunks directly to
the Memfault cloud using the `memfault` GDB commands included in the
[memfault-firmware-sdk](https://github.com/memfault/memfault-firmware-sdk).

This is typically most helpful as a quick way to test that data collection is
working prior to implementing the
[data transport path](data-from-firmware-to-cloud.md).

## Prerequisites

- You need to have a way to debug your product with GDB as part of your
  development setup
- The GDB version you are using needs to have the
  [GDB Python API enabled](https://interrupt.memfault.com/blog/automate-debugging-with-gdb-python-api#getting-started-with-gdb-python).
  (It's generally the default or there is a `-py` version of GDB which has it
  included.)
- You need to compile your firmware with debug symbol information (i.e `-g`
  CFLAG)

:::note
Even if you are using other compilers such as ARMCC or IAR, you can load the
ELF (.out, .elf) generated and debug it in GDB as well.
:::

## Loading the Memfault GDB Commands

The Memfault Firmware SDK includes utilities implemented using the GDB Python
API in the scripts directory. To load the scripts all you need to do is source
it:

```bash
(gdb) source $MEMFAULT_SDK/scripts/memfault_gdb.py
```

You can then examine available commands by running `memfault --help`

```bash
(gdb) memfault --help
Memfault GDB commands

List of memfault subcommands:

[...]
memfault install_chunk_handler -- Installs a hook which sends chunks to the Memfault cloud chunk endpoint automagically
[...]
```

## Registering GDB Handler to Send Data

You will need a function in your project that gets called to send chunk data.
The function can have any name and return value. The only requirement is that
the last two parameters are a pointer to the data buffer and length of the
buffer to send respectively. For example,

```c
#include "memfault/core/compiler.h"
// We disable optimizations so parameters do not get stripped for this stub function
MEMFAULT_NO_OPT
void my_project_send_chunk_data(...any args..., void *buf, size_t buf_len) {
  return;
}
```

:::note
Check out
[`memfault_demo_drain_chunk_data()`](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/demo/src/memfault_demo_cli_print_chunk.c#L139)
in the SDK for a full working example.
:::

Once you have this in place, installing the handler to automatically post chunks
is as easy as:

```bash
(gdb) memfault install_chunk_handler -pk <YOUR_PROJECT_KEY> --ch my_project_send_chunk_data
```

Now, every time `my_project_send_chunk_data` is called, the data passed as a
parameter to the function will automatically be posted to the Memfault cloud.
You don't have to do anything else!

By default, the script will only out to gdb when an error occurs. If you would
like to see a message print every time a chunk is posted you can use the
`--verbose` option:

```bash
(gdb) memfault install_chunk_handler -pk <YOUR_PROJECT_KEY> --ch my_project_send_chunk_data --verbose
(gdb) Continuing.
Successfully posted 45 bytes of chunk data
Successfully posted 53 bytes of chunk data
[...]
```
