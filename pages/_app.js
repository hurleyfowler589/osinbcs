import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";
import "antd/dist/reset.css";
import "../styles/vars.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Credit App</title>
        <link href="/dist/output.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
