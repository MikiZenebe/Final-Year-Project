import Products from "@/components/Products";
import Head from "next/head";
import data from "@/utils/sample";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Jibruk</title>
      </Head>

      <Banner />

      <div className="grid flex-col gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <Products product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}
