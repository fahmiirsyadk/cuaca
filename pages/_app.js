import Head from "next/head";
import "../styles/base.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WeatherAPP</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
