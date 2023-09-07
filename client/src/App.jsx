import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import Signup from "./scenes/Signup";
import Shop from "./scenes/Shop";
import Product from "./scenes/Product";
import Cart from "./scenes/Cart";
import Checkout from "./scenes/Checkout";
import ProductComparison from "./scenes/ProductComparison";
import Contact from "./scenes/Contact";
import Blog from "./scenes/Blog";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/Http";

import "./index.css";
import Layout from "./scenes/Layout";
import AddProduct from "./scenes/AddProduct";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      //sub === id
      const url = `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data);
      console.log(data.data.role);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout  user={user} />}>
            <Route
              exact
              path="/"
              element={user ? <Home user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/shop"
              element={user ? <Shop user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/product/:id"
              element={
                user ? <Product user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/cart"
              element={user ? <Cart user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/addProduct"
              element={ user && (user?.data.role==='admin' || user?.data.role==='coolerAdmin') ?  <AddProduct user={user}/> : <Navigate to='/login'

              />
              }
              
               
            />
            <Route
              path="/productComparison"
              element={
                user ? (
                  <ProductComparison user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/checkout"
              element={
                user ? <Checkout user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/contact"
              element={
                user ? <Contact user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/blog"
              element={user ? <Blog user={user} /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
