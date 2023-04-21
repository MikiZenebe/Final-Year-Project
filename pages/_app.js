import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ContextProvider } from "@/utils/Context";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ContextProvider>
        <Layout>
          <ToastContainer position="top-center" limit={1} />
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  );
}
