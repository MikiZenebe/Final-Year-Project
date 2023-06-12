import Link from "next/link";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";

export default function Products({ product }) {
  return (
    <div>
      <div className="max-w-[500px] sm:max-w-[700px] h-auto">
        <section className="bg-white   text-gray-700 sm:py-6">
          <div className="mx-auto mt-8 sm:mt-0  max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="cards relative group rounded-lg hover:shadow-2xl">
              <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <Link href={`product/${product.slug}`}>
                  <img
                    className=" w-[150px] h-[150px] mx-auto"
                    src={product.image}
                    alt=""
                  />
                </Link>
              </div>

              <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                  <h3 className="text-xs font-bold text-[#313641] sm:text-sm md:text-[#313641]">
                    <Link href={`product/${product.slug}`}>
                      {" "}
                      {product.name}
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                    </Link>
                  </h3>

                  <h3 className="font-medium text-gray-500">{product.brand}</h3>
                  <div className="flex items-center mt-2.5 space-x-px gap-2 font-semibold text-gray-400">
                    <p>{product.star}</p>
                    <p>{product.rating}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="cards flex flex-col max-w-[230px]  my-auto mx-auto shadow-md  rounded-md h-auto gap-4">
          <div className="w-auto py-2 m-auto  rounded-2xl">
            <Link href={`product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-[200px] p-4 m-auto rounded-md"
              />
            </Link>
            <div className="p-4 m-3 bg-base-100 rounded-lg">
              <Link href={`/product/${product.slug}`}>
                <p className="text-[13px] font-bold text-white ">
                  {product.name}
                </p>
              </Link>
              <p className="text-xs text-gray-50">{product.brand}</p>
              <div className="flex items-center justify-between ">
                <p className="text-white">${product.price}</p>
                <button
                  type="button"
                  className="w-10 h-10 text-base font-medium text-white bg-white rounded-full hover:bg-gray-400 items-center justify-center flex"
                >
                  <HiShoppingCart size={25} className="text-base-100" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
