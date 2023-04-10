import { Context } from "@/utils/Context";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { HiOutlineShoppingCart, HiXCircle } from "react-icons/hi";

export default function CartPage() {
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
          </div>
        )}

        {/* <div className="container max-w-3xl px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                              <img
                                alt="profil"
                                src="/images/person/6.jpg"
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Julien Huger
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">User</p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          23/09/2010
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
