/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    docs: {
        Platform: [
            "platform/memfault-terminology",
            "platform/create-new-project",
            "platform/software-version-hardware-version",
            "platform/alerts",
            "embedded/uploading-software-versions",
            "platform/jira-integration",
            "platform/fleet-wide-metrics",
            "platform/user-management",
            "platform/organization-auth-tokens",
            /* "platform/bulk-device-upload", */
            /* Mentions features to be released: "platform/sso", */
            /* Draft: "platform/releasing-firmware", */
            /* Note: releasing-firmware is linked from centegix impl readme */
        ],
        "Bare Metal & RTOS": [
            "embedded/introduction",
            {
                type: "category",
                label: "Getting Started Guides",
                items: [
                    "embedded/arm-cortex-m-guide",
                    "embedded/nrf-connect-sdk-guide",
                    "embedded/esp32-guide",
                    "embedded/esp8266-rtos-sdk-guide",
                ],
            },
            {
                type: "category",
                label: "Subsystem Guides",
                items: [
                    /* Order in which subsystems ideally get integrated */
                    "embedded/coredumps",
                    "embedded/reboot-reason-tracking",
                    "embedded/metrics-api",
                    "embedded/trace-events",
                    "embedded/logging",
                    "embedded/releases-integration-guide",
                ],
            },
            {
                type: "category",
                label: "User Guides",
                items: ["embedded/coredump-elf-with-gdb"],
            },
            {
                type: "category",
                label: "Design Docs",
                items: [
                    "embedded/data-from-firmware-to-the-cloud",
                    "embedded/event-serialization-overview",
                ],
            },
            {
                type: "category",
                label: "Test Utilities",
                items: [
                    "embedded/test-patterns-for-chunks-endpoint",
                    "embedded/test-data-collection-with-gdb",
                    "embedded/export-chunks-over-console",
                    "embedded/demo-cli",
                ],
            },
        ],
        Android: [
            "android/introduction",
            "android/android-getting-started-guide",
            "android/android-bort",
            "android/uploading-android-bugreports",
            "android/android-reboot-events",
            "android/android-eventlog-metrics",
            "android/android-releases-integration-guide",
            "android/android-data-scrubbing",
        ],
        "Automation, CI & CD": [
            "ci/authentication",
            "ci/install-memfault-cli",
            "ci/add-device-to-cohort-api",
            /* Note: Out of date so hiding for the moment */
            /* "ci/uploading-artifacts-api", */
        ],
        Troubleshooting: ["troubleshooting/uploading-symbol-file-is-invalid"],
    },
};
