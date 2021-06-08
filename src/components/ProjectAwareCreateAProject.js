import React, { useContext } from "react";
import { useLocation } from "react-router";

import ProjectSetupDetailsContext from "./ProjectSetupDetailsContext";

export default function ProjectAwareCreateAProject() {
    const [{ projectKey }] = useContext(ProjectSetupDetailsContext);
    const { pathname } = useLocation();

    if (pathname?.startsWith("/embed")) {
        // We're already in a project. The user doesn't need to create one.
        return null;
    }

    if (projectKey)
        return (
            <>
                <h3>Copy your Project Key</h3>
                <p>
                    You already have a project, and your project key is{" "}
                    <code>{projectKey}</code>.
                </p>
            </>
        );

    return (
        <>
            <h3>Create a Project and get a Project Key</h3>
            <p>
                Go to{" "}
                <a
                    href="https://app.memfault.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    app.memfault.com
                </a>{" "}
                and from the "Select A Project" dropdown, click on "Create
                Project" to setup your first project such as "smart-sink-dev".
            </p>
            <p>
                Once you've created your project, you'll be automatically taken
                to an integration guide which includes your project key. Copy it
                to follow the rest of the guide.
            </p>
        </>
    );
}
