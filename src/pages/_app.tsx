import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import DashboardLayout from "../components/Layout/DashboardLayout";

// import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import Head from "next/head";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
// import chakraTheme from "@chakra-ui/theme";

// const { Button } = chakraTheme.components;

// const theme = extendBaseTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Seetar Invoice</title>
      </Head>
      <ChakraProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ChakraProvider>
    </>
  );
}
