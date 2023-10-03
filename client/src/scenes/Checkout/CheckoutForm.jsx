import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
// useStripe gives a resolve
// useElements gives access to the elements to pass information to the api
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe(); //hook
  const elements = useElements(); //hook
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      //handle confirmation
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });
    console.log(paymentIntent.status);
    if (paymentIntent.status === "succeeded") {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/shop/order`, {
          paymentIntent: paymentIntent.id,
        });
        if (response) {
          dispatch(cartActions.clearCart())
          navigate('/completion')
        }
      } catch (err) {
        console.log(err);
      }
      setMessage("Payment Succeeded!");

    }
    else if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    }
    else {
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button className="bg-dim-yellow rounded-lg text-white border-0 py-3 px-4 mt-4 font-semibold cursor-pointer transition-all duration-200 ease-in-out block hover:filter hover:contrast-115 active:transform active:scale-98 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
