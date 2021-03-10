---
id: software-version-hardware-version
title: Software Version & Hardware Version
sidebar_label: Software Version & Hardware Version
---

## Hardware Version

The "Hardware Version" is used to identify the type of hardware on which
software is running. In Memfault, a device always has exactly one "Hardware
Version". It can be used to differentiate different device types being tracked
in the same project (i.e. `smart-toaster` and `smart-oven`) and different board
revisions of the same device type (i.e. `smart-toaster-evt`,
`smart-toaster-pvt`, etc.).

### Android

On Android, Memfault uses the `ro.product.board` system property as the device's
hardware version by default. From the
[Android product documentation](https://source.android.com/setup/develop/new-device#build-layers):

> The board/device layer represents \[...\] the bare schematics of a product.
> These include the peripherals on the board and their configuration.

## Software Type

The "Software Type" is used to identify the separate pieces of software running
on a given device. This can be images running on different MCUs (i.e
`main-mcu-app` & `bluetooth-mcu`) or different images running on the same MCU
(i.e `main-mcu-bootloader` & `main-mcu-app`). You can also use "Software Type"
to distinguish between build variants (i.e. `main-mcu-dvt` & `main-mcu-evt`).

### RTOS

The software running on your devices will need to report its Software Type
correctly such that it matches with what has been configured in the Project.
Please see the
[core/device info component](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/README.md)
of the Firmware SDK for details on how to set this up on the device's software
side.

### Android

Memfault uses the "Software Type" `android-build` to identify the system
software running on the device.

Applications have a "Software Type" equal to their
[application ID](https://developer.android.com/studio/build/application-id),
e.g. `com.acme.smartsink`.

## Software Version

A Software Version is a single build of a particular Software Type. Software
Versions are used in Memfault in a variety of ways, including but not limited
to:

- Displaying issue distributions by version
- Determining regressions: re-opening an issue if a defect recurs in a newer
  Software Version after the issue was marked as resolved
- Checking if a device is up to date: if your project uses Memfault to deploy
  firmware, the firmware's Software Version is used to determine if a device
  requires an update

### RTOS

A single Software Version is associated with one Symbol Software Artifact (.elf
file).

    ├── main-fw     # Software Type
    │   ├── 1.0.0   # Software Version
    │   ├── 1.1.0
    │   ├── 1.1.1
    |   ...
    └── wifi-fw
        ├── 11.0
        ├── 12.0
        ├── 12.1
        ...

The software running on your devices will need to report its Software Version
correctly such that it matches with what has been configured in the Project.
Please see the
[core/device info component](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/README.md)
of the Firmware SDK for details on how to set this up on the device's software
side.

### Android

Memfault supports extracting the Software Version for the `android-build`
Software Type from several different sources in order to suit different build
configurations.

By default, irrespective of the source, the Software Version will be ordered
using natural sort, as implemented by
[natsort](https://pypi.org/project/natsort/). It is possible to customize how
the Software Version is interpreted and sorted, for example using
[SemVer](https://semver.org/). If you would like to make these changes, please
let us know.

#### Recommended: Build Fingerprint and System Property

We recommend using both the build fingerprint and a custom system property for
situations where the build fingerprint does not contain a meaningful identifier;
for example, if the incremental and ID parts of the fingerprint are set by the
ODM and have no semantic meaning for your internal software versioning.

The full Software Version stored in Memfault will have the form:

```
${fingerprint}::${property}
```

This provides the additional functionality enabled by using the build
fingerprint, while also using a system property of your choice for display and
comparison purposes.

The fingerprint must uniquely identify the build, and the specified system
property must also uniquely identify the build.

#### Recommended: Build Fingerprint Only

Memfault supports using the
[Android build fingerprint](https://developer.android.com/reference/android/os/Build#FINGERPRINT)
as the Software Version. In recent AOSP builds, the build fingerprint can be
found in `out/target/product/$DEVICE/build_fingerprint.txt`.

If the fingerprint is used to specify the Software Version, the fingerprint must
be unique for each build.

We recommend using the fingerprint instead of a single system property because
it enables additional functionality such as the ability to filter traces based
on fingerprint properties like the build type.

Because the build fingerprint is usually a very long string, the Memfault UI
will show only the most relevant part. By default, the "incremental" component
is used for display and ordering; this can be customized to instead use e.g. the
"ID" component.

#### System Property Only

The Software Version can be sourced from any system property. The specified
property must be able to uniquely identify the build (the value must be unique
for each build).

### Android Applications

For an Android application, Memfault stores both the
[`versionCode` and `versionName`](https://developer.android.com/studio/publish/versioning);
the `versionCode` is used to compare Software Versions.
