---
id: android-patches
title: Android Patches
sidebar_label: Android Patches
---

## ANR Symbolication Patch

In Android version 10 (and older), an
[ANR](https://developer.android.com/topic/performance/vitals/anr) trace is
lacking the information to symbolicate the native stack frames in the trace.
More specifically, so called "GNU Build ID"s are absent from ANR traces for
ART/Java processes.

> Side note: Traces from
> [Tombstones/crash dumps](https://source.android.com/devices/tech/debug) have
> been including the "GNU Build ID" as of Android 10.

To solve this, we have prepared a patch that modifies the ART code such that the
ANR traces include the GNU Build IDs in exactly the same way as they already get
included in Tombstones:

| Subdir | Repo           | Version    | Patch Commit SHA                                                                                         |
| ------ | -------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `art`  | `platform-art` | Android 10 | [1e8f1da](https://github.com/memfault/aosp-platform-art/commit/1e8f1da442b1881cc91a0e93dd2883e86e1c247d) |

If you use an older version of Android and need help back-porting the patch,
please contact us.

### Applying Patch

The easiest way to apply a patch is to `git cherry-pick` it from Memfault's
clone:

```bash
# In the Android source directory, move into the "art" subdir:
cd art

# Add Memfault's clone as a remote:
git remote add memfault https://github.com/memfault/aosp-platform-art.git

# Fetch the code:
git fetch memfault-aosp-platform-art

# Apply the patch:
git cherry-pick 1e8f1da

# (Optional) Remove Memfault's clone again:
git remote remove memfault-aosp-platform-art
```

## Tombstone Timestamp Patch

In version Android 9 and below, your Tombstone files may not contain a
timestamp. As a work-around, Memfault will fall back to the time that the bug
report was created.

We recommend you apply
[this patch](https://android.googlesource.com/platform/system/core/+/6f4644d15b3df1a9be92348f23a62282a8b332f6%5E%21/#F1)
in order to have the most accurate timestamps for your native crashes. This will
help both you and Memfault correlate the crash with the logs and other
information collected from the device.
