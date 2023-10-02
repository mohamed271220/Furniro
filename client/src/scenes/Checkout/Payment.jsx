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
      await fetch("http://localhost:4000/shop/config").then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      });
    }
    getConfig()
  }, []);

  // const url = `${import.meta.env.VITE_REACT_APP_API_URL}/shop/cart`;
  // const { data } = await axios.get(url, { withCredentials: true });

  useEffect(() => {
    const paymentIntent = async () => {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/shop/create-payment-intent`, {}).then(async (result) => {
        var { clientSecret } = result.data;
        console.log(result);
        setClientSecret(clientSecret);
      }).catch((err) => {
        console.log(err);
      });
    }
    paymentIntent()
  }
    , []);

  return (
    <>
      <h1>Payment </h1>

      {/* Elements provider allows to use comps and give access to resolve comp  !IMPORTANT */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
