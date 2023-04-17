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

        <form></form>
      </div>
    </div>
  );
}
