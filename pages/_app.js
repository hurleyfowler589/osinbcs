import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Head from 'next/head';
import 'antd/dist/reset.css';
import '../styles/vars.css';
import '../styles/global.css';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/vi';
import locale from 'antd/locale/vi_VN';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider locale={locale}>
        <Head>
          <title>Credit App</title>
          <link href="/dist/output.css" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default MyApp;
