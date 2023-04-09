import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Jibruk E-Commerce</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>Header</header>

        <main>{children}</main>

        <footer>Footer</footer>
      </div>
    </>
  );
}
