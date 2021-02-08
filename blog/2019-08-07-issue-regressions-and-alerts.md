---
title: Issue Regressions, Email Alerts, Rust, Keil RTX5, and Even More
---

## Issue Regressions

Memfault will now re-open an Issue if it is seen on a newer version than when it
was last resolved. This helps teams find when Issues are not actually fixed!

<!-- truncate -->

For example, if an Issue is "Resolved" when the Max Version is 1.0.0, and the
same Issue appears on a version 1.0.1, then that Issue will be re-opened due to
a regression.

To prevent regressions from occurring on a particular issue, there is a new Mute
feature as well.

![/img/blog/2019-08-07-issue-regressions.png](/img/blog/2019-08-07-issue-regressions.png)

## Email Alerts on Issues

Memfault will now send out emails on new, resolved, regressed, and reopened
Issues.

![/img/blog/2019-08-07-issue-alerts.png](/img/blog/2019-08-07-issue-alerts.png)

## Rust Trace Support

Memfault can now process traces generated from devices running
[Embedded Rust](https://www.rust-lang.org/what/embedded).

## Keil RTX5 RTOS / (Mbed OS) Awareness

Memfault can now process traces generated while using the Keil RTX5 RTOS (used
in the Mbed OS) and display traces for all the threads. Here's a portion of an
example crash due to executing a bad function:

![/img/blog/2019-08-07-keil-rtx5.png](/img/blog/2019-08-07-keil-rtx5.png)

## Deployments View

A new page in the "Fleet" let's you easily view your most recent deployments.

![/img/blog/2019-08-07-deployments-view.png](/img/blog/2019-08-07-deployments-view.png)
