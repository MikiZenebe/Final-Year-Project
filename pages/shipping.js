import CheckoutWizard from "@/components/CheckoutWizard";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

export default function shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  return (
    <div>
      <Head>
        <title>Shipping</title>
      </Head>

      <div>
        <CheckoutWizard activeStep={1} />

        <section class="shadow-blue-100 mx-auto max-w-screen-lg rounded-xl bg-white text-gray-600 shadow-lg sm:my-10 sm:border">
          <div class="container mx-auto flex flex-col flex-wrap px-5 pb-12">
            <div class="flex w-full flex-col">
              <h1 class="text-2xl font-semibold">Meal Preferences</h1>

              <div class="flex flex-col justify-between sm:flex-row">
                <button class="group order-1 my-2 flex w-full items-center justify-center rounded-lg bg-gray-200 py-2 text-center font-bold text-gray-600 outline-none transition sm:w-40 focus:ring hover:bg-gray-300">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
