import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../resources/theme";

import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
