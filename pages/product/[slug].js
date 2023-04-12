import { Context } from "@/utils/Context";
import data from "@/utils/sample";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
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

  const addToCart = () => {
    const existItem = state.cart.cartItems.find((c) => c.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Sorry, Product is out of stock 🗑️", {
        position: "top-center",
        autoClose: 1000,
      });

      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    toast.success(`${product.name} added to your cart`, {
      position: "top-center",
      autoClose: 1000,
    });
    router.push("/cart");
  };

  return (
    <div>
      <Head>
        <title>Product Detail</title>
      </Head>

      <div className="font-semibold flex items-center gap-1 my-4">
        <button className="btn btn-ghost">
          <Link href={`/`}>
            <HiChevronLeft size={30} />
          </Link>
        </button>
        <h3>Back to products</h3>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div>
                <div className="h-80 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <div className="h-[320px] md:h-[320px] lg:h-[320px] rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img
                      className="w-[280px] rounded-lg cards"
                      src={product.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl text-base-100">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Brand: {""}
                <span className="font-medium">{product.brand}</span>
              </p>

              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3 ">
                    <span className=" mr-1 mt-1">$</span>
                    <span className="font-bold text-base-200 text-3xl">
                      {product.price}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-green-500 text-xl font-semibold">
                    Save 12%
                  </p>
                  <p className="text-gray-400 text-sm">
                    Inclusive of all Taxes.
                  </p>
                </div>
              </div>

              <p className="text-gray-500">{product.desc}</p>

              <div className="border-2 w-auto my-4"></div>

              <div className="flex flex-col justify-center items-center bg-base-200 max-w-[200px] mx-auto rounded-md">
                <div className="flex flex-col gap-1 mt-2 justify-between ">
                  <div className="flex gap-12  justify-between text-gray-300">
                    <p>Price</p>
                    <p>${product.price}</p>
                  </div>

                  <div className="flex gap-14  text-gray-300">
                    <p>Status</p>
                    <p>
                      {product.countInStock > 0 ? "In Stock" : "Unavaliable"}
                    </p>
                  </div>
                </div>

                <div className="my-4">
                  <button className="bg-white btn btn-sm text-base-200 font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {
//   /* <div className="mt-6 card card-compact dropdown-content w-52 bg-base-100 shadow flex flex-col mx-auto sm:w-[200px] sm:mx-20 h-[180px]">
//     <div className="card-body text-white">
//       <div className="flex items-center gap-24 px-1 sm:px-0 justify-between">
//         <h3>Price</h3>
//         <p>${product.price}</p>
//       </div>

//       <div className="flex items-center gap-20 px-1 justify-between sm:px-0">
//         <h3>Status</h3>
//         <p>{product.countInStock > 0 ? "In Stock" : "Unavaliable"}</p>
//       </div>

//       <button
//         onClick={addToCart}
//         className="my-auto btn  bg-gray-200 text-base-100 active:text-white hover:text-white"
//       >
//         Add to Cart
//       </button>
//     </div>
//   </div>; */
// }
