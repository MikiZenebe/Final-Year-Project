import CheckoutWizard from "@/components/CheckoutWizard";
import { Context } from "@/utils/Context";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function placeorder() {
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  return (
    <div>
      <Head>
        <title>Placeorder</title>
      </Head>

      <CheckoutWizard activeStep={3} />

      <div>
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
            <div className="overflow-x-auto md:col-span-3 flex flex-col gap-3">
              <div class="px-4 py-4 sm:px-6 bg-base-200 rounded-md">
                <div class="flex items-center justify-between">
                  <p class="text-white text-md  md:truncate">
                    Shipping Address
                  </p>
                  <div class="flex flex-shrink-0 ml-2">
                    <p class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg">
                      <button>
                        <Link href="/shipping">Edit</Link>
                      </button>
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center font-light text-gray-500 text-md dark:text-gray-300">
                      <div>
                        {shippingAddress.fullName}, {shippingAddress.address},{" "}
                        {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                        {shippingAddress.country}
                      </div>
                    </p>
                  </div>
                </div>
              </div>

              <div class="px-4 py-4 sm:px-6 bg-base-200 rounded-md">
                <div class="flex items-center justify-between">
                  <p class="text-white text-md  md:truncate">Payment Method</p>
                  <div class="flex flex-shrink-0 ml-2">
                    <p class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg">
                      <button>
                        <Link href="/payment">Edit</Link>
                      </button>
                    </p>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center font-light text-gray-500 text-md dark:text-gray-300">
                      <div>{paymentMethod}</div>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card overflow-x-auto p-5 bg-base-200 text-white">
                <h2 className="mb-2 text-lg">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-center ">Item</th>
                      <th className="    p-5 text-center">Quantity</th>
                      <th className="  p-5 text-center">Price</th>
                      <th className="p-5 text-center">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b text-center">
                        <td className="flex gap-3">
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <img
                              className="ml-2"
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                              }}
                            />
                            <span className="ml-3"> {item.name}</span>
                          </Link>
                        </td>
                        <td className=" p-5  text-center ">{item.quantity}</td>
                        <td className="p-5 text-center">${item.price}</td>
                        <td className="p-5 text-center">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <p class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg mt-2">
                    <button>
                      <Link href="/cart">Edit</Link>
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="card  p-5">
                <h2 className="mb-2 text-lg">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div>${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="primary-button w-full"
                    >
                      {loading ? "Loading..." : "Place Order"}
                    </button>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
