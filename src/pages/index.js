/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
    {
        title: <>Memfault Platform</>,
        // TODO replace with Memfault artwork
        // imageUrl: "img/undraw_docusaurus_react.svg",
        description: (
            <>
                <a href="/docs/platform/memfault-terminology">Memfault</a> can
                catch, triage, and fix issues on any hardware platform. Catch
                issues automatically, fix them in hours, and deploy updates
                surgically.
            </>
        ),
    },
    {
        title: <>Embedded SDK</>,
        // TODO replace with Memfault artwork
        // imageUrl: "img/undraw_docusaurus_mountain.svg",
        description: (
            <>
                Memfault's <a href="docs/embedded/introduction">Embedded SDK</a>{" "}
                packages send data and events from embedded hardware devices.
                Example code is available for several platforms.
            </>
        ),
    },
    {
        title: <>Cloud API</>,
        // TODO replace with Memfault artwork
        // imageUrl: "img/undraw_docusaurus_tree.svg",
        description: (
            <>
                Memfault's open{" "}
                <a
                    href="https://api-docs.memfault.com"
                    target="_blank"
                    rel="noopener"
                >
                    Cloud API
                </a>{" "}
                can be used from embedded devices, continuous integration
                systems (CI/CD), or cloud applications.
            </>
        ),
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={classnames("col col--4", styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img
                        className={styles.featureImage}
                        src={imgUrl}
                        alt={title}
                    />
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <header
                className={classnames("hero hero--primary", styles.heroBanner)}
            >
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames(
                                "button button--outline button--secondary button--lg",
                                styles.getStarted
                            )}
                            to={useBaseUrl("docs/embedded/introduction")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default Home;
