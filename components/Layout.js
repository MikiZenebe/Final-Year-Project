import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <header className="sticky top-0 z-50">
          <Nav />
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center">
          <Footer />
        </footer>
      </div>
    </>
  );
}
