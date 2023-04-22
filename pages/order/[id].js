import Head from "next/head";
import { useRouter } from "next/router";
import React, { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>{`Order ${orderId}`}</title>
      </Head>
    </div>
  );
}

OrderScreen.auth = true;
