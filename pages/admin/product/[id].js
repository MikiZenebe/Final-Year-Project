import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

export default function AdminProductEdit() {
  const { query } = useRouter();
  const router = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });

        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("rating", data.rating);
        setValue("star", data.star);
        setValue("numReviews", data.numReviews);
        setValue("countInStock", data.countInStock);
        setValue("desc", data.desc);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);

      toast.success("Product image uploaded successfully ✅", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });

      toast.error(getError(err), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    rating,
    star,
    numReviews,
    countInStock,
    desc,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        rating,
        star,
        numReviews,
        countInStock,
        desc,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully ✅", {
        position: "top-center",
        autoClose: 1000,
      });
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <Head>
        <title>{`Edit Product ${productId}`}</title>
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
              <li className="mt-5 cursor-pointer  border-transparent px-2 py-2 transition hover:border-l-[#313641] hover:font-bold">
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li className="mt-5 cursor-pointer border-l-2 border-l-[#313641] font-bold border-transparent px-2 py-2  transition hover:border-l-[#313641] hover:font-bold">
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
              <div className="h-[100%] my-4 flex flex-col justify-center items-center">
                <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                  <div className="self-center mb-6 text-xl  text-gray-600 sm:text-2xl dark:text-white font-semibold">
                    {`Edit Product ${productId}`}
                  </div>
                  <div className="mt-8">
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="name"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Name"
                            {...register("name", {
                              required: "Please enter name",
                            })}
                          />
                        </div>

                        {errors.name && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.name.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="slug"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Slug"
                            {...register("slug", {
                              required: "Please enter slug",
                            })}
                          />
                        </div>

                        {errors.slug && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.slug.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="price"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Price"
                            {...register("price", {
                              required: "Please enter price",
                            })}
                          />
                        </div>

                        {errors.price && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.price.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="image"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Image"
                            {...register("image", {
                              required: "Please choose image",
                            })}
                          />
                        </div>

                        {errors.image && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.image.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="file"
                            id="imageFile"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Upload Image"
                            onChange={uploadHandler}
                          />
                          {loadingUpload && <div>Uploading....</div>}
                        </div>
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="category"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Category"
                            {...register("category", {
                              required: "Please enter category",
                            })}
                          />
                        </div>

                        {errors.category && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.category.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="brand"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Brand"
                            {...register("brand", {
                              required: "Please enter brand",
                            })}
                          />
                        </div>

                        {errors.brand && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.brand.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="number"
                            id="countInStock"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Quantitiy"
                            {...register("countInStock", {
                              required: "Please enter countInStock",
                            })}
                          />
                        </div>

                        {errors.countInStock && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.countInStock.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="star"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Rating Icon"
                            {...register("star", {
                              required: "Please enter ratingIcon",
                            })}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="rating"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Rating "
                            {...register("rating", {
                              required: "Please enter rating",
                            })}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col mb-2">
                        <div className="flex relative ">
                          <input
                            type="text"
                            id="desc"
                            autoFocus
                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#313641] focus:border-transparent"
                            placeholder="Product Description"
                            {...register("desc", {
                              required: "Please enter description",
                            })}
                          />
                        </div>

                        {errors.desc && (
                          <div className="bg-red-400 my-2 rounded-md">
                            <div className="px-4 py-1 font-semibold text-white">
                              {errors.desc.message}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center mb-6 -mt-4"></div>
                      <div className="flex w-full">
                        <button
                          disabled={loadingUpdate}
                          type="submit"
                          className="py-2 px-4  bg-green-300 hover:bg-gray-500 hover:text-white focus:bg-base-100 focus:text-white text-[#313641] w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg "
                        >
                          {loadingUpdate ? "Loading" : "Update"}
                        </button>
                      </div>

                      <div className="flex w-full my-4">
                        <Link
                          className="py-2 px-4  bg-gray-500 text-white hover:bg-gray-400 hover:text-white focus:bg-base-100 focus:text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg "
                          href={`/admin/products`}
                        >
                          Back
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AdminProductEdit.auth = { adminOnly: true };
