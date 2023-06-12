import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import axios from "axios";
import Head from "next/head";
import { HiLockOpen, HiMail } from "react-icons/hi";
import Link from "next/link";

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session?.user.name);
    setValue("email", session?.user.email);
  }, [session?.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully ✅", {
        position: "top-center",
        autoClose: 1000,
      });
      if (result.error) {
        toast.error(result.error),
          {
            position: "top-center",
            autoClose: 1000,
          };
      }
    } catch (err) {
      toast.error(getError(err), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>

      <div className="h-[100%] my-20 flex flex-col justify-center items-center">
        <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-[#313641] rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl   sm:text-2xl text-white font-semibold">
            Update Your Profile
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <input
                    type="name"
                    id="name"
                    autoFocus
                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your Name"
                    {...register("name", {
                      required: "Please enter your name",
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
                    type="email"
                    id="email"
                    autoFocus
                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Please enter your email",
                    })}
                  />
                </div>

                {errors.email && (
                  <div className="bg-red-400 my-2 rounded-md">
                    <div className="px-4 py-1 font-semibold text-white">
                      {errors.email.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <input
                    type="password"
                    id="password"
                    autoFocus
                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="New Password"
                    {...register("password", {
                      required: "Please enter new password",
                      minLength: {
                        value: 6,
                        message: "password is more than 5 chars",
                      },
                    })}
                  />
                </div>

                {errors.password && (
                  <div className="bg-red-400 my-2 rounded-md">
                    <div className="px-4 py-1 font-semibold text-white">
                      {errors.password.message}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <input
                    type="password"
                    id="confirmPassword"
                    autoFocus
                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Confrim New Password"
                    {...register("ConfrimPassword", {
                      validate: (value) => value === getValues("password"),
                      required: "Please vonfrim new password",
                      minLength: {
                        value: 6,
                        message: "password is more than 5 chars",
                      },
                    })}
                  />
                </div>

                {errors.ConfrimPassword && (
                  <div className="bg-red-400 my-2 rounded-md">
                    <div className="px-4 py-1 font-semibold text-white">
                      {errors.ConfrimPassword.message}
                    </div>
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <div className="bg-red-400 my-2 rounded-md">
                      <div className="px-4 py-1 font-semibold text-white">
                        Password do not match
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex w-full my-4">
                <button className="py-2 px-4  bg-green-300 hover:bg-gray-500 hover:text-white focus:bg-base-100 focus:text-white  w-full transition ease-in duration-200 text-center text-[#313641] font-semibold shadow-md focus:outline-none   rounded-lg ">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileScreen.auth = true;
