import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <header className="sticky top-0 ">
          <Nav />
        </header>

        <main className="h-[100vh]  container m-auto mt-4 px-4">
          {children}
        </main>

        <footer className="">
          <Footer />
        </footer>
      </div>
    </>
  );
}
