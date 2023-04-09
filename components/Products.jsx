import Link from "next/link";
import React from "react";

export default function Products({ product }) {
  return (
    <div>
      <div className="max-w-[500px] sm:max-w-[700px] h-auto">
        <div className="card flex flex-col max-w-[230px] pb-6 py-4 mx-auto bg-bas shadow-md  rounded-md h-auto gap-4">
          <div className="max-w-[300px] justify-center mx-auto">
            <Link href={`/product/${product.slug}`}>
              <img
                className="w-[180px] rounded-md object-cover"
                src={product.image}
                alt=""
              />
            </Link>
          </div>

          <div className="px-3 py-3 text-center flex flex-col gap-1">
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-[15px] font-bold">{product.name}</h3>
            </Link>
            <h3>{product.brand}</h3>
            <h3>${product.price}</h3>
          </div>

          <div>
            <button className="btn btn-sm bg-base-100 px-2 py-1 border-none text-white rounded-lg flex items-center mx-auto justify-center hover:bg-gray-600 active:bg-gray-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
