import React, { useState } from "react";
import { useLocation } from "react-router";

import qs from "query-string";

const ProjectSetupDetailsContext = React.createContext([{}, () => undefined]);

export function ProjectSetupDetailsContextProvider({ children }) {
    const { search } = useLocation();
    const parsed = qs.parse(search);

    // See the original interface for this in `ProjecSetupDetails` in
    // packages/memfault-api-types/src/__generated__/schema.ts in the monorepo.
    const value = useState({
        additionalChips: parsed.additional_chips,
        buildToolchain: parsed.build_toolchain,
        buildToolchainOther: parsed.build_toolchain_other,
        compiler: parsed.compiler,
        compilerOther: parsed.compiler_other,
        connectivity: parsed.connectivity,
        connectivityOther: parsed.connectivity_other,
        debuggingToolchain: parsed.debugging_toolchain,
        debuggingToolchainOther: parsed.debugging_toolchain_other,
        gmsCertification: parsed.gms_certification,
        operatingSystem: parsed.operating_system,
        operatingSystemOther: parsed.operating_system_other,
        primaryChip: parsed.primary_chip,
        primaryChipOther: parsed.primary_chip_other,
    });

    return (
        <ProjectSetupDetailsContext.Provider value={value}>
            {children}
        </ProjectSetupDetailsContext.Provider>
    );
}

export default ProjectSetupDetailsContext;
