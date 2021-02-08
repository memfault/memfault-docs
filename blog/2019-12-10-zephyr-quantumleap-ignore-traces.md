---
title: Zephyr RTOS, QuantumLeap RTEF, and Better Cohorts
---

## Zephyr RTOS and QuantumLeap RTEF

Memfault now supports the popular Zephyr RTOS (versions 1.14 and 2.x) and
QuantumLeap's RTEF. This includes coredumps, stack traces, global variables, and
much more.

<!-- truncate -->

## Ignore Traces from Specified Cohorts

![/img/blog/2019-12-10-ignore-traces.png](/img/blog/2019-12-10-ignore-traces.png)

It is now possible to configure a Cohort to ignore Traces. This means that if
any new unseen Traces appear on Devices of a specified Cohort, Memfault will not
generate new Issues or send emails related to the new events.

This is especially useful when internal test devices or development boards are
still configured to send data to Memfault. Configure this option in Cohort →
Settings
