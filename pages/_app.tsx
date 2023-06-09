// import '@/styles/globals.css';
import type {AppContext, AppProps} from 'next/app';
import App from "next/app";
import {Layout, ILayoutProps} from "@/components/layout";
import "./global.scss";
import Head from "next/head";
import axios from "axios";
import {LOCALDOMAIN} from "@/utils";
import {ThemeContextProvider} from "@/stores/theme";

const MyApp = (data: AppProps & ILayoutProps) => {
  const {Component, pageProps, navbarData, footerData} = data;

  return (
    <div>
      <Head>
        <title>我的第一个Next网站</title>
        <meta
          name="description"
          content="我的第一个Next网站"
        />
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <ThemeContextProvider>
        <Layout navbarData={navbarData} footerData={footerData}>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </div>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const {data = {}} = await axios.get(`${LOCALDOMAIN}/api/layout`);

  return {
    ...pageProps,
    ...data,
  };
};

export default MyApp;
