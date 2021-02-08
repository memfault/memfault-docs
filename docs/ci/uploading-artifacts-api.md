---
id: uploading-artifacts-api
title: Uploading Artifacts - API
sidebar_label: Uploading Artifacts - API
---

This tutorial will walk through the typical process of uploading a build's
Symbol files (.elf) to Memfault to symbolicate Traces and Coredumps.

It's best to hook this into Continuous Integration when a build is released for
internal consumption so that Memfault will immediately have the ability to
symbolicate crashes.

## Prerequisites

- Make sure to have Authentication set up. This should be using HTTP Basic Auth
  - Find this information at
    [https://api-docs.memfault.com/?version=latest#authentication](https://api-docs.memfault.com/?version=latest#authentication)
- A Project must already be created

## Create Release

**Reference**:
[https://api-docs.memfault.com/?version=latest#8e95cfdf-5167-49ff-ba9d-970697e8ddea](https://api-docs.memfault.com/?version=latest#8e95cfdf-5167-49ff-ba9d-970697e8ddea)

**Example**:

    # Request
    curl -X POST \
      https://api.memfault.com/api/v0/organizations/memfault/projects/demo/releases \
      -H 'Content-Type: application/json' \
      -d '{
    	  "version": "1.2.3",
    	  "revision": "9b987ee00789b62909974edf9da18771c6859998"
      }'

    # Response - HTTP 200 - OK
    {
      "data": {
        "artifacts": [],
        "count_devices": 0,
        "created_date": "2019-05-21T21:15:08.593624+00:00",
        "extra_info": null,
        "id": 1,
        "min_version": "",
        "notes": "",
        "revision": "9b987ee00789b62909974edf9da18771c6859998",
        "updated_date": "2019-05-21T21:15:08.596886+00:00",
        "version": "1.2.3"
      }
    }

## Upload Symbols

Reference:
[https://api-docs.memfault.com/?version=latest#ca2a72d2-69ef-4703-98bf-60621738091a](https://api-docs.memfault.com/?version=latest#ca2a72d2-69ef-4703-98bf-60621738091a)

Example:

    # Request
    curl -X POST \
      https://api.memfault.com/api/v0/organizations/memfault/projects/demo/releases/1.2.3/artifacts \
      --form "file=@/Users/tyler/elfs/symbols_1.2.3_hwrev1.elf" \
      --form "type=symbols" \
      --form "filename=symbols_1.2.3_hwrev1.elf" \
      --form "hardware_version=hwrev1"

    # Response
    HTTP 204 - Accepted
