import Head from "next/head";
import React from "react";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

export default function login() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "final_year_g1bcx4s", e.target, "g5M_mi8IH_0n-OGwm")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    toast.success("Message sent successfully ✅📧", {
      position: "top-center",
      autoClose: 1000,
    });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="h-[100%] my-20 flex flex-col justify-center items-center">
        <div className="flex flex-col  w-full max-w-md px-4 py-8 bg-[#313641] rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl  text-white sm:text-2xl dark:text-white font-semibold">
            Feedback to Jibruk E-Commerce
          </div>
          <div className="mt-8">
            <form onSubmit={sendEmail}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    autoFocus
                    className=" rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <input
                    type="email"
                    name="from_email"
                    id="email"
                    autoFocus
                    className=" rounded only:flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    autoFocus
                    className=" rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <label htmlFor="name">
                    <textarea
                      type="email"
                      id="message"
                      autoFocus
                      className=" rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-base-200 focus:border-transparent"
                      placeholder="Your Message"
                      name="message"
                      rows="5"
                      cols="40"
                    ></textarea>
                  </label>
                </div>
              </div>
              <div className="flex items-center mb-6 -mt-4"></div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-green-300 hover:bg-gray-500 hover:text-white focus:bg-base-100 focus:text-white text-[#313641] w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none   rounded-lg "
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
