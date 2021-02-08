---
id: android-eventlog-metrics
title: Collecting Device Metrics
sidebar_label: Collecting Device Metrics
---

Memfault has support for various built-in AOSP metrics, like battery health,
wakelock counts, foregrounded apps and so on.

Aside of the built-in metrics, it is also possible to define custom ones. In
this guide we describe step-by-step how to add custom metrics to periodically
collect the RSSI (Received Signal Strength Indicator), ambient light sensor
measurements and the available disk space of our fictive devices. In Memfault's
UI, the data that gets collected from each device over time, is visualized in
graphs in the Timeline:

![Android Custom Metrics](/img/docs/android/android-eventlog-metrics.png)

## Summary

1. RECOMMENDED: Define your custom tags and generate helper methods. Define tags
   with the `mflt_` prefix. AOSP-built apps should define an `EventLog.logtags`
   file in their root directory and add that entry to their `Android.bp`.
2. REQUIRED: Call the `EventLog` API to log events. If you compiled a custom
   `EventLog.logtags` file, use the generated Java APIs. Otherwise use
   `EventLog` directly with an integer tag in the range of 1000000-2000000, or a
   custom `mflt_`-prefixed tag defined in `/system/etc/event-log-tags` (which is
   generated from `.logtags` files).

When Memfault receives a bug report containing those custom events, they will be
displayed in that Bug Report's timeline under `EventLog`.

## Logging custom metrics using EventLog

The Android SDK contains an API called
[EventLog](https://developer.android.com/reference/android/util/EventLog). As
per its documentation, this API is intended to record system-level diagnostics.

The heart of the API looks like this: `EventLog.writeEvent(int tag, ... value)`
where the dots can be `int`, `float`, `string`, etc. We won't be using this API
directly, but a generated helper class. More on that later.

### Tags

The `tag` argument is a unique code or "key" that is used to be able to identify
the type of event. In this guide, we will be logging RSSI, ambient light level
and free disk space. We will use a separate tag for each.

Note that the tag code space is shared with the whole system. Many codes are
already used for AOSP-internal purposes. Tags 1000000-2000000 are available for
vendor/OEM/3rd party use.

Tags can also be given string names, through "`.logtags`" files that map the tag
code to the tag name, as well as define the expected value type(s). More on that
later.

To see what tags are being used on your system, run
`adb shell cat /system/etc/event-log-tags` to dump out the list of known tags.

The Memfault UI will automatically visualize data that is logged for named tags
starting with the prefix `mflt_`.

This requires adding the tag code, tag name to a `.logtags` file. These
`.logtags` files are merged together to generate the
`/system/etc/event-log-tags` file that is baked into the ROM and is therefore
only an option for apps that are built as part of the AOSP build.

Alternatively, for apps that are not built as part of the AOSP build, "anonymous
tags" can be used. If a tag code is used, but the tag code is not present in the
`/system/etc/event-log-tags` file, we call it an "anonymous tag". The data will
still be visualized, but in the UI, it will be labelled with the tag's code
instead of the human-readable tag name.

#### Creating an `EventLog.logtags` file

The AOSP comes with tooling for defining EventLog tags, generating Java helper
classes and getting the tags merged into `/system/etc/event-log-tags`. Create a
file called `EventLog.logtags` in your app's source directory:

```text
option java_package com.acme.myapp

19000000 mflt_rssi (rssi|1)
19000001 mflt_ambient_light (ambient_light|1)
19000002 mflt_disk_space_free (disk_space_free|1)
```

At the top, specify the Java package of your application. In the next sections,
we will get back to this.

The rest of the file contains one tag definition per line. Each starts with the
tag code, the tag name and finally the value name and data type. For this guide,
we use the `int` data type (`1`).

Tag names (minus the `mflt_` prefix) show up in the Memfault UI. For example,
the tag `mflt_disk_space_free` will be displayed as "Disk Space Free". See also
the screenshot at the top of this page.

Even though values must be named, the value names are currently _not_ used by
the Memfault UI.

For more details on the syntax, we recommend reading the commentary in this
[.logtag file in the AOSP source code](https://cs.android.com/android/platform/superproject/+/master:system/core/logcat/event.logtags?q=file:event.logtags).

#### Building the `EventLog.logtags` file (for AOSP-built apps)

The AOSP build system has built-in support for `.logtags` files, taking care of
2 things:

1. It will merge our custom tags from the `EventLog.logtags` file into
   `/system/etc/event-log-tags`.

2. It will generate a `.java` source file with a helper class
   `com.acme.myapp.EventLog` (named based on the logtags file name and
   `option java_package ...`).

To build the `EventLog.logtags` file, add a new `java_library` to your app's
`Android.bp` file and also add this new target is added to the `static_libs`
list of your app:

```
java_library {
    name: "MyAppLogTags",
    srcs: ["EventLog.logtags"],
}

android_app {
    name: "MyApp",
    srcs: [
        "src/**/*.java",
    ],
    static_libs: [
        "MyAppLogTags",
    ]
}
```

### Generated helper class

Based on the `EventLog.logtags` file, the AOSP build system generates a Java
class that looks like this:

```java
package com.acme.myapp;

public class EventLog {

  /* ... snip ... */

  /** 20000000 mflt_rssi (rssi|1) */
  public static final int MFLT_RSSI = 20000000;

  /** 20000001 mflt_ambient_light (ambient_light|1) */
  public static final int MFLT_AMBIENT_LIGHT = 20000001;

  /** 20000002 mflt_disk_space_free (disk_space_free|1) */
  public static final int MFLT_DISK_SPACE_FREE = 20000002;

  public static void writeMfltRssi(int rssi) {
    android.util.EventLog.writeEvent(MFLT_RSSI, rssi);
  }

  public static void writeMfltAmbientLight(int ambientLight) {
    android.util.EventLog.writeEvent(MFLT_AMBIENT_LIGHT, ambientLight);
  }

  public static void writeMfltDiskSpaceFree(int diskSpaceFree) {
    android.util.EventLog.writeEvent(MFLT_DISK_SPACE_FREE, diskSpaceFree);
  }
}
```

The helper class has methods for each of the tags, ensuring the correct tags
codes are used and the values are of the expected types.

#### "Manually" generating the helper class (for non-AOSP-built apps)

For apps that are not built as part of an AOSP build, we need to run the code
generator script to generate a Java helper class from the `EventLog.logtags`
file.

- Clone the AOSP repo that contains the generator script:

```bash
git clone https://android.googlesource.com/platform/build aosp-platform-build
```

- Run the code generator script:

```bash
cd aosp-platform-build/tools

python2 java-event-log-tags.py \
  -o /path/to/app/src/com/acme/myapp/EventLog.java \
  /path/to/app/EventLog.logtags
```

> NOTE 1: as of March 2020, the script was not yet Python 3.x compatible and
> required Python 2.x to run.

We recommend running the script as part of your app's Gradle build.

### Instrumenting your code

Now that we've defined tags for our metrics and have generated the helper class,
let's instrument our app's code.

In our application, we have a long running `Service` that has access to the data
we want to collect. The goal is to periodically collect the metric data for the
past hour and log it to the `EventLog`.

For simplicity, we will use the
[`Handler`](<https://developer.android.com/reference/android/os/Handler#postDelayed(java.lang.Runnable,%20long)>)
and `Runnable` APIs and not the more complicated
[`JobScheduler`](<https://developer.android.com/reference/android/app/job/JobInfo.Builder.html#setPeriodic(long)>).
Carefully consider what API is best to use in your use case.

```java
package com.acme.myapp;

import android.app.Service;
import android.os.Bundle;
import android.os.Handler;
import java.util.concurrent.TimeUnit;

class MyAppService : Service() {
    private final static long MEMFAULT_HEARTBEAT_INTERVAL_MILLIS = TimeUnit.HOURS.toMillis(1)

    private Handler handler = new Handler();
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {

            // Get values for the past hour:
            // For aggregates (counters, averages, max, min, etc) ensure to
            // reset them after logging the values!

            int rssi = getRssi();
            int ambientLight = getAmbientLight();
            int diskSpaceFree = getDiskSpaceFree();

            // Write the values to the EventLog:

            EventLog.writeMfltRssi(rssi);
            EventLog.writeMfltAmbientLight(ambientLight);
            EventLog.writeMfltDiskSpaceFree(diskSpaceFree);

            // Reschedule:

            handler.postDelayed(this, MEMFAULT_HEARTBEAT_INTERVAL_MILLIS);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Start collecting metrics:
        handler.post(runnable);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(runnable);
    }

    /* ... snip ... */
}
```

Now build AOSP and/or the app, install it and let it run for a while to collect
your custom metrics data!

### Wrapping Up

The metrics data is automatically emitted into a Bug Report. For testing
purposes, run `adb bugreport` to
[generate a Bug Report locally](https://developer.android.com/studio/debug/bug-report#bugreportadb).
Upload the resulting `bugreport-*.zip` file to Memfault, by going into "Issues"
=> "Manual Upload".

Once the Bug Report is processed, go to "Devices" => Select your Device =>
"Timeline". A new group called "EventLog" should appear in the Timeline view.
Expand the group to see "Rssi", "Ambient Light" and "Disk Space Free".

## Troubleshooting

- I don't see any rows for my custom metrics in the Memfault UI, how to debug
  this?

  - Try running `adb logcat -b events`. This wil print all collected data. If
    your events are not present there, double check that the `EventLog.write...`
    calls actually happen.
  - Make sure the tag names are prefixed with `mflt_` (lowercase). Data is only
    shown for named tags starting with the `mflt_` prefix or for anonymous tags
    that are not added to `/system/etc/event-log-tags`.
  - Ensure EventLog calls have only 1 value argument. Multiple values per tag
    are currently not supported.
  - Ensure calls for a given tag must use the same type. Changing the value type
    from one call to the next for the same tag is not supported.
