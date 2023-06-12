import CheckoutWizard from "../components/CheckoutWizard";
import { Context } from "../utils/Context";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PaymentScreen() {
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required 💰", {
        position: "top-center",
        autoClose: 1000,
      });
    }

    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <div>
      <Head>
        <title>Payment Method</title>
      </Head>

      <CheckoutWizard activeStep={2} />

      <div>
        <form
          onSubmit={submitHandler}
          className="w-[300px] bg-white  flex flex-col mx-auto"
        >
          <h2 className="text-xl font-semibold leading-7 text-gray-800 mt-10 mb-4">
            Payment Method
          </h2>

          {["PayPal", "Chapa", "CashOnDelivery"].map((payment) => (
            <div>
              <div key={payment} className="form-control gap-2">
                <label
                  htmlFor={payment}
                  className="label cursor-pointer text-start"
                >
                  <span className="label-text ">{payment}</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id={payment}
                    className="radio border-[#313641] checked:bg-[#313641]"
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => router.push("/shipping")}
              className="flex bg-gray-300  items-center justify-center py-4 px-7 focus:outline-none border rounded  mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:text-[#313641]"
            >
              Back
            </button>

            <button className="flex bg-[#313641]  items-center justify-center py-2 px-7 focus:outline-none border rounded  mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:text-[#313641]  text-white">
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

PaymentScreen.auth = true;
