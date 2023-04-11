import Image from "next/image";
import React from "react";
import Ban from "../assets/banner.jpg";

export default function Banner() {
  return (
    <div>
      <section className="relative py-12 sm:py-16 lg:py-20 lg:pb-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-8">
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-5xl font-pj">
                  A special E-Commerce for digital users
                </h1>
                <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vehicula massa in enim luctus. Rutrum arcu.
                </p>
              </div>
            </div>

            <div>
              <Image
                width={50}
                height={50}
                className="w-full rounded-md"
                src={Ban}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
