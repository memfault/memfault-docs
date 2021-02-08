---
id: uploading-android-bugreports
title: Uploading Android Bug Reports & Symbols
sidebar_label: Uploading Android Bug Reports & Symbols
---

## Using the Memfault UI to Upload

You may upload individual bug reports via the Memfault UI by navigating to the
**Issues** page and selecting **Manual Upload**.

![/binary-assets/manual-bug-report-upload.gif](/binary-assets/manual-bug-report-upload.gif)

## Using the Memfault CLI tool to upload

The easiest way to upload Android Bug Report and/or symbol files is using the
Memfault CLI tool.

The rest of this guide assumes you have the Memfault CLI tool installed. If you
have not installed it yet, please
[follow the installation instructions](/docs/ci/install-memfault-cli).

### Uploading Android OS symbol files

While processing traces from a bugreport.zip, Memfault will attempt to provide
source file and line numbers for stackframes from native binaries. In order to
do this, the symbol files for these native binaries need to be uploaded to
Memfault.

When building the Android OS, the final image will contain executables from
which the symbols (debug info) has been stripped. Usually, "unstripped" versions
of the executables are also kept in the build output. For example, in builds of
recent versions of AOSP, they are output in
`out/target/product/generic/symbols/**`. The exact location may be a bit
different for your project. To test
[whether a file contains symbols, check out this article](/troubleshooting/uploading-symbol-file-is-invalid.md).

To upload all symbol files, run this command:

```bash
$ memfault --email <EMAIL> --password <PASSWORD> --org <ORG_SLUG> \
    --project <PROJ_SLUG> upload-symbols out/target/product/generic/symbols
```

It's best to hook this into Continuous Integration when a build is released for
internal consumption so that Memfault will immediately have the ability to
symbolicate crashes.

The command will run through all files in the given directory. For each file, it
will check whether it's a symbol file that has not yet been uploaded and upload
it if necessary. The output of the command looks like this:

```text
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/init: ELF file with .debug_info and GNU Build ID: 706b026c8cc3e970b409d79c11c182a5
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/init: uploaded!
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/bin/adbd: ELF file with .debug_info and GNU Build ID: 37398ca3d0492ba8b1e708a13ab2f9e0
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/bin/adbd: uploaded!
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/lib/libcrypto.so: ELF file with .debug_info and GNU Build ID: a2a7ab7cea9d8c482f31b3ee3a71c5ee
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/lib/libcrypto.so: skipping, already uploaded.
... etc ...
```

### Uploading Android App symbol & mapping files

For traces in a bugreport.zip that originate from an Android app, Memfault will
also attempt to provide source file and line numbers for stackframes from both
native/C/C++ (NDK) code as well as Java code.

For Android apps that use the [Android NDK](https://developer.android.com/ndk/)
or JNI (Java Native Interface), binary symbol files will need to be uploaded for
each version of an app.

In case the app has been obfuscated or minimized by R8 (or Proguard), the
associated mapping file (`mapping.txt`) will need to be uploaded as well for
each version of an app.

#### Using the `upload-android-app-symbols` command

The easiest way to upload all required files in one go, is using the
`upload-android-app-symbols` command, passing the build variant and path to the
Android app build output directory:

```bash
$ memfault --email <EMAIL> --password <PASSWORD> --org <ORG_SLUG> \
    --project <PROJ_SLUG> upload-android-app-symbols \
    --build-variant release <APP_SOURCE_ROOT>/build
```

The command will use the .apk in the build tree to automatically infer the
package identifier, the version code and version name. It will then upload the
binary symbol files (only applicable if the app uses the NDK) and upload the
mapping file (only applicable if the app has R8 or Proguard enabled).

If this automatic behavior does not work in your use case, consider using option
flags (i.e. `--version-code`, `--version-name`, `--package`, etc.) to specify
the required information directly. You can run
`memfault upload-android-app-symbols --help` to get more information on the all
the options.

#### Proguard / R8 configuration

If you are using Proguard / R8 minification/obfuscation, it is recommended to
enable the `-keepattributes LineNumberTable` configuration option in your app's
`proguard-rules.pro` file:

```
# Uncomment this to preserve the line number information for
# debugging stack traces:
-keepattributes LineNumberTable
```

Without this option, the generated `mapping.txt` file will _not_ contain enough
information for Memfault to be able to fully deobfuscate stack traces from the
app.

### Uploading an Android bugreport.zip

There are two ways to upload Android bugreports. One uses a user's email and
password, and one uses the Memfault-Project-Key. Please refer to the
[Authentication - HTTP API documentation](https://api-docs.memfault.com/?version=latest#authentication)
section for more information about the different forms of authentication.

To upload a bugreport.zip file that is located at, for example
`/path/to/bugreport.zip`, run the appropriate command:

#### Using an Email and Password / API Key

```bash
$ memfault --email <EMAIL> --password <PASSWORD or User-API-Key> --org <ORG_SLUG> \
    --project <PROJ_SLUG> upload-bugreport /path/to/bugreport.zip
```

#### Using a Memfault-Project-Key

```bash
$ memfault --project-key <Memfault-Project-Key> upload-bugreport /path/to/bugreport.zip
```

## Uploading without the Memfault CLI tool

Uploading is a 3 step process:

1. "Prepare" the file upload by making a `POST` request to `/api/v0/upload` to
   obtain a `upload_url` and `token`.
2. Make a `PUT` request to the `upload_url` to upload the file.
3. Finally, make a `POST` request with the `token` to the appropriate upload
   processing API. For example, after uploading an Android Bug Report file,
   `POST` the `token` to `/api/v0/upload/bugreport`.

Please consult the [HTTP API documentation](https://api-docs.memfault.com) for
details on each of the requests.
