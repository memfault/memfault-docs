---
id: uploading-software-versions
title: Uploading Software Versions
sidebar_label: Uploading Software Versions
---

This guide assumes that we are starting from ground zero (essentially a new
Project), but it is applicable at any state of a Project.

This tutorial will walk through the typical process of creating a Software Type
and Software Version and uploading a build's Symbol files (.elf) to Memfault to
symbolicate Traces and Coredumps.

## Prerequisites

- The logged in user must already be part of an Organization
- A Project must already be created
- Have a Symbol file ready to upload

## Create a Software Type

We'll first want to create a Software Type. The "Software Type" is used to
identify the separate pieces of software running on a given device.
[More information on this concept can be read here.](/platform/software-version-hardware-version.md)

Let's assume our product only has a single micro-controller with one main
firmware binary. Let's create a Software Type for this piece of software called
`mcu-main-fw`.

1. Select the desired Project from the left sidebar dropdown
2. Select **Software** in the left sidebar
3. Click **New Software Type** in the top right corner

   ![/img/docs/embedded/software-versions-create-type.png](/img/docs/embedded/software-versions-create-type.png)

4. Input the name of the **Software Type**, assuring that it only contains
   alphanumeric characters, spaces, hyphens, dots, plus signs and underscores

   ![/img/docs/embedded/software-versions-input-name.png](/img/docs/embedded/software-versions-input-name.png)

5. Click **Create** You've now created a new Software Type. Now we're ready to
   move on and create a Software Version "under" this Software Type:

## Create a Software Version

Let's assume we'll want to create Software Version `1.0.0` for Software Type
`mcu-main-fw` which we created in the previous section above. We'll upload the
**Symbols** (.elf file) for the particular **Software Version**. Adding a
"symbol" file artifact will allow Memfault to symbolize crashes and events.

1. Select **Software** in the left sidebar and locate `mcu-main-fw` in the list.
2. In `mcu-main-fw`'s row, click `... versions` in the **Versions** column
   table.

   ![/img/docs/embedded/software-versions-versions-column.png](/img/docs/embedded/software-versions-versions-column.png)

3. Click **New Version**

   ![/img/docs/embedded/software-versions-new-version.png](/img/docs/embedded/software-versions-new-version.png)

4. Select **symbols** from the **Type** dropdown.

   Enter `1.0.0` as the **Version**.

   Click **Select File** and find the .elf symbol file on your computer.

   Click **Add**

   ![/img/docs/embedded/software-versions-symbols-add.png](/img/docs/embedded/software-versions-symbols-add.png)

5. In the table of versions for `mcu-main-fw`, you will now see the newly
   created `1.0.0` version:

   Traces (coredumps or events) that refer to `mcu-main-fw/1.0.0` can now be
   symbolized correctly by Memfault!

   ![/img/docs/embedded/software-versions-newly-created.png](/img/docs/embedded/software-versions-newly-created.png)

You can also use the HTTP API to create Software Types and Versions and upload
symbols files, which is useful if you want to automatically upload them from a
build server.
[Take a look at the HTTP API documentation to learn more.](https://api-docs.memfault.com/)
