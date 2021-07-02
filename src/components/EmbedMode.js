import Head from "@docusaurus/Head";
import React, { useMemo, useEffect } from "react";
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
                    <ForceColorMode mode="light" />
                </>
            ) : (
                children
            )}
        </EmbedModeContext.Provider>
    );
}

function setColorMode(mode) {
    const html = document.querySelector("html");
    if (html.dataset.theme !== mode) {
        html.dataset.theme = mode;
    }
}

function ForceColorMode({ mode }) {
    // It's possible to also use useThemeContext from Docusaurus, but I haven't
    // managed to set it up without it causing infinite loops, for some reason.
    useEffect(() => {
        if (
            typeof window === "undefined" ||
            typeof MutationObserver === "undefined"
        )
            return () => undefined;

        setColorMode(mode); // Avoids or shortens flicker

        const observer = new MutationObserver(() => {
            setColorMode(mode);
        });

        observer.observe(document.querySelector("html"), {
            childList: false,
            attributes: "true",
            attributeFilter: ["data-theme"],
        });

        return observer.disconnect;
    }, []);

    return null;
}
