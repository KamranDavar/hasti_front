import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Container from "@mui/material/Container";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/layout";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  const font =
    router.locale === "fa"
      ? "Byekan"
      : "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serifrtl";
  const theme = createTheme({
    typography: {
      fontFamily: font,
    },
    direction: router.locale === "en" ? "ltr" : "rtl",
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Container maxWidth="md">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Container>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
