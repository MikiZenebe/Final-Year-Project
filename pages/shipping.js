import CheckoutWizard from "@/components/CheckoutWizard";
import Head from "next/head";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "@/utils/Context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function shipping() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
    setValue("email", shippingAddress.email);
  }, [
    shippingAddress.fullName,
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.postalCode,
    shippingAddress.country,
    shippingAddress.email,
  ]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
    email,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        email,
      },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
          email,
        },
      })
    );

    router.push("payment");
  };

  return (
    <div>
      <Head>
        <title>Shipping</title>
      </Head>

      <div>
        <CheckoutWizard activeStep={1} />

        <div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full bg-white  flex flex-col justify-center items-center"
          >
            <h2 className="text-xl font-semibold leading-7 text-gray-800 mt-10">
              Shipping Address
            </h2>

            <div className="mt-8 md:flex items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  autoFocus
                  {...register("fullName")}
                  required
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                />
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label
                  htmlFor="address"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  {...register("address", {
                    minLength: {
                      value: 3,
                      message: "Address is more than 2 chars",
                    },
                  })}
                  required
                />
              </div>
            </div>
            <div className="mt-12 md:flex items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  {...register("city")}
                  required
                />
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label
                  htmlFor="postalCode"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="number"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  {...register("postalCode")}
                  required
                />
              </div>
            </div>
            <div className="mt-12 md:flex items-center">
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  {...register("country")}
                  required
                />
              </div>
              <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                <label
                  htmlFor="email"
                  className="mb-3 text-sm leading-none text-gray-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                  {...register("email")}
                  required
                />
              </div>
            </div>

            <button className="flex bg-base-200  items-center justify-center py-4 px-7 focus:outline-none border rounded  mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:text-base-200">
              <span className="text-sm font-medium text-center hover:text-base-200 capitalize text-white">
                Next Step
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
