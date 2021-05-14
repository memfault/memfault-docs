import Tabs from "@theme/Tabs";
import React, { useContext } from "react";

import ProjectSetupDetailsContext from "./ProjectSetupDetailsContext";

export default function ProjectAwareTabs({ defaultValueFn, ...props }) {
    const [details] = useContext(ProjectSetupDetailsContext);
    const defaultValue = defaultValueFn
        ? defaultValueFn(details)
        : props.defaultValue;
    return <Tabs {...props} defaultValue={defaultValue} />;
}
