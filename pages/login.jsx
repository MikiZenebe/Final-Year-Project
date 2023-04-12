import Head from "next/head";
import React from "react";
import { HiMail, HiLockOpen } from "react-icons/hi";

export default function login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="h-[100%] my-20 flex flex-col justify-center items-center">
        <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl  text-gray-600 sm:text-2xl dark:text-white font-semibold">
            Login to Jibruk Account
          </div>
          <div className="mt-8">
            <form>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiMail size={15} />
                  </span>
                  <input
                    type="text"
                    id="sign-in-email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <HiLockOpen size={15} />
                  </span>
                  <input
                    type="password"
                    id="sign-in-email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div className="flex items-center mb-6 -mt-4"></div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-green-300 hover:bg-gray-500 hover:text-white focus:bg-base-100 focus:text-white text-base-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg "
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <a
              href="#"
              target="_blank"
              className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
            >
              <span className="ml-2 mr-1">You don't have an account? </span>
              <span className="font-semibold">Register</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
