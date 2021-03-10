---
id: android-releases-integration-guide
title: Android OTA Integration Guide
sidebar_label: OTA / Release Management
---

This tutorial covers how to manage your Android over-the-air update flow with
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

### Identifying an Android Device

For a "Device" in a project, several pieces of identifying information are
tracked.

- `Device Serial` / `device_serial` - A unique identifier of a device. The
  system property `ro.serialno` or
  [`android.os.Build.getSerial()` API](<https://developer.android.com/reference/android/os/Build#getSerial()>)
  is used to get this value. Make sure it is unique for every device in the same
  Project, and that the calling app has the requisite permissions to obtain the
  device serial number.
- `Hardware Version` / `hardware_version` - For a given device, the revision of
  the hardware. For more information, see our
  [Hardware Version](platform/software-version-hardware-version.md#android)
  documentation.

  By default, the value of the `ro.product.board` system property is used as
  "Hardware Version".

_Note: For any given device, neither of these pieces of information should ever
change._

### Identifying Software

- `Software Type` / `software_type` - A shorthand name representing a software
  package running on your device. For Android projects, the system software is
  always represented by the `android-build` Software Type.
- `Software Version` / `software_version` - Each build of a "software_type" is
  uniquely identified by its "software_version".

For more information, see our
[Software Version](platform/software-version-hardware-version.md) documentation.

### Identifying Firmware Binaries

- `OTA Payload` - This is the
  [`ota_update.zip`](https://source.android.com/devices/tech/ota/tools) that you
  deliver to your device when performing an over-the-air update.
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

The Hardware Version we will be targeting is matches our products'
`ro.product.board` system property value. In the commands below, please replace
`${YOUR_PRODUCT_BOARD_HERE}` with your products' `ro.product.board` system
property value.

To find the Software Version from the Android build artifacts, we can print the
`out/target/product/$DEVICE/build_fingerprint.txt` file, for example:

```bash
$ cd /dev/smartfridge/
$ cat out/target/product/smartfridge/build_fingerprint.txt
acme_inc/smartfridge/smartfridge:10/QQ2A.200405.005/04302340:user/release-keys
```

To indicate to Memfault we are uploading the OTA payload for the Android system
itself, we need to use `android-build` as the `software_type`.

The complete Memfault CLI invocation to upload the OTA payload:

```bash
$ cd /dev/smartfridge/
$ memfault --email ${YOUR_EMAIL} \
  --password ${YOUR_USER_API_KEY} \
  --org ${YOUR_ORG_SLUG} \
  --project ${YOUR_PROJECT_SLUG} \
  upload-ota-payload \
  --hardware-version ${YOUR_PRODUCT_BOARD_HERE} \
  --software-type android-build \
  --software-version $(< out/target/product/smartfridge/build_fingerprint.txt) \
  out/dist/path-to-ota-user.zip

INFO: out/dist/path-to-ota-user.zip: uploaded!
INFO: You can view in the UI here:
    <Link to Release in UI>
```

:::note Tip
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
  --hardware-version ${YOUR_PRODUCT_BOARD_HERE} \
  --software-type android-build \
  --software-version $(< out/target/product/smartfridge/build_fingerprint.txt) \
  out/dist/path-to-ota-user.zip

INFO: out/dist/path-to-ota-user.zip: uploaded!
INFO: You can view in the UI here:
    <Link to Release in UI>
```
:::

### Deploy Release

Now let's deploy the release to the `default` cohort.

:::note
Any new device seen that has not explicitly been assigned to a custom
cohort will be part of this cohort. To pre-create devices assigned to a
specific cohort check out our [api-docs](https://api-docs.memfault.com/).
:::

In the UI navigate to "Fleet" -> "Cohorts". Click on the picker under next to
the `default` cohort under "Target Release", select the Release to deploy and
you will be prompted with options that can be performed for the release.

### Query for OTA Payload

Now that we have a release uploaded let's walk through the steps to download the
release on a device!

To receive an OTA Payload, a device will need to pass these REST API query
parameters:

- `device_serial` - This is used for determining the `cohort` a Device is in.
- `hardware_version` - To identify the board revision of the device for
  situations when the device has not been seen before.
- `software_type` - The software component on the device responsible for
  performing OTA updates, which should always be set to `android-build`.
- `current_version` - The current `software_version` of the `software_type` that
  performs OTA updates. This is used to determine if there is a newer
  `software_version` available to be installed.

We can test this out from our computer to see the exact response a device will
see. Let's assume we have the following test device:

- `hardware_version`: subzero
- `software_type`: android-build
- `current_version`:
  acme_inc/smartfridge/smartfridge/subzero:10/QQ1.factory/001:user/release-keys
- `device_serial`: DEMOSERIAL

#### Example Response when Newer OTA Payload Available

```bash
$ export MEMFAULT_LATEST_API_ROUTE=https://device.memfault.com/api/v0/releases/latest
$ export SOFTWARE_VERSION=acme_inc%2Fsmartfridge%2Fsmartfridge%2Fsubzero%3A10%2FQQ1.factory%2F001%3Auser%2Frelease-keys
$ curl -i -X GET \
  "${MEMFAULT_LATEST_API_ROUTE}?device_serial=DEMOSERIAL&hardware_version=subzero&software_type=android-build&current_version=${SOFTWARE_VERSION}" \
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

When a new payload has been found, you will get a HTTP response with a 200
status code.

If there are no updates available (such as when the device is already on the
newest firmware) you will see a 204 (No Content) http status code in the
response. We can try it out by retrying the query with
`acme_inc/smartfridge/smartfridge/subzero:10/QQ2A.200405.005/04302340:user/release-keys`
as the value for `current_version`:

#### Example Response when Device is Up To Date

```bash
$ export SOFTWARE_VERSION=acme_inc%2Fsmartfridge%2Fsmartfridge%2Fsubzero%3A10%2FQQ2A.200405.005%2F04302340%3Auser%2Frelease-keys
$ curl -i -X GET  \
  "${MEMFAULT_LATEST_URL_API_ROUTE}?device_serial=DEMOSERIAL&hardware_version=mp&software_type=stm32-fw&current_version=0.0.1" \
  --header "Memfault-Project-Key: ${YOUR_PROJECT_API_KEY}"

HTTP/1.1 204 NO CONTENT
memfault-reason: latest
[...]
```

### Rollback Release

Aborting or Rolling back from a Release which has a firmware regression is easy
to do from the UI. Simply navigate to "Fleet" -> "Cohorts", click on the picker
under "Options" and select the "Abort Rollout" option.
