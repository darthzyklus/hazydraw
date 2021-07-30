import Head from "next/head";
import Auth from "../components/Auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HAZY DRAW</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth />
    </div>
  );
}
