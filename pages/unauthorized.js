import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <>
      <Head>
        <title>Unauthorized Page</title>
      </Head>

      <div>
        <div className="alert alert-error shadow-lg flex my-10 justify-center">
          <div>
            <AiFillCloseCircle size={20} />
            {message && <span className="text-[20px]">{message}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
