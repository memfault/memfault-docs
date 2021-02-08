---
title: New Jira Integration
---

In this update, we've added Jira integration, the ability to filter Issues by
Cohort, and much more.

<!-- truncate -->

## Jira Integration

Teams are now able to quickly create Jira Issues from a Memfault Issue. You can
find these settings within the Project Settings page under **Integrations**.

<p align="center">
  <img width="500" src="/img/blog/2020-01-27-jira-integration-issue.png" alt="jira-integration-memfault" />
</p>

## Filter Issues by Cohort

It is now possible to filter Issues by Cohort. If an Issue has occurred in a
Cohort at least once, it will be returned in this filter.

<p align="center">
  <img width="500" src="/img/blog/2020-01-27-issue-cohort-filtering.png" alt="issue-cohort-filtering" />
</p>

## Other Updates

- Add support for [Apache MyNewt](https://mynewt.apache.org/) RTOS
- The local debug flow and Memfault Try service now support ESP32
- Better handling of `void *` pointers in the Globals & Statics tab
- The user who resolves an Issue will no longer receive an email of the action.
