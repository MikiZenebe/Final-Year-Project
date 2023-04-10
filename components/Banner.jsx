import Image from "next/image";
import React from "react";
import Ban from "../assets/banner.jpg";

export default function Banner() {
  return (
    <div>
      <div className="bg-white dark:bg-gray-800 overflow-hidden relative mb-20 rounded-md ">
        <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Want to be millionaire ?</span>
            <span className="block text-indigo-500">
              It&#x27;s today or never.
            </span>
          </h2>
          <p className="text-xl mt-4 text-gray-400">
            I had noticed that both in the very poor and very rich extremes of
            society the mad were often allowed to mingle freely
          </p>
        </div>
        <Image
          src={Ban}
          className="absolute w-[500px] h-full object-cover top-0 right-0 hidden  max-w-1/2 lg:block"
        />
      </div>
    </div>
  );
}
