import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Head from "next/head";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/summary");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData?.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "#242933",
        data: summary.salesData?.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
        <div className="my-4">
          <div className="alert shadow-lg bg-[#313641]">
            <p className="text-white text-2xl">
              {" "}
              <div className="my-4 bg-[#313641]">
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
              <Link href="/admin/dashboard">Dashboard</Link>
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
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#313641] hover:text-white">
                <Link href="/admin/products">Products</Link>
              </li>
              <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-[#313641] hover:text-white">
                <Link href="/admin/users">Users</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 hidden sm:block ">
            <ul className="flex flex-col">
              <li className="mt-5 cursor-pointer border-l-2 border-l-[#313641] font-bold border-transparent px-2 py-2  transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-[#313641] hover:font-bold">
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
            <div className="alert-error">{error}</div>
          ) : (
            <div className="col-span-8  rounded-xl sm:bg-gray-50 sm:px-8 h-auto md:h-auto sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Admin Dashboard</h1>
              </div>
              <hr className="mt-4 mb-8" />

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4  md:w-[450px] md:mx-auto lg:grid-cols-4  lg:w-[700px] lg:mx-auto xl:w-[800px]">
                <div className="stats shadow bg-[#313641]">
                  <div className="stat">
                    <div className="stat-title text-white">Total Sales</div>
                    <div className="stat-value text-[30px] text-green-400">
                      ${summary.ordersPrice}
                    </div>
                    <div className="stat-desc text-white">View Sales</div>
                  </div>
                </div>
                <div className="stats shadow bg-[#313641]">
                  <div className="stat ">
                    <div className="stat-title text-white">Total Orders</div>
                    <div className="stat-value text-[30px] text-green-400">
                      {summary.ordersCount}
                    </div>
                    <div className="stat-desc text-white">View Orders</div>
                  </div>
                </div>
                <div className="stats shadow bg-[#313641]">
                  <div className="stat">
                    <div className="stat-title text-white">Total Products</div>
                    <div className="stat-value text-green-400">
                      {summary.productsCount}{" "}
                    </div>
                    <div className="stat-desc text-white">View Products</div>
                  </div>
                </div>
                <div className="stats shadow bg-[#313641]">
                  <div className="stat">
                    <div className="stat-title text-white">Total Users</div>
                    <div className="stat-value text-green-400">
                      {summary.usersCount}{" "}
                    </div>
                    <div className="stat-desc text-white">View Users</div>
                  </div>
                </div>
              </div>

              <div className="mt-20 pb-4">
                <h2 className="py-2 text-2xl font-semibold text-center">
                  Sales Report
                </h2>
                <Bar
                  options={{
                    legend: { display: true, position: "right" },
                  }}
                  data={data}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdminDashboard.auth = { adminOnly: true };
export default AdminDashboard;
