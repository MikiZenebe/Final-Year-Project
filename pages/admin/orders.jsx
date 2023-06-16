import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrders() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Admin Orders</title>
      </Head>

      <div className="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
        <div className="my-4">
          <div className="alert shadow-lg bg-[#313641]">
            <p className="text-white text-2xl">
              {" "}
              <div className="my-4">
                <div className="alert shadow-lg bg-[#313641]">
                  <p className="text-white text-4xl">Setting</p>
                </div>
              </div>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
            <label
              htmlFor="select-1"
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-[#313641] peer-checked:ring"
            >
              <Link href="/admin/orders">Orders</Link>
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#313641] hover:text-white">
                {" "}
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#313641] hover:text-white">
                <Link href="/admin/products">Products</Link>
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#313641] hover:text-white">
                <Link href="/admin/users">Users</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 hidden sm:block">
            <ul className="flex flex-col">
              <li className="mt-5 cursor-pointer  border-transparent px-2 py-2  transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-l-[#313641] font-bold border-transparent px-2 py-2 transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/products">Products</Link>
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/users">Users</Link>
              </li>
            </ul>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-error w-[500px] h-[50px] items-center font-bold">
              {error}
            </div>
          ) : (
            <div className="col-span-8  rounded-xl sm:bg-gray-50 sm:px-8 sm:w-[520px] md:w-[630px] lg:w-[800px] h-auto md:h-auto sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Admin Orders</h1>
              </div>
              <hr className="mt-4 mb-8" />

              <div className="overflow-x-auto pb-16">
                <table className="table table-compact w-full text-[#313641]">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.substring(20, 24)}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {" "}
                          {order.isPaid ? (
                            <span className="bg-green-300 px-1 text-[#313641] rounded-sm">
                              ${order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="text-red-600">not paid</span>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <span className="bg-green-300 px-1 text-[#313641] rounded-sm">
                              ${order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="text-red-600">not delivered</span>
                          )}
                        </td>
                        <td>
                          <Link href={`/order/${order._id}`} passHref>
                            <button className="btn btn-sm text-[#313641] bg-green-400">
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdminOrders.auth = { adminOnly: true };
