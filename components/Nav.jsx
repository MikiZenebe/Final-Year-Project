import { Context } from "../utils/Context";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiChat, HiShoppingCart } from "react-icons/hi";
import {
  RiLoginCircleFill,
  RiLogoutCircleFill,
  RiSearchFill,
} from "react-icons/ri";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [query, setQuery] = useState("");
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

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <div className="navbar  px-8 py-2 shadow-sm backdrop-blur-md bg-white/30">
      <div className="flex-1">
        <Link href="/" className=" text-[#313641] text-xl font-bold">
          Jibruk
        </Link>
      </div>

      <form
        onSubmit={submitHandler}
        className="mx-auto  justify-center md:flex "
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="rounded p-1 text-sm input-bordered input input-sm bg-white focus:ring-0 w-[120px]"
          placeholder="Search"
        />
        <button
          className="rounded btn btn-sm p-1 text-sm "
          type="submit"
          id="button-addon2"
        >
          <RiSearchFill className="h-5 w-5 text-white" />
        </button>
      </form>

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
            className="mt-3 card card-compact dropdown-content w-52 bg-[#313641] shadow"
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
                  className="btn bg-gray-300 btn-block text-[#313641] hover:bg-gray-200"
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
            <button className="btn btn-sm btn-square loading"></button>
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {session.user.name}
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-[#313641] rounded-box w-52"
              >
                <li>
                  <Link
                    href="/profile"
                    className="justify-between text-white active:bg-white active:text-base-200"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    href="/order-history"
                    className="justify-between text-white active:bg-white active:text-base-200"
                  >
                    Order History
                  </Link>
                </li>
                {session.user.isAdmin && (
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="justify-between text-white active:bg-white active:text-base-200"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}

                {!session.user.isAdmin && (
                  <li>
                    <Link
                      href="/feedback"
                      className="justify-between text-white active:bg-white active:text-base-200"
                    >
                      Feedback <HiChat size={25} />
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    href="#"
                    onClick={logoutHandler}
                    className="justify-between text-white active:bg-white active:text-base-200"
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
