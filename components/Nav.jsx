import { Context } from "@/utils/Context";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";

export default function Nav() {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="navbar  px-8 py-2 shadow-sm backdrop-blur-md bg-white/30">
      <div className="flex-1">
        <Link href="/" className=" text-base-100 text-xl font-bold">
          Jibruk
        </Link>
      </div>
      <div className="flex-none items-center justify-center">
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
                <Link
                  className="btn bg-gray-300 btn-block text-base-200 hover:bg-gray-200"
                  href={"/cart"}
                >
                  <button className="text-md">View Cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end ml-3 ">
          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {session.user.name}
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile" className="justify-between text-white">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/order-history"
                    className="justify-between text-white"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={logoutHandler}
                    className="justify-between text-white"
                  >
                    Logout <RiLogoutCircleFill size={25} />
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <button>
              <Link href="/login">
                <h1 className="items-center">
                  <RiLoginCircleFill size={25} color="black" />
                </h1>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
