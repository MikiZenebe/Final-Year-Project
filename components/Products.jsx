import Link from "next/link";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";

export default function Products({ product }) {
  return (
    <div>
      <div className="max-w-[500px] sm:max-w-[700px] h-auto">
        <div className="cards flex flex-col max-w-[230px]  my-auto mx-auto shadow-md  rounded-md h-auto gap-4">
          <div class="w-auto py-2 m-auto  rounded-2xl">
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
        </div>
      </div>
    </div>
  );
}
