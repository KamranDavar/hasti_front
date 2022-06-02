import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { yellow } from "@mui/material/colors";
import useLoadingPage from "./logic/hooks/loading";
import useChangeLang from "./logic/hooks/changeLang";
import React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  useLoadingPage();
  const { font, cacheLtr, cacheRtl, dir } = useChangeLang();
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          background:{
            default:"red",
          },
          primary: {
            main: yellow[800],
          },
        },
        typography: {
          fontFamily: font,
        },
        direction: dir,
      }),
    [mode, font, dir]
  );

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
