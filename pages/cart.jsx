import { Context } from "@/utils/Context";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { HiOutlineShoppingCart, HiXCircle } from "react-icons/hi";

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <>
      <Head>
        <title>Cart Page</title>{" "}
      </Head>

      <div className="my-4">
        <div className="alert shadow-lg ">
          <p className="text-white text-2xl">Shopping Cart</p>
        </div>
      </div>

      <div className="mt-10">
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="text-5xl sm:text-7xl font-bold text-gray-400 flex flex-col justify-center items-center gap-5">
              <h1>Cart is Empty</h1>
              <p>
                <HiOutlineShoppingCart size={120} />
              </p>

              <button className="btn w-[200px] py-1 text-white text-[15px]">
                <Link href="/">Go Shopping</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full leading-normal border-[1px] border-gray-100">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-left text-base-100 font-bold uppercase bg-white border-b border-gray-200 "
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-base-100 font-bold uppercase bg-white border-b border-gray-200"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-base-100 font-bold uppercase bg-white border-b border-gray-200"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-base-100 font-bold uppercase bg-white border-b border-gray-200"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Link href={`/product/${item.slug}`}>
                              <img
                                alt="item"
                                src={item.image}
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </Link>
                          </div>
                          <div className="ml-3">{item.name}</div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 items-center text-center ">
                        {item.quantity}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                        ${item.price}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="btn btn-ghost focus:bg-red-100 active:bg-red-300 items-center text-center"
                        >
                          <HiXCircle
                            size={20}
                            className="text-red-500 text-center"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-7 sm:mt-4 md:mt-0 card card-compact dropdown-content w-52 bg-base-100 shadow flex flex-col mx-auto sm:w-[220px] sm:mx-auto justify-center">
              <div className="card-body text-white">
                <div className="flex items-center gap-16 px-1 sm:px-0 justify-between">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}){""}
                  <p>
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/shipping")}
                  className="my-auto btn bg-gray-200 text-base-100 active:text-white hover:text-white"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}