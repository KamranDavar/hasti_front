import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { yellow } from "@mui/material/colors";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const font =
    router.locale === "fa"
      ? "Byekan"
      : "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serifrtl";
  const theme = createTheme({
     palette: {
    primary: {
      main: yellow[800]
    }
  },
    typography: {
      fontFamily: font,
    },
    direction: router.locale === "en" ? "ltr" : "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const cacheLtr = createCache({
    key: "muiltr",
    stylisPlugins: [prefixer],
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CacheProvider value={router.locale === "en" ? cacheLtr : cacheRtl}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CacheProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
