import { getError } from "@/utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    default:
      state;
  }
}

export default function OrderScreen() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();

      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid successgully", {
          position: "top-center",
          autoClose: 1000,
        });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err), {
          position: "top-center",
          autoClose: 1000,
        });
      }
    });
  }

  function onError(err) {
    toast.error(getError(err), {
      position: "top-center",
      autoClose: 1000,
    });
  }

  return (
    <div>
      <Head>
        <title>{`Order ${orderId}`}</title>
      </Head>

      <div>
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-[20px] sm:text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              {`Order ${orderId}`}
            </h1>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-error shadow-lg flex my-10 justify-center">
              <div>
                <AiFillCloseCircle size={20} />
                <span className="text-[20px]">{error}</span>
              </div>
            </div>
          ) : (
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 mb-2 sm:mb-4">
                    Customer’s Cart
                  </p>
                  <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                    {orderItems.map((item) => (
                      <div>
                        <div className="w-full md:w-40 mb-4 sm:mb-4">
                          <img
                            className="w-full h-auto hidden md:block"
                            src={item.image}
                            alt="dress"
                          />
                          <img
                            className="w-[300px] rounded-md mx-auto   md:hidden"
                            src={item.image}
                            alt="dress"
                          />
                        </div>

                        <div className="flex mx-auto justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                              {item.name}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-3">
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-300">
                                  Quantitiy:{" "}
                                </span>{" "}
                                {item.quantity}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-300">
                                  Price:{" "}
                                </span>{" "}
                                ${item.price}
                              </p>

                              <p className="text-sm dark:text-white leading-none text-gray-800">
                                <span className="dark:text-gray-400 text-gray-300">
                                  Subtotal:{" "}
                                </span>{" "}
                                ${item.quantity * item.price}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-gray-800 ">
                                {isDelivered ? (
                                  <span>Deliverd at {deliveredAt}</span>
                                ) : (
                                  <span className="my-4 flex justify-center  bg-red-400 py-2 w-[100px] mx-auto rounded-sm">
                                    Not deliverd
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Payment Method
                    </h3>
                    <h1 className="text-white font-semibold">
                      {paymentMethod}
                    </h1>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      {isPaid ? (
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Paid at
                          </p>
                          <p className="text-green-300  leading-4 ">{paidAt}</p>
                        </div>
                      ) : (
                        <div className="flex justify-between w-full">
                          <p className="text-base dark:text-white leading-4 text-gray-800">
                            Paid Status
                          </p>
                          <p className="text-base  leading-4 text-red-300   ">
                            Not paid
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Items
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${itemsPrice}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Tax
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${taxPrice}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base dark:text-white leading-4 text-gray-800">
                          Shipping
                        </p>
                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                          ${shippingPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                        Total
                      </p>
                      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                        ${totalPrice}
                      </p>
                    </div>

                    {!isPaid && (
                      <div>
                        {isPending ? (
                          <div>Loading...</div>
                        ) : (
                          <div className="w-[300px] mx-auto">
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <div>Loading...</div>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img
                        className="rounded-full"
                        src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                        alt="avatar"
                      />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                          {shippingAddress.fullName}
                        </p>
                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                          {shippingAddress.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <AiOutlineUser />
                      <p className="cursor-pointer text-sm leading-5 ">
                        {shippingAddress?.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          <span className="font-semibold">Address:</span>{" "}
                          {shippingAddress?.address}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          <span className="font-semibold text-white">
                            {" "}
                            City:
                          </span>{" "}
                          {shippingAddress?.city}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          <span className="font-semibold text-white">
                            Postal Code:
                          </span>{" "}
                          {shippingAddress?.postalCode}
                        </p>
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          <span className="font-semibold">Country:</span>{" "}
                          {shippingAddress?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

OrderScreen.auth = true;
