import Head from "next/head";

import Layout from "../components/layout/layout";
import { AuthContextProvider } from "../store/auto-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps, props }) {
  return (
    <AuthContextProvider>
      <Layout {...props}>
        <Head>
          <title>Wisebirds</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
