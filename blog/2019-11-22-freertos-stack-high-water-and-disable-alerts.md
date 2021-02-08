---
title: FreeRTOS Stack High Water Marks and Selective Alerts
---

## FreeRTOS Stack High Water Marks

When using FreeRTOS, Memfault will now show _the high water mark_ of each
thread, as well as show when a _Stack Overflow_ has occurred on any thread. This
can be applied to any RTOS, so if this is of interest, let us know.

<!-- truncate -->

![/img/blog/2019-11-22-freertos-stack-high-water.png](/img/blog/2019-11-22-freertos-stack-high-water.png)

## Enable/Disable Alerts

![/img/blog/2019-11-22-enable-disable-alerts.png](/img/blog/2019-11-22-enable-disable-alerts.png)

If an Alert becomes noisy, quickly disable it by toggling the switch.

## General Improvements

- Improvements to FreeRTOS crash analysis
- Globals and Statics view speed improvements
