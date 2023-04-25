import React from "react";

function Chapa({
  shippingAddress1,
  shippingAddress2,
  shippingAddress3,
  totalPrice,
  tx_ref,
  public_key,
}) {
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={totalPrice} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={shippingAddress2} />
        <input type="hidden" name="first_name" value={shippingAddress1} />
        <input type="hidden" name="last_name" value={shippingAddress3} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://yourcompany.com/logo.png"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://example.com/callbackurl"
        />

        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit" className="text-[18px]">
          Chapa
        </button>
      </form>
    </div>
  );
}

export default Chapa;
