---
title: Schedules, More RTOS Support, MPU Analyzer, and More
---

## Update Schedules

You can now specify per Cohort when Devices are able to update. If you only want
to update Devices on the weekends, now you can! Find the new settings in the
Cohort Settings card.

<!-- truncate -->

![/img/blog/2019-07-23-update-schedules.png](/img/blog/2019-07-23-update-schedules.png)

:::note
Times are in **UTC**.
:::

## ThreadX and Zephyr RTOS Support

Memfault can now process Traces sent by devices running ThreadX and Zephyr and
provide backtraces to all of the threads, show arguments and local variables
with functions, and detect faults!

## Analyzer for MPU Configuration

Memfault now analyzes the active MPU configuration (for any Cortex-M0+, M1, M3,
M4, or M7) and can detect common configuration errors that can go unnoticed and
cause issues in the field.

We've included another tab on the Issues/Trace page which shows our MPU
analysis. Here, we tell you if the MPU is configured correctly or not, and
provide guidance on how to fix any issues we find.

![/img/blog/2019-07-23-mpu-analyzer.png](/img/blog/2019-07-23-mpu-analyzer.png)

## Show Resolved Date and Resolver

Memfault now shows when and who resolved an Issue in the Issue Status card.

![/img/blog/2019-07-23-issue-resolution.png](/img/blog/2019-07-23-issue-resolution.png)

## Release Ordering

Releases within the dashboard can now be sorted. They are sorted using standard
Semantic Versioning 2.0 sorting. This sorting method is also used when know if a
Release is "greater" than another.

![/img/blog/2019-07-23-release-ordering.png](/img/blog/2019-07-23-release-ordering.png)
