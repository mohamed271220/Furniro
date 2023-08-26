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

import "./index.css";
import Layout from "./scenes/Layout";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      //sub === id
      const url = `${
        import.meta.env.VITE_REACT_APP_API_URL
      }/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<Layout user={user} />}>
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
            path="/Product/:id"
            element={user ? <Product user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/Cart"
            element={user ? <Cart user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/Contact"
            element={user ? <Contact user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/Blog"
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
    </div>
  );
}

export default App;
