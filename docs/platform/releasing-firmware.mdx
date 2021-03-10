---
id: releasing-firmware
title: Releasing Firmware
sidebar_label: Releasing Firmware
---

This guide assumes that we are starting from ground zero (essentially a new
Project), but it is applicable at any state of a Project. This guide can be used
as a checklist of sorts for how to deploy a firmware update to devices.

## Prerequisites

- The logged in user must already be part of an Organization
- A Project must already be created
- Have a Symbol file and a Firmware Binary file ready to upload

## Create a Cohort

We'll first want to create a Cohort, which we will group devices into when they
have been provisioned into Memfault.

1. Select the desired Project from the left sidebar dropdown
2. Select **Cohorts** in the left sidebar
3. Click **Add New Cohort**
4. Input the name of the Cohort, assuring that it only contains alphanumeric
   characters, spaces, hyphens, and underscores

![/img/docs/platform/releasing-firmware-create-cohort.png](/img/docs/platform/releasing-firmware-create-cohort.png)

5. Click **Create**

![/img/docs/platform/releasing-firmware-create-cohort-click.png](/img/docs/platform/releasing-firmware-create-cohort-click.png)

You've now created a Cohort. Let's going ahead and move on to creating a Release
to Deploy to this Cohort.

## Create a Release

1. Select **Releases** → **All Releases** in the sidebar
2. Click **Add New Release** and fill in the details. Below, we are creating a
   release _1.0.2_ with the Git SHA-1 of
   _c08414e75d08f2e0e4336ff84d4263566908bcfb_

![/img/docs/platform/releasing-firmware-create-release.png](/img/docs/platform/releasing-firmware-create-release.png)

3. Click **Create**. You will now be navigated to the Release Details page for
   the release you just created.

## Uploading Release Artifacts

Next, we'll want to upload the Artifacts for the particular Release we just
created. For deployment firmware to devices, we are only required to add a
"firmware" type of Artifact. Adding a "symbol" file artifact will allow Memfault
to symbolize crashes, so it's suggested to upload both at this time.

1. Navigate to the Release Details page if you are not already there by
   selecting **Releases** → **All Releases**, then clicking **Details** next to
   the Release desired.
2. In the Artifacts pane, click **Add Artifact to Release**
3. Fill out the fields with the required fields.

   For **Binary Type**, select _firmware_

   For **Hardware Version**, specify which revision of the hardware that this
   artifact will pertain to. Here, we are using _evt_ as our "evt" build has a
   particular set of hardware that will differs from past and future revision.
   If this is irrelevant, or you only have one hardware version, feel free to
   put something that makes sense.

   For **Upload**, upload the binary file that the end system knows how to
   install

![/img/docs/platform/releasing-firmware-create-release.png](/img/docs/platform/releasing-firmware-add-artifact-firmware.png)

4. Click **Add** and wait for the file to upload

You have now uploaded the firmware for the Release you created and the Hardware
Version specified. Let's go ahead and upload the symbol file for this release as
well.

5. Click **Add Artifact to Release** again
6. Fill out the fields with the required fields, but this time, it should be a
   symbol file (.elf, .out, etc). Memfault will verify this file is an valid
   .elf file.

![/img/docs/platform/releasing-firmware-create-release.png](/img/docs/platform/releasing-firmware-add-artifact-symbols.png)

7. Click **Add**

You now have a valid firmware and symbol file for the Release you created for
the Hardware Version specified.

![/img/docs/platform/releasing-firmware-all-releases.png](/img/docs/platform/releasing-firmware-all-releases.png)

## Deploying a Release to Cohort

We now want to Deploy this Release to the Cohort, both of which we just finished
setting up. For any Devices that are placed in the Cohort we created, when they
query Memfault for the latest firmware they should download, they'll be able to
download this Release!

1. Select **Cohorts** in the sidebar
2. Next to the Cohort we created earlier, under **Target Release**, select the
   Edit button

![/img/docs/platform/releasing-firmware-edit-button.png](/img/docs/platform/releasing-firmware-edit-button.png)

3. Select the Release desired from the Dropdown
4. Click the **Check** button to the right of the Release selection
5. On the next screen, there is an option to select either a _Normal_ or a
   _Staged Rollout_.

![/img/docs/platform/releasing-firmware-deployment-options.png](/img/docs/platform/releasing-firmware-deployment-options.png)

    Let's select *Normal* for now since this is our first Release.

6. Click **Deploy Release.**

You've now deployed a Release to a Cohort! If and when a Device pings Memfault
and asks for the latest Release, and it's in this Cohort, it will be given this
Release.

![/img/docs/platform/releasing-firmware-all-cohorts.png](/img/docs/platform/releasing-firmware-all-cohorts.png)
