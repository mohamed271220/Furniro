import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./scenes/Home";
import Entry from "./scenes/Entry";

import Shop from "./scenes/Shop";
import Product from "./scenes/Product";
import Cart from "./scenes/Cart";
import Checkout from "./scenes/Checkout";
import ProductComparison from "./scenes/ProductComparison";
import Contact from "./scenes/Contact";
import Blog from "./scenes/Blog";
import Dashboard from "./scenes/Dashboard";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/Http";

import Layout from "./scenes/Layout";
import AddProduct from "./scenes/AddProduct";
import { cartActions } from "./store/cartSlice";
import { useDispatch } from "react-redux";

import "./index.css";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const getUser = async () => {
      try {
        //sub === id
        const url = `${import.meta.env.VITE_REACT_APP_API_URL
          }/auth/login/success`;
        const { data } = await axios.get(url, { withCredentials: true });
        setUser(data);
        console.log(data);
        dispatch(
          cartActions.setCart({
            items: data?.data.cart,
            totalQuantity: data?.data.cart
              .map((item) => item.number)
              .reduce((partialSum, a) => partialSum + a, 0),
          })
        );
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [dispatch]);


  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout user={user?.user?._json} userData={user?.data} />}>
            <Route
              exact
              path="/"
              element={user ? <Home user={user} /> : <Navigate to="/entry" />}
            />
            <Route
              path="/shop"
              element={user ? <Shop user={user} /> : <Navigate to="/entry" />}
            />
            <Route
              path="/product/:id"
              element={
                user ? <Product user={user} /> : <Navigate to="/entry" />
              }
            />
            <Route
              path="/cart"
              element={user ? <Cart user={user} /> : <Navigate to="/entry" />}
            />
            <Route
              path="/addProduct"
              element={
                user &&
                  (user?.data.role === "admin" ||
                    user?.data.role === "coolerAdmin") ? (
                  <AddProduct user={user} />
                ) : (
                  <Navigate to="/entry" />
                )
              }
            />
            <Route
              path="/productComparison"
              element={
                user ? (
                  <ProductComparison user={user} />
                ) : (
                  <Navigate to="/entry" />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                user ? <Checkout user={user} /> : <Navigate to="/entry" />
              }
            />
            <Route
              path="/contact"
              element={
                user ? <Contact user={user} /> : <Navigate to="/entry" />
              }
            />
            <Route
              path="/blog"
              element={user ? <Blog user={user} /> : <Navigate to="/entry" />}
            />
            <Route
              path="/dashboard"
              element={
                user &&
                  (user?.data.role === "admin" ||
                    user?.data.role === "coolerAdmin") ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/entry" />
                )
              }
            >
              <Route path="users" />
            </Route>
          </Route>
          <Route
            exact
            path="/entry"
            element={user ? <Navigate to="/" /> : <Entry />}
          />
          {/* <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          /> */}
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
