import ProjectSetupDetailsContext from "@site/src/components/ProjectSetupDetailsContext";
import DefaultCodeBlock from "@theme-original/CodeBlock";
import React, { useContext, useMemo } from "react";

function replaceSafe(
    source /** unknown */,
    replacements /** [search, target][] */
) {
    if (typeof source !== "string") return source;
    return replace(source, replacements);
}

function replace(source /** string */, replacements /** [search, target][] */) {
    let result = source;
    replacements.forEach(([search, target]) => {
        result = result.replaceAll(search, target);
    });
    return result;
}

/**
 * The default code block, but aware of our ProjectSetupDetailsContext in case
 * we have a project-specific strings that we can replace with actual values.
 */
export default function CodeBlock(props) {
    const [{ projectKey }] = useContext(ProjectSetupDetailsContext);

    const replacements = useMemo(() => {
        return [
            // Order matters: will be executed FIFO
            ["<YOUR_PROJECT_KEY>", projectKey],
            ["${YOUR_PROJECT_KEY}", projectKey],
            ["$YOUR_PROJECT_KEY", projectKey],
            ["YOUR_PROJECT_KEY", projectKey],
        ].filter(([, target]) => !!target);
    }, [projectKey]);

    const children = useMemo(() => {
        return Array.isArray(props.children)
            ? props.children.map((child) => replaceSafe(child, replacements))
            : replaceSafe(props.children, replacements);
    }, [replacements, props.children]);

    return <DefaultCodeBlock {...props}>{children}</DefaultCodeBlock>;
}
