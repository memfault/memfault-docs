/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    title: "Memfault Docs",
    tagline: "Learn how to say goodbye to firmware bugs",
    url: "https://docs.memfault.com",
    baseUrl: "/",
    favicon: "img/memfault-favicon.png",
    organizationName: "memfault",
    onBrokenMarkdownLinks: "throw",
    projectName: "memfault-firmware-sdk", // Usually your repo name.
    themeConfig: {
        gtag: {
            trackingID: "G-R5JYJ06TDJ",
            anonymizeIP: true,
        },
        navbar: {
            title: "Memfault Docs",
            logo: {
                alt: "Memfault Logo",
                src: "img/memfault-logo.svg",
            },
            items: [
                {
                    to: "docs/platform/memfault-terminology",
                    label: "Platform",
                    position: "left",
                },
                {
                    to: "docs/embedded/introduction",
                    label: "Embedded",
                    position: "left",
                },
                {
                    to: "docs/android/introduction",
                    label: "Android",
                    position: "left",
                },
                /* Uncomment for built-in API docs
                 * { to: "api", label: "Cloud API", position: "left" },
                 */
                {
                    to: "https://api-docs.memfault.com",
                    label: "API",
                    position: "left",
                    target: "_blank",
                    rel: "noopener",
                },
                { to: "blog", label: "Changelog", position: "right" },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Memfault",
                    items: [
                        {
                            label: "Embedded SDK on GitHub",
                            href:
                                "https://github.com/memfault/memfault-firmware-sdk",
                        },
                        {
                            label: "Try Memfault",
                            href: "https://try.memfault.com/",
                        },
                        {
                            label: "Memfault Home",
                            href: "https://memfault.com/",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Interrupt Blog",
                            href: "https://interrupt.memfault.com/blog",
                        },
                    ],
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "Twitter",
                            href: "https://twitter.com/memfaulthq",
                        },
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/company/memfault/",
                        },
                        {
                            label: "Contact Us",
                            href: "mailto:hello@memfault.com",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Memfault, Inc. Docs built with Docusaurus.`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/memfault/memfault-docs/edit/master/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            },
        ],
    ],
    scripts: [
        {
            src: "https://js.hs-scripts.com/8551838.js",
            async: true,
        },
    ],
    plugins: [
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "embed",
                routeBasePath: "embed",
                path: "./embed",
            },
        ],
    ],
};
