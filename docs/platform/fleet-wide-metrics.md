---
id: fleet-wide-metrics
title: Fleet-Wide Metrics
sidebar_label: Fleet-Wide Metrics
---

Memfault indexes and aggregates the metrics collected by your devices to provide
you not only with insights of how individual devices are performing, but also
the emergent behavior of your entire fleet.

You can add charts to visualize these aggregated, fleet-wide metrics by
navigating to the sidebar and selecting **Dashboards** and then **Metrics**.

![](/binary-assets/fleet-wide-metrics-sidebar.png)

Creating a new chart is as simple as clicking `Create Chart`, selecting your
metric of interest, and choosing the desired aggregation type.

![](/binary-assets/fleet-wide-metrics-create-chart.gif)

The list of metrics available in your project is automatically created from the
metrics collected by your devices. For that reason, at least one device must
upload data for a given metric before a chart for that metric can be created.

The aggregation of the metrics is done periodically, usually every few hours. To
refresh the data inside a chart immediately, click the refresh button in the
chart itself.

For more information about adding metrics to your devices:

- Bare Metal/RTOS: see the [Metrics Guide](https://mflt.io/embedded-metrics)
- Android: update to the 3.0+ version of the
  [Bort SDK](https://mflt.io/android-bort-sdk)
