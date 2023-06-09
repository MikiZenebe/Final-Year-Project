import { getError } from "../../utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsEnvelopeAt } from "react-icons/bs";
import { toast } from "react-toastify";
import Chapa from "../../components/Chapa";
import { useSession } from "next-auth/react";

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

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      state;
  }
}

export default function OrderScreen() {
  const router = useRouter();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;
  const { data: session } = useSession();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
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

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();

      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }

      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
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
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);

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
        window.location.reload();
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err), {
          position: "top-center",
          autoClose: 1000,
        });
      }
    });
  }

  function ChapaApprove(data, actions) {
    return actions?.order.capture().then(async function (details) {
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
        window.location.reload();
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

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });

      toast.success("Order is delivered", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });

      toast.success(getError(err), {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }

  const tx_ref = `${orderId}`;
  const public_key = "CHAPUBK_TEST-w1IMufbbi7OU8XcR3gTH5Z3kQc0Ph3gv";

  return (
    <div>
      <Head>
        <title>{`Order ${orderId}`}</title>
      </Head>

      <div>
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-[20px] sm:text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-[#313641]">
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
                <div className="flex flex-col justify-start items-start  bg-[#313641] px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-white mb-2 sm:mb-4">
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
                            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-white">
                              {item.name}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-3">
                              <p className="text-sm dark:text-white leading-none text-white">
                                <span className="dark:text-white-400 text-white-300">
                                  Quantitiy:{" "}
                                </span>{" "}
                                {item.quantity}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-white">
                                <span className="dark:text-white-400 text-white-300">
                                  Price:{" "}
                                </span>{" "}
                                ${item.price}
                              </p>

                              <p className="text-sm dark:text-white leading-none text-white">
                                <span className="dark:text-white-400 text-white-300">
                                  Subtotal:{" "}
                                </span>{" "}
                                ${item.quantity * item.price}
                              </p>
                              <p className="text-sm dark:text-white leading-none text-white ">
                                {isDelivered ? (
                                  <span>
                                    Deliverd at{" "}
                                    <span className="text-green-300 ">
                                      {deliveredAt}
                                    </span>
                                  </span>
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
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-[#313641]  space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-white">
                      Payment Method
                    </h3>
                    <h1 className="text-white font-semibold">
                      {paymentMethod}
                    </h1>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      {isPaid ? (
                        <div className="flex justify-between w-full">
                          <p className=" leading-4 text-white">Paid at</p>
                          <p className="text-green-300  leading-4 ">{paidAt}</p>
                        </div>
                      ) : (
                        <div className="flex justify-between w-full">
                          <p className=" leading-4 text-white">Paid Status</p>
                          <p className=" leading-4 text-red-300   ">Not paid</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-[#313641]  space-y-6">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-white">
                      Summary
                    </h3>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                      <div className="flex justify-between w-full">
                        <p className=" leading-4 text-white">Items</p>
                        <p className="text-white dark:text-white-300 leading-4 text-white-600">
                          ${itemsPrice}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="leading-4 text-white">Tax</p>
                        <p className="text-white dark:text-white-300 leading-4 text-white-600">
                          ${taxPrice}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className=" leading-4 text-white">Shipping</p>
                        <p className="text-white dark:text-white-300 leading-4 text-white-600">
                          ${shippingPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className=" font-semibold leading-4 text-white">
                        Total
                      </p>
                      <p className="text-white dark:text-white-300 font-semibold leading-4 text-white-600">
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

                            <button
                              onClick={ChapaApprove}
                              className=" btn bg-green-400 w-[300px] my-3 text-black hover:text-white"
                            >
                              <Chapa
                                shippingAddress1={shippingAddress.FirstName}
                                shippingAddress2={shippingAddress.email}
                                shippingAddress3={shippingAddress.LastName}
                                totalPrice={totalPrice}
                                tx_ref={tx_ref}
                                public_key={public_key}
                              />
                            </button>
                          </div>
                        )}
                        {loadingPay && <div>Loading...</div>}
                      </div>
                    )}

                    {session.user.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <div className="w-[300px] mx-auto">
                          {" "}
                          {loadingDeliver && <div>Loading...</div>}
                          <button
                            className=" btn bg-green-400 w-[300px] my-3 text-black hover:text-white mx-auto"
                            onClick={deliverOrderHandler}
                          >
                            Deliver Order
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="bg-[#313641]  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl text-white font-semibold leading-5 ">
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
                        <p className=" font-semibold leading-4 text-left text-white">
                          {shippingAddress.FirstName} {shippingAddress.LastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <BsEnvelopeAt />
                      <p className="cursor-pointer text-sm leading-5 text-white">
                        {shippingAddress.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 text-white">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-white font-semibold leading-4 text-center md:text-left ">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full dark:text-white-300 xl:w-48 text-center md:text-left text-sm leading-5 text-white">
                          <span className="font-semibold">Address:</span>{" "}
                          {shippingAddress?.address}
                        </p>
                        <p className="w-48 lg:w-full dark:text-white-300 xl:w-48 text-center md:text-left text-sm leading-5 text-white">
                          <span className="font-semibold text-white">
                            {" "}
                            City:
                          </span>{" "}
                          {shippingAddress?.city}
                        </p>

                        <p className="w-48 lg:w-full dark:text-white-300 xl:w-48 text-center md:text-left text-sm leading-5 text-white">
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
