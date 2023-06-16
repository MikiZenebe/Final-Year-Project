import React, { useEffect, useReducer } from "react";
import { getError } from "../utils/error";
import axios from "axios";
import Link from "next/link";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function OrderHistory() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="my-4">
        <div className="alert shadow-lg bg-[#313641] ">
          <p className="text-white text-2xl">Order History</p>
        </div>
      </div>

      {loading ? (
        <button className="btn loading">loading</button>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className=" table table-compact w-full text-[#313641]">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(20, 24)}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {" "}
                    {order.isPaid ? (
                      <span className="bg-green-300 px-1 text-base-200 rounded-sm">
                        ${order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-red-600">not paid</span> // "not paid"
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="bg-green-300 px-1 text-base-200 rounded-sm">
                        ${order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <span className="text-red-600">not delivered</span>
                    )}
                  </td>
                  <td>
                    <Link href={`/order/${order._id}`} passHref>
                      <button className="btn btn-sm text-white bg-green-400 hover:bg-[#313641]">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
