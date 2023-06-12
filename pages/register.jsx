import Head from "next/head";
import Link from "next/link";
import React from "react";
import { HiMail, HiLockOpen, HiUser } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { getError } from "../utils/error";

export default function register() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        toast.error(res.error, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (err) {
      toast.error(getError(err), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const notify = () => {
    toast.success("User created succussfully ✅", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="h-[100%] my-20 flex flex-col justify-center items-center">
        <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-[#313641] rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl  text-white sm:text-2xl dark:text-white font-semibold">
            Register to Jibruk Account
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiUser size={15} />
                  </span>
                  <input
                    type="text"
                    autoFocus
                    id="name"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your name"
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
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiMail size={15} />
                  </span>
                  <input
                    type="email"
                    autoFocus
                    id="email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your email"
                    {...register("email", {
                      required: "Please enter your email address",
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
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiLockOpen size={15} />
                  </span>
                  <input
                    type="password"
                    autoFocus
                    id="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your password"
                    {...register("password", {
                      required: "Please enter your password",
                      minLength: {
                        value: 6,
                        message: "password is morethan 6 char",
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

              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiLockOpen size={15} />
                  </span>
                  <input
                    type="password"
                    autoFocus
                    id="ConfirmPassword"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Confirm password"
                    {...register("ConfirmPassword", {
                      required: "Please enter the confirm password",
                      validate: (value) => value === getValues("password"),
                      minLength: {
                        value: 6,
                        message: "password is morethan 6 char",
                      },
                    })}
                  />
                </div>

                {errors.ConfirmPassword && (
                  <div className="bg-red-400 my-2 rounded-md">
                    <div className="px-4 py-1 font-semibold text-white">
                      {errors.ConfirmPassword.message}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mb-6 -mt-4"></div>
              <div className="flex w-full">
                <button
                  onClick={notify}
                  type="submit"
                  className="py-2 px-4  bg-green-300 hover:bg-gray-500 hover:text-white focus:bg-base-100 focus:text-white text-[#313641] w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg "
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <span className="ml-2 mr-1 inline-flex items-center text-xs font-thin text-center text-gray-300 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
              Have an account?{" "}
            </span>
            <Link
              href={`/login?redirect=${redirect || "/"}`}
              className="inline-flex items-center text-xs font-thin text-center text-gray-300 hover:text-gray-500 dark:text-gray-100 dark:hover:text-white"
            >
              <span className="font-semibold">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
