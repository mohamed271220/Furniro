import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import ErrorBlock from "../../components/ErrorBlock";
import Ticker from "../../components/Ticker";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getConfig = async () => {
      try {
        await fetch("https://secrets-380318.ew.r.appspot.com/order/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }
      catch (err) {
        setError(err);
      }
    }
    getConfig()
  }, []);

  // const url = `${import.meta.env.VITE_REACT_APP_API_URL}/shop/cart`;
  // const { data } = await axios.get(url, { withCredentials: true });

  useEffect(() => {
    const paymentIntent = async () => {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/order/create-payment-intent`, {}).then(async (result) => {
        var { clientSecret } = result.data;
        setClientSecret(clientSecret);
      }).catch((err) => {
        setMessage(err.response.data.message)
      });
    }
    paymentIntent()
  }
    , []);

  return (
    <div>

      <Ticker />
      <div
        className=" flex flex-col justify-center items-center h-[700px]  bg-gradient-to-r from-primary to-secondary"
      >
        <h1 className="text-[3vh] font-semibold ">Payment methods</h1>
        {/* Elements provider allows to use comps and give access to resolve comp  !IMPORTANT */}
        {(clientSecret && stripePromise) ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        ) :
          <ErrorBlock title='Something went wrong' message={message}
          />
        }
        <div className=" text-gray-400 font-semibold text-[1.2vh] ">This is a test version</div>

      </div>
      <Ticker />

    </div>
  );
}

export default Payment;
