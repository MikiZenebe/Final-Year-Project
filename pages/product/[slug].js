import data from "@/utils/sample";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiChevronLeft } from "react-icons/hi";

export default function ProductDetail() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div>
        <h1>Product Not Found </h1>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Product Detail</title>
      </Head>

      <div className="max-w-[500px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-[900px] ">
        <div className="font-semibold flex items-center gap-1 my-4">
          <Link href={`/`}>
            <HiChevronLeft size={30} />
          </Link>
          <h3>Back to products</h3>
        </div>

        <div className="max-w-[400px] mt-12 sm:max-w-[900px] sm:grid sm:grid-cols-3 gap-20 sm:w-full sm:mx-auto md:mx-auto lg:mx-auto ">
          <div className="mx-auto flex justify-center items-center sm:w-[200px]">
            <img
              className="rounded-md sm:w-[300px]"
              src={product.image}
              alt=""
            />
          </div>

          <div className="flex flex-col mx-auto justify-center  gap-1 mt-4 sm:w-[230px] sm:mx-6 text-center sm:text-start">
            <h3 className="text-base-100 font-bold ">{product.name}</h3>
            <h3>
              <span className="text-base-100 font-bold ">Catagory:</span>{" "}
              {product.catagory}
            </h3>
            <h3>
              <span className="text-base-100 font-bold ">Brand: </span>{" "}
              {product.brand}
            </h3>
            <h3>
              {product.rating} of {product.numReviews} reviews
            </h3>
            <h3>
              <span className="text-base-100 font-bold ">Description: </span>{" "}
              {product.desc}
            </h3>
          </div>

          <div className="mt-6 card card-compact dropdown-content w-52 bg-base-100 shadow flex flex-col mx-auto sm:w-[200px] sm:mx-20">
            <div className="card-body text-white">
              <div className="flex items-center gap-24 px-1 sm:px-0 justify-between">
                <h3>Price</h3>
                <p>${product.price}</p>
              </div>

              <div className="flex items-center gap-20 px-1 justify-between sm:px-0">
                <h3>Status</h3>
                <p>{product.countInStock > 0 ? "In Stock" : "Unavaliable"}</p>
              </div>

              <button className="mt-2 btn bg-gray-200 text-base-100 active:text-white">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
