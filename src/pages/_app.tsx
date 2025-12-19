import React from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { AuthConsumer, ProvideAuth } from "~/contexts/AuthContext";
import NextNProgress from "nextjs-progressbar";

import theme from "~/theme/theme";

import "~/styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);
  return (
    <ProvideAuth>
      <ChakraProvider resetCSS theme={theme}>
        <NextNProgress
          color="#2176f7d8"
          height={6}
          options={{ easing: "ease", speed: 500 }}
        />
        <AuthConsumer>
          {({ loaded }) =>
            loaded ? (
              getLayout(<Component {...pageProps} />)
            ) : (
              <Box
                h="100vh"
                d="flex"
                justifyContent="center"
                alignItems="center"
                bg="primary"
              >
                <Spinner color="#fff" size="lg" thickness="5px" speed=".7s" />
              </Box>
            )
          }
        </AuthConsumer>
      </ChakraProvider>
    </ProvideAuth>
  );
}

export default MyApp;
