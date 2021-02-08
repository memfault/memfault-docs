---
id: alerts
title: Alerts
sidebar_label: Alerts
---

The Alerts feature will send a team an alert when heartbeat events satisfy a
given threshold for a specific set of filters. To find the feature, click the
**Alerts** item in the sidebar.

## Example

Let's create an alert when the **battery_pct** (battery percentage) is below 5%,
for devices with serial numbers starting with **MFLT.**

- Click **Alerts** in the sidebar
- Click **New Alert** in the top right
- Provide a **Title** and optional **Description** (but highly advised)!
- Next, the **Threshold** value is the _metric_ _name_ within a heartbeat
- We set the threshold value to **is less than** **5**.
- We also wanted to make sure that the **Device Serial** values start with
  _MFLT_.
- To do this we click **Add**, and specify these values. To add multiple
  filters, click **Add** and repeat the process

![/img/docs/platform/alerts-edit.png](/img/docs/platform/alerts-edit.png)

- Above, we have created our Alert! Click **OK**

## Results

Once the Alert is set up, Memfault will watch for Events matching the criteria
specified. If it finds any, it will create Incidents, which can be found by
clicking on the Alert entry in the Alerts table.

![/img/docs/platform/alerts-incidents.png](/img/docs/platform/alerts-incidents.png)

On top of the entries in this view, Memfault will send an email every **5
minutes** summarizing the number of devices that meet this threshold. Given this
fact, it is best to set up the Alerts so that they are hit rarely to prevent
abuse of the email inbox.
