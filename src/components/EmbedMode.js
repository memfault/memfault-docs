import React, { useMemo } from "react";
import { useLocation } from "react-router";

const EmbedModeContext = React.createContext({ enabled: false, settings: {} });

/** Support for embedding the docs in an iframe from our application */
export function EmbedModeProvider({ children }) {
    const { search } = useLocation();
    const value = useMemo(() => {
        // Searching the string instead of parsing params to avoid having to
        // import URLSearchParams for Node in the browser unnecessarily.
        return { enabled: search.includes("embed"), settings: {} };
    }, [search]);
    return (
        <EmbedModeContext.Provider value={value}>
            {value.enabled ? (
                <div className="embed-mode">{children}</div>
            ) : (
                children
            )}
        </EmbedModeContext.Provider>
    );
}
