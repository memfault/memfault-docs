---
id: uploading-symbol-file-is-invalid
title: Uploaded Symbol File is Invalid
sidebar_label: Uploaded Symbol File is Invalid
---

## Problem

On Artifact uploads, the server will validate any _symbol file_ uploads and make
sure that they have valid DWARF information. This is because Memfault uses the
DWARF information to recover function names and variable locations.

## Solution

A quick test to run locally to verify that your _symbol file_ is valid and
contains DWARF info is to run `arm-none-eabi-readelf -S` and look for
`.debug...` sections:

    $ arm-none-eabi-readelf -S tools/tests/fixtures/mf_test_app_nrf52840_s140.out
    There are 37 section headers, starting at offset 0x2c95dc:

    Section Headers:
      [Nr] Name              Type            Addr     Off    Size   ES Flg Lk Inf Al

    ... <various other sections> ...

      [25] .debug_info       PROGBITS        00000000 029a34 0c3e2a 00      0   0  1
      [26] .debug_abbrev     PROGBITS        00000000 0ed85e 017aaf 00      0   0  1
      [27] .debug_loc        PROGBITS        00000000 10530d 04bbc1 00      0   0  1
      [28] .debug_aranges    PROGBITS        00000000 150ed0 0022a8 00      0   0  8
      [29] .debug_ranges     PROGBITS        00000000 153178 00fcb0 00      0   0  1
      [30] .debug_macro      PROGBITS        00000000 162e28 0328dc 00      0   0  1
      [31] .debug_line       PROGBITS        00000000 195704 05449f 00      0   0  1
      [32] .debug_str        PROGBITS        00000000 1e9ba3 0c78b3 01  MS  0   0  1
      [33] .debug_frame      PROGBITS        00000000 2b1458 007240 00      0   0  4
      [34] .symtab           SYMTAB          00000000 2b8698 00b180 10     35 2254  4
      [35] .strtab           STRTAB          00000000 2c3818 005c00 00      0   0  1
      [36] .shstrtab         STRTAB          00000000 2c9418 0001c1 00      0   0  1
    Key to Flags:
      W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
      L (link order), O (extra OS processing required), G (group), T (TLS),
      C (compressed), x (unknown), o (OS specific), E (exclude),
      y (purecode), p (processor specific)
