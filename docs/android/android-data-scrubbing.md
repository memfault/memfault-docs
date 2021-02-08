---
id: android-data-scrubbing
title: Android Data Scrubbing
sidebar_label: Data Scrubbing
---

Memfault provides configurable, server-side scrubbing of Android data. To
configure data scrubbing, navigate to **Settings** and **Data Scrubbing**.

<p align="center">
  <img width="800" src="/binary-assets/android-data-scrubbing.png" />
</p>

## Allowed Application IDs

> Memfault will start filtering by _Allowed Patterns_ when the first _Allowed
> Pattern_ rule is added, so it is important to add a comprehensive set of
> _Allowed Patterns_.

The first processing step applied is to include log lines _only_ from
applications that match one or more _Allowed Patterns_.

For example, the _Allowed Pattern_:

- `com.memfault.*` would allow logs from applications whos ID started with
  `com.memfault.`
- `*` would match all application IDs and let all log lines pass.

Logs from applications that match any pattern will be allowed. Logs from
applications that do not match any pattern will be scrubbed.

Data scrubbing is applied at the time of processing, so it will not be
retroactively applied to data that has already been processed.

### Android OS Application IDs

In addition to your own application IDs, you may wish to add the following
_Allow Patterns_ to ensure that system applications are included:

```text
android*
com.android.*
```

## Text Scrubbing

> Text scrubbing rules will only be applied if one or more _Allowed Pattern_
> have been added.

Memfault can also perform additional scrubbing of logs that may appear to
contain sensitive information, such as email addresses or credentials.

If text scrubbing is enabled, a string that appears to be sensitive will be
replaced with a hash of that string, rendering it obfuscated. Since it is
replaced with a stable hash, you will still be able to see if the same string
appears multiple times in the logs.
