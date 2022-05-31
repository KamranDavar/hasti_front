import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Container from "@mui/material/Container";
import { appWithTranslation } from "next-i18next";


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Container maxWidth="md">
            <Component {...pageProps} />
          </Container>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
