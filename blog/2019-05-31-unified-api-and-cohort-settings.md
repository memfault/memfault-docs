---
title: Unified Query Parameter APIs, Cohort Settings, and More
---

## Unified Query Parameter APIs

Standardized naming conventions when adding filters to Memfault REST APIs.
Filtering by multiple parameter values now looks like `cohort=a&cohort=b` Refer
to [API Docs](/api) for more details.

<!-- truncate -->

## Cohort Settings on Cohort Details Page

![/img/blog/2019-05-31-cohort-details-page.png](/img/blog/2019-05-31-cohort-details-page.png)

## Device Metric Table Improvements

We sped up metric chart visualization (~50x) to improve rendering for a large
collection of data points.

## Trace Register View Bug fix

In some situations, register values would appear incorrect in the Memfault trace
view (i.e `0x-1234`). This has been fixed and registers can now also be viewed
in hex as well as decimal
