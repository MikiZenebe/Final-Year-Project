import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="flex justify-center gap-14 my-12">
      <div>
        <ul className="steps gap-4 steps-horizontal">
          {[
            "User Login",
            "Shipping Address",
            "Payment Method",
            "Place Order",
          ].map((step, index) => (
            <li
              key={step}
              className={`step gap-2 ${
                index <= activeStep
                  ? "step-success text-success font-bold"
                  : "step-neutral text-neutral "
              }`}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
