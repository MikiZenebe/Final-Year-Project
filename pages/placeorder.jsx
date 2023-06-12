import CheckoutWizard from "../components/CheckoutWizard";
import { Context } from "../utils/Context";
import { getError } from "../utils/error";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { toast } from "react-toastify";

export default function PlaceOrder() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEM" });
      Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));

      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);

      toast.error(getError(error), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

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
              <div className="px-4 py-4 sm:px-6 bg-gray-700 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-white text-md  md:truncate">
                    Shipping Address
                  </p>
                  <div className="flex flex-shrink-0 ml-2">
                    <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg">
                      <button>
                        <Link href="/shipping">Edit</Link>
                      </button>
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center font-light text-gray-400 text-md dark:text-gray-400">
                      <div>
                        {shippingAddress.FirstName}, {shippingAddress.LastName},
                        {shippingAddress.address}, {shippingAddress.city},{" "}
                        {shippingAddress.country}, {shippingAddress.email}
                      </div>
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6 bg-gray-700 rounded-md">
                <div className="flex items-center justify-between">
                  <p className="text-white text-md  md:truncate">
                    Payment Method
                  </p>
                  <div className="flex flex-shrink-0 ml-2">
                    <p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-lg ">
                      <button>
                        <Link href="/payment">Edit</Link>
                      </button>
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center font-light text-gray-400 text-md dark:text-gray-300">
                      <div>{paymentMethod}</div>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card overflow-x-auto p-5 bg-gray-700 text-white">
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
              <div className="card mt-2 p-5 bg-[#313641] text-white">
                <h2 className="mb-2 text-lg font-semibold">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div className="text-gray-300">{itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div className="text-gray-300">${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div className="text-gray-300">${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Total</div>
                      <div className="text-gray-300">${totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="btn bg-white w-full rounded-lg py-1 my-2 text-[#313641] hover:text-[#313641] font-semibold hover:bg-gray-300 "
                    >
                      {loading ? "Loading..." : "Place Order"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

PlaceOrder.auth = true;
