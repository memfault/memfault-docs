import React from "react";

import { EmbedModeProvider } from "../components/EmbedMode";
import { ProjectSetupDetailsContextProvider } from "../components/ProjectSetupDetailsContext";

export default function Root({ children }) {
    return (
        <EmbedModeProvider>
            <ProjectSetupDetailsContextProvider>
                {children}
            </ProjectSetupDetailsContextProvider>
        </EmbedModeProvider>
    );
}
