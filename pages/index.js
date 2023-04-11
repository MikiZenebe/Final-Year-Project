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

      <div>
        <div className="mx-auto max-w-md text-center mb-8">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Our Products
          </h2>
          <p className="mt-4 text-base text-gray-700">
            Choose and add to it cart of your favorite
          </p>
        </div>
        <div className="grid flex-col  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <Products product={product} key={product.slug} />
          ))}
        </div>
      </div>
    </>
  );
}
