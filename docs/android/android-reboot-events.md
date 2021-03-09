---
id: android-reboot-events
title: Android Reboot Events
sidebar_label: Reboot Events
---

:::note Prerequisite
For best results with this feature, we recommend using at least
the 3.0 version of the [Bort SDK](/docs/android/android-bort). Check out the
[getting started guide](/docs/android/android-getting-started-guide) for
details on integrating the latest version.
:::

The Memfault Bort SDK can track when your device reboots and upload an event
when this occurs, allowing you to visualize unexpected spikes in device resets
across your fleet.

On Android 9 and above, the `sys.boot.reason` system property is available, so
the SDK is able to associate the reboot event with the reason reported by the
OS. This includes reasons such as low battery, dangerous reboots from a watchdog
condition, as well as expected reasons such as reboots due to an OTA update.

For detailed information on the different types of boot reasons, see Android's
[Canonical Boot Reason documentation](https://source.android.com/devices/bootloader/boot-reason).

For versions of Android prior to 9, because the boot reasons are unavailable,
the reasons are displayed in Memfault as `bort_unknown`.

A chart of the reboot events for devices in a given project can be found by
navigating to **Dashboards** and **Overview**. Below is a sample of what reboot
reasons may look like on a small fleet of test devices:

![](/binary-assets/android-reboot-reasons-example.png)
