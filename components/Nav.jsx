import Link from "next/link";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";

export default function Nav() {
  return (
    <div className="navbar  px-8 py-2 shadow-sm backdrop-blur-sm bg-white/30">
      <div className="flex-1">
        <Link href="/" className=" text-base-100 text-xl font-bold">
          Jibruk
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Link href="/cart">
              <div className="indicator">
                <HiShoppingCart size={25} color="black" />
                {/* <span className="badge badge-sm indicator-item text-white">
                8
              </span> */}
              </div>
            </Link>
          </label>
          {/* <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg text-white">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="dropdown dropdown-end">
          <Link href="/login">
            <h1>Login</h1>
          </Link>
          {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}
