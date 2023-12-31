import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getConfig = async () => {
      try {
        await fetch("http://localhost:4000/order/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    getConfig()
  }, []);

  // const url = `${import.meta.env.VITE_REACT_APP_API_URL}/shop/cart`;
  // const { data } = await axios.get(url, { withCredentials: true });

  useEffect(() => {
    const paymentIntent = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/order/create-payment-intent`, {}).then(async (result) => {
          var { clientSecret } = result.data;
          console.log(result);
          setClientSecret(clientSecret);
        }).catch((err) => {
          console.log(err);
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    paymentIntent()
  }
    , []);

  return (
    <div
      className=" flex flex-col justify-center items-center h-[700px]  bg-gradient-to-r from-primary to-secondary"
    >
      <h1 className="text-[3vh] font-semibold ">Payment methods</h1>
      {/* Elements provider allows to use comps and give access to resolve comp  !IMPORTANT */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      <div className=" text-gray-400 font-semibold text-[1.2vh] ">This is a test version</div>

    </div>
  );
}

export default Payment;
