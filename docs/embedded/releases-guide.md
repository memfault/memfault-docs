---
id: releases-integration-guide
title: Releases Integration Guide
sidebar_label: Release Management
---

This tutorial covers how to manage your firmware over-the-air update flow with
Memfault!

## Terminology Overview

Before we get started, let's quickly recap some of the terminology used
throughout the Memfault documentation and how it relates to release management.

At the top level all data in the Memfault UI is encapsulated by the
"Organization" and "Project" where:

- `Organization` - Entity which contains one or more projects and users.
  Generally one organization per company.
- `Project` - A logical warehouse of all the Memfault data related to a
  particular set of devices. Typically there will we one project per discrete
  product line. For example, if your company produces a smart light as well as a
  smart car, these lines would usually be tracked in separate projects. You
  could also create a "dev" project for one-off testing and prototyping.

### Project Level Filtering

Within a "Project", data can be filtered on three dimensions:

- `Device` - An edge device that communicates with the Memfault cloud. You can
  look at data collected at the device level to identify the _exact_ issues
  impacting that unit.
- `Cohort` - A grouping of devices. You will be able to filter data and deploy
  releases by this granularity. For example, you could use a cohort to represent
  devices used for different release stages ("alpha", "beta", "prod") or to
  identify devices by location ("office", "site A", "site B") or a combination
  of both ("Site A Alpha", "Site A Beta", etc). A device is always assigned to
  exactly one "Cohort" at any given time but can freely be moved to another at
  any time.
- `Fleet` - All devices within a Project

### Identifying a Device

For a "Device" in a project, several pieces of identifying information are
tracked.

- `Device Serial` / `device_serial` - A unique identifier of a device. For
  example, this may be a serial number written into the EEPROM of your product
  in the factory or a chip identifier present in the silicon of the main MCU on
  your platform. This identifier _must_ be unique for every device in the same
  Project.
- `Hardware Version` / `hardware_version` - For a given device, the revision of
  hardware present. For example, this can be used to represent the different
  stages of [manufacturing builds](https://mflt.io/hardware-engineer-speak)
  (`evt`, `dvt`, `pvt`, ...).

_Note: For any given device, neither of these pieces of information should ever
change._

### Identifying Software

- `Symbol File` - This is the ELF file output by an invocation of your
  toolchain's linker. It will typically have one of the following file
  extensions: `.elf`, `.out`, or `.axf`.
- `Software Type` / `software_type` - A shorthand name representing a software
  package running on your device. There is one matching "software_type" for
  every unique "Symbol File" generated as part of your build process. For
  example, `wifi-fw` and `main-fw`). Note for situations where a different
  symbol file is produced per "hardware_version", you will need to name the
  "software_types" differently. For example, if a new sensor was added between
  `evt` and `dvt` and now the `main-fw` between the two differ, "software_type"s
  like `main-fw-evt` & `main-fw-dvt` could be used.
- `Software Version` / `software_version` - Each build of a "software_type" is
  uniquely identified by its "software_version" (i.e "1.0.0"). Together the
  "software_type" and "software_version" uniquely identify a "Symbol File".

### Identifying Firmware Binaries

- `OTA Payload` - This is the binary that you deliver to your device when
  performing an over-the-air update. Unlike a "Symbol File", the binary may
  contain code or assets for multiple "Software Types". For example if you have
  an MCU for Wifi (`wifi-fw`) and another MCU for general orchestration
  (`main-fw`), the "OTA Payload" could include updates for both bundled
  together. In this situation your firmware would then un-package the "OTA
  Payload" and perform the update for both MCUs.
- `Release` - For each "Release" a unique "OTA Payload" can be deployed per
  "hardware_version". A set of "hardware_version" / "OTA Payload" pairs makes up
  a "Release".
- `Deployment` - The act of publishing a "Release" to a "Cohort" generates a
  "Deployment". Once deployed, any device in the given "Cohort" will be able to
  query and update to this Release.

## Getting Started

### Memfault CLI Tool

Releases can be managed either from the Memfault web UI or via the
[memfault cli tool](https://docs.memfault.com/docs/ci/install-memfault-cli). In
this tutorial we will make use of the CLI client which can be installed via pip:

```bash
$ pip3 install memfault-cli
```

### User API Key

This is an auth token that can be used to make Memfault API requests which
require user authentication. To locate the token navigate to the "Settings" ->
"General" page in the Memfault UI and copy/paste the token in the "User API Key"
section.

#### Project & Organization Slug

When using email & API key authentication, the Memfault CLI tool also needs to
know what organization and project to target. To find the "slugs" of the
organization and project in the Memfault UI:

1. Make sure that you've selected the right project on the top-left
2. Click on "Settings" and then "General Settings"

### Project API Key

This is the API token that is used when pushing data between a device and the
Memfault cloud. We will be using this to query for OTA Payloads in this
tutorial. To locate this token you will also want to navigate to the "Settings"
-> "General" page in the Memfault UI and copy/paste the token in the "Project
API Key" section.

## Managing Your First Release

### Create Release

In the commands below, please replace `${YOUR_SOFTWARE_TYPE}` with the Software
Type this Release contains. For example, in case of an STM32 MCU we may give a
Software Type of `stm32-fw`.

Replace `${YOUR_HARDWARE_VERSION}` with the Hardware Version that this Release
targets. For example, when targeting the "Mass Production" hardware build, we
might use a Hardware Version of `mp`.

Likewise, replace `${YOUR_SOFTWARE_VERSION}` with the Software Version that this
Release contains. For example, in case we're releasing our first cut of our
1.0.0 build, we might use `1.0.0-alpha` as Software Version.

```bash
$ cd /dev/smartfridge/
$ memfault --email ${YOUR_EMAIL} \
  --password ${YOUR_USER_API_KEY} \
  --org ${YOUR_ORG_SLUG} \
  --project ${YOUR_PROJECT_SLUG} \
  upload-ota-payload \
  --hardware-version ${YOUR_HARDWARE_VERSION} \
  --software-type ${YOUR_SOFTWARE_TYPE} \
  --software-version ${YOUR_SOFTWARE_VERSION} \
  build/stm32-fw.bin

INFO: build/stm32-fw.bin: uploaded!
INFO: You can view in the UI here:
    <Link to Release in UI>
```

#### Tip

If you are going to be working with the same project you can add standard
arguments as environment variables to your shell init file or via the command
line:

```bash
$ export MEMFAULT_EMAIL=<email address associated with your account>
$ export MEMFAULT_PASSWORD=<User Api Key for account>
$ export MEMFAULT_ORG=<Organization slug>
$ export MEMFAULT_PROJECT=<Project slug>
```

With these changes, our invocation reduces to:

```bash
$ cd /dev/smartfridge/
$ memfault upload-ota-payload \
  --hardware-version ${YOUR_HARDWARE_VERSION} \
  --software-type ${YOUR_SOFTWARE_TYPE} \
  --software-version ${YOUR_SOFTWARE_VERSION} \
  build/stm32-fw.bin

INFO: build/stm32-fw.bin: uploaded!
INFO: You can view in the UI here:
    <Link to Release in UI>
```

### Deploy Release

Now let's deploy our `1.0.0-alpha` release to the `default` cohort.

> Note: Any new device seen that has not explicitly been assigned to a custom
> cohort will be part of this cohort. To pre-create devices assigned to a
> specific cohort check out our [api-docs](https://api-docs.memfault.com/).

In the UI navigate to "Fleet" -> "Cohorts". Click on the picker under next to
the `default` cohort under "Target Release", select `1.0.0-alpha` and you will
be prompted with options that can be performed for the release.

### Query for OTA Payload

Now that we have a release uploaded let's walk through the steps to download the
release on a device!

To receive an OTA Payload, a device will need to pass these REST API query
parameters:

- `device_serial` - This is used for determining the `cohort` a Device is in.
- `hardware_version` - To identify the board revision of the device for
  situations when the device has not been seen before.
- `software_type` - The software component on the device responsible for
  performing OTA updates.
- `current_version` - The current `software_version` of the `software_type` that
  performs OTA updates. This is used to determine if there is a newer
  `software_version` available to be installed.

We can test this out from our computer to see the exact response a device will
see. Let's assume we have the following test device:

- `hardware_version`: mp
- `software_type`: stm32fw
- `current_version`: 0.0.1
- `device_serial`: DEMOSERIAL

#### Example Response when Newer OTA Payload Available

To simplify integration with deeply embedded devices that may not have a json
parser you can use the `api/v0/releases/latest/url` endpoint to receive the url
as a text response.

```bash

$ export MEMFAULT_LATEST_URL_API_ROUTE=https://device.memfault.com/api/v0/releases/latest/url
$ curl -i -X GET \
"${MEMFAULT_LATEST_URL_API_ROUTE}?device_serial=DEMOSERIAL&hardware_version=mp&software_type=stm32-fw&current_version=0.0.1" \
  --header "Memfault-Project-Key: ${YOUR_PROJECT_API_KEY}"


HTTP/1.1 200 OK
content-type: text/plain; charset=utf-8
[...]

https://url/to/ota/payload
```

When a new firmware has been found, you will get a HTTP response with a 200
status code.

If there are no updates available (such as when the device is already on the
newest firmware) you will see a 204 (No Content) http status code in the
response. We can try it out by retrying the query with `1.0.0-alpha` as the
value for `current_version`:

#### Example Response when Device is Up To Date

```bash
$ curl -i -X GET  \
  "${MEMFAULT_LATEST_URL_API_ROUTE}?device_serial=DEMOSERIAL&hardware_version=mp&software_type=stm32-fw&current_version=0.0.1" \
  --header "Memfault-Project-Key: ${YOUR_PROJECT_API_KEY}"

HTTP/1.1 204 NO CONTENT
memfault-reason: latest
[...]
```

#### Verbose Release Information

To query for all the information pertaining to a release you can use the
`releases/latest` route instead of `releases/latest/url`. In this situation
information about the release will be returned in a JSON blob:

```bash
$ export MEMFAULT_LATEST_API_ROUTE=https://device.memfault.com/api/v0/releases/latest
$ curl -i -X GET  \
  "${MEMFAULT_LATEST_API_ROUTE}?device_serial=DEMOSERIAL&hardware_version=mp&software_type=stm32-fw&current_version=0.0.1" \
  --header "Memfault-Project-Key: ${YOUR_PROJECT_API_KEY}"

HTTP/1.1 200 OK

content-type: application/json

{
  "artifacts": [
    {
      [...]
      "url": "URL_FOR_OTA_PAYLOAD"
    }
  ],
}
```

### Rollback Release

Aborting or Rolling back from a Release which has a firmware regression is easy
to do from the UI. Simply navigate to "Fleet" -> "Cohorts", click on the picker
under "Options" and select the "Abort Rollout" option.

## Firmware Integration Checklist

When querying the Memfault Latest Endpoint directly from firmware, there's a few
common configuration items you will want to confirm are setup correctly.:

### Include Root Certs to Communicate with Memfault cloud

In order to build the chain of trust as part of establishing a TLS session with
Memfault cloud, you will need to make sure your embedded stack includes the
appropriate root certificates. You can find the exact list exposed in both PEM &
DER format within the memfault-firmware-sdk at
[`memfault/http/root_certs.h`](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/http/include/memfault/http/root_certs.h#L146).

### Enable Server Name Indication (SNI) in TLS stack

Server Name Indication (SNI) is an extension that was added in 2003 to the TLS
1.0 Specification in [RFC 3546](https://tools.ietf.org/rfc/rfc3546.txt). It's
supported by effectively every modern day browser and network stack available.

Occasionally in an embedded stack the feature may not be enabled by default. If
the feature is not enabled you will see a TLS/SSL handshake failure with Alert
Code 80 trying to establish a TLS connection with the Memfault cloud.

To fix the issue, you just need to enable the SNI feature in your TLS stack. For
example, here's what to check for some common TLS stacks used in embedded
devices:

- `mbedTLS` - Make sure `MBEDTLS_SSL_SERVER_NAME_INDICATION` is set as a config
  option.
- `OpenSSL` - Make sure to call `SSL_set_tlsext_host_name(ssl, <host_name>)`
  prior to calling `SSL_connect()`.
