import Timer from "components/timer";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
      :root {
        touch-action: pan-x pan-y;
        height: 100%;
      }
      `,
          }}
        />
      </Head>
      <Timer />
    </>
  );
};

export default Home;
