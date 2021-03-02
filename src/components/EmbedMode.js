import Head from "@docusaurus/Head";
import React, { useMemo } from "react";
import { useLocation } from "react-router";

const EmbedModeContext = React.createContext({ enabled: false, settings: {} });

/** Support for embedding the docs in an iframe from our application */
export function EmbedModeProvider({ children }) {
    const { pathname } = useLocation();
    const value = useMemo(() => {
        return { enabled: pathname.startsWith("/embed"), settings: {} };
    }, [pathname]);
    return (
        <EmbedModeContext.Provider value={value}>
            {value.enabled ? (
                <>
                    <Head>
                        <meta name="robots" content="noindex" />
                    </Head>
                    <div className="embed-mode">{children}</div>
                </>
            ) : (
                children
            )}
        </EmbedModeContext.Provider>
    );
}
