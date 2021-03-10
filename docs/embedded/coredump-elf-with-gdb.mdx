---
id: coredump-elf-with-gdb
title: Debugging coredumps with GDB
sidebar_label: Debugging coredumps with GDB
---

To analyze coredumps, the Memfault UI offers a slew of analyses right in the
browser, such as full backtraces for all threads, viewers for local, static and
global variables and more.

In some cases, it might be desirable to debug a coredump locally, using
[GDB](https://interrupt.memfault.com/blog/advanced-gdb). Memfault also supports
this use case, by offering the option to export a coredump to an ELF core file
which can be loaded into GDB.

This guide explains how to use this feature.

## Prerequisites

- A version of GDB that is capable of loading ELF core files. When GDB is built
  for an `...-elf-linux` target, this support is included. If you do not have (a
  capable) GDB installed yet, see the
  [section at the bottom](#installing-multi-architecture-gdb-with-conda) for
  installation instructions.

## Export coredump to an ELF core file

Navigate to the Issue and specific (coredump) trace that you would like to
export and click the "Download .elf" button:

![](/img/docs/embedded/download-coredump-elf.png)

If the button is not present, it most likely means that the trace was not a
coredump trace.

## Download the symbol ELF file

Aside of the ELF core file, GDB also needs debug information about the software
that generated the coredump, in order to make sense of the data in the core
file. This debug information is present in the symbol ELF file. Note that the
symbol file _MUST_ match the software that generated the coredump.

To download the symbol file, look for "Software [VERSION]" on the Issue detail
page and click the version:

![](/img/docs/embedded/issue-detail-software-link.png)

Then click "Download":

![](/img/docs/embedded/software-download-symbols-link.png)

## Load the core & symbol ELF files into GDB

You can load the core & symbol files as part of the GDB command line invocation
like this:

```shell script
$ gdb --se /path/to/symbols.elf --core /path/to/coredump.elf
```

:::note
If your version of GDB does not have support for core files, you will see this
message when attempting to load the file:

```
"/path/to/coredump.elf": no core file handler recognizes format
```

Memfault provides GDB binaries that do have support for core files. See
[section at the bottom](#installing-multi-architecture-gdb-with-conda) for
installation instructions.
:::

In case GDB is already running, it's also possible to load core & (additional)
symbol files using GDB commands:

```gdb
(gdb) core /path/to/coredump.elf
(gdb) symbol-file /path/to/symbols.elf
```

To view what files have been loaded, you can use the `info files` command:

```gdb
(gdb) info files
Symbols from "/path/to/symbols.elf".
Local core dump file:
	`/path/to/coredump.elf', file type elf32-littlearm.
	0x2003b800 - 0x2003d800 is load1
	0xe000ed24 - 0xe000ed40 is load2
```

# Installing multi-architecture GDB with Conda

Memfault publishes GDB binaries using the [Conda](https://conda.io/) package
management system. If you do not have a Conda installer set up, check out
[these installation instructions](https://docs.conda.io/en/latest/miniconda.html).

## environment.yml

Create a file `environment.yml` with these contents:

```yaml
name: memfault-multi-arch-gdb
channels:
  - memfault
  - conda-forge
dependencies:
  - multi-arch-gdb=8.3.1=py36*
  - python=3.6.9
```

## Create the Conda environment

Run this command to install GDB and the dependencies from the `environment.yml`
file:

```shell script
$ conda env create -f environment.yml
```

:::note
By default, "memfault-multi-arch-gdb" is used as the name for the
environment. You can override this by passing `-n <NAME>` to the "create"
command.
:::

## Activate the Conda environment

To activate the Conda environment in your current shell, just run:

```shell script
$ conda activate memfault-multi-arch-gdb
```

This commands adds `gdb` to your shell's `PATH`.

## Run GDB

Once activated, you can run `gdb`:

```shell script
$ gdb --se /path/to/symbols.elf --core /path/to/coredump.elf
GNU gdb (GDB) 8.3.1
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
...
For help, type "help".
Type "apropos word" to search for commands related to "word".
(gdb)
```
