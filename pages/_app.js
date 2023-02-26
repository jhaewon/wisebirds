import Head from "next/head";
import ErrorBoundary from "../components/layout/errorBoundary";
import Layout from "../components/layout/layout";
import { AuthContextProvider } from "../store/auto-context";
import { ModalContextProvider } from "../store/modal-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps, props }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <ErrorBoundary>
          <Layout {...props}>
            <Head>
              <title>Wisebirds</title>
              <meta name="description" content="NextJS Events" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
          </Layout>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
