import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { cartActions } from "../store/cartSlice";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        if (data.user) {
          setUser(data.user); // Set the user state to data.user instead of data
          dispatch(
            cartActions.setCart({
              items: data?.data.cart,
              totalQuantity: data?.data.cart
                .map((item) => item.number)
                .reduce((partialSum, a) => partialSum + a, 0),
            })
          );
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, error }; // Include error in the returned object
};