import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}

export default function AdminProducts() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <Head>
        <title>Admin Products</title>
      </Head>

      <div>
        <div className="mx-4  max-w-screen-xl sm:mx-8 xl:mx-auto">
          <div className="my-4">
            <div className="alert shadow-lg ">
              <p className="text-white text-2xl">
                {" "}
                <div className="my-4">
                  <div className="alert shadow-lg ">
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
                className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-base-200 peer-checked:ring"
              >
                <Link href="/admin/products">Products</Link>
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
                <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-base-200 hover:text-white">
                  {" "}
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-base-200 hover:text-white">
                  <Link href="/admin/products">Products</Link>
                </li>
                <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-base-200 hover:text-white">
                  <Link href="/admin/users">Users</Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul className="flex flex-col">
                <li className="mt-5 cursor-pointer  border-transparent px-2 py-2  transition hover:border-l-base-200 hover:font-bold">
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="mt-5 cursor-pointer  border-transparent px-2 py-2 transition hover:border-l-base-200 hover:font-bold">
                  <Link href="/admin/orders">Orders</Link>
                </li>
                <li className="mt-5 cursor-pointer border-l-2 border-l-base-200 font-bold border-transparent px-2 py-2  transition hover:border-l-base-200 hover:font-bold">
                  <Link href="/admin/products">Products</Link>
                </li>
                <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-base-200 hover:font-bold">
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
                  <table className="table table-compact w-full text-white">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATAGORY</th>
                        <th>COUNT</th>
                        <th>RATINGS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id.substring(20, 24)}</td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td className="text-center">{product.category}</td>
                          <td className="text-center">
                            {product.countInStock}
                          </td>
                          <td className="text-center">{product.rating}</td>

                          <td className="flex gap-2">
                            <Link
                              href={`/admin/product/${product._id}`}
                              passHref
                            >
                              <button className="btn btn-sm bg-green-300 hover:bg-green-800 hover:text-white text-base-200">
                                Edit
                              </button>
                            </Link>

                            <Link href={`/order/${product._id}`} passHref>
                              <button className="btn btn-sm bg-red-400 hover:bg-red-800  text-white">
                                Delete
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
    </div>
  );
}

AdminProducts.auth = { adminOnly: true };
