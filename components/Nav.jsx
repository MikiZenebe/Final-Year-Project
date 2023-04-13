import { Context } from "@/utils/Context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiShoppingCart, HiLogin } from "react-icons/hi";

export default function Nav() {
  const { state } = useContext(Context);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <div className="navbar  px-8 py-2 shadow-sm backdrop-blur-md bg-white/30">
      <div className="flex-1">
        <Link href="/" className=" text-base-100 text-xl font-bold">
          Jibruk
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <HiShoppingCart size={25} color="black" />

              {cartItemsCount > 0 && (
                <span className="badge badge-sm indicator-item text-white">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg text-white">
                {cartItemsCount} Items
              </span>
              <span className="text-info">
                ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </span>
              <div className="card-actions">
                <button className="btn bg-gray-300 btn-block text-base-200 hover:bg-gray-200">
                  <Link href={"/cart"}> View cart</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <Link href="/login">
            <h1>
              <HiLogin size={25} color="black" />
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
