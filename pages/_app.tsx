import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import useLoadingPage from "../logic/hooks/loading";
import React from "react";
import useTheme from "../logic/hooks/themeCreator";
import useChangeLang from "../logic/hooks/changeLang";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  useLoadingPage();
  const { font, cacheLtr, cacheRtl, dir } = useChangeLang();
  const theme= useTheme(mode, dir, font)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CacheProvider
                value={router.locale === "en" ? cacheLtr : cacheRtl}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CacheProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
