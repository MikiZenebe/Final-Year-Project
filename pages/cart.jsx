import { Context } from "./../utils/Context";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { HiOutlineShoppingCart, HiXCircle } from "react-icons/hi";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import axios from "axios";

function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is out of stock 🗑️", {
        position: "top-center",
        autoClose: 1000,
      });
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    toast.success(`${item.name} updated to your cart`, {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <>
      <Head>
        <title>Cart Page</title>{" "}
      </Head>

      <div className="my-4">
        <div className="alert shadow-lg bg-[#313641]">
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
                      className="px-5 py-3 text-sm  text-left text-[#313641] font-bold uppercase bg-white border-b border-gray-200 "
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-[#313641] font-bold uppercase bg-white border-b border-gray-200"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-[#313641] font-bold uppercase bg-white border-b border-gray-200"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm  text-center text-[#313641] font-bold uppercase bg-white border-b border-gray-200"
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
                          <div className="ml-3 font-semibold">{item.name}</div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 items-center text-center ">
                        <button className="btn btn-ghost">
                          <select
                            className="bg-white text-[#313641] select select-bordered select-sm items-center max-w-xs"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </button>
                      </td>

                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                        ${item.price}
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 text-center">
                        <button
                          onClick={() => {
                            removeItemHandler(item),
                              toast.error(
                                `${item.quantity} ${item.name} removed from cart`,
                                {
                                  position: "top-center",
                                  autoClose: 1000,
                                }
                              );
                          }}
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

            <div className="mt-7 sm:mt-4 md:mt-0 card card-compact dropdown-content w-52 bg-[#313641] shadow flex flex-col mx-auto sm:w-[220px] sm:mx-auto justify-center h-[150px]">
              <div className="card-body text-white">
                <div className="flex items-center gap-14 px-1 sm:px-0 justify-between">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}){""}
                  <p>
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </p>
                </div>

                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="my-auto btn bg-gray-200 text-[#313641] active:text-white hover:text-white"
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

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
