import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ContextProvider } from "@/utils/Context";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
