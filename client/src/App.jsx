import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./scenes/Home";
import Entry from "./scenes/Entry";
import Shop from "./scenes/Shop";
import Product from "./scenes/Product";
import Cart from "./scenes/Cart";
import ProductComparison from "./scenes/ProductComparison";
import Contact from "./scenes/Contact";
import Blog from "./scenes/Blog";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";
import AddProduct from "./scenes/AddProduct";
import "./index.css";
import Payment from "./scenes/Checkout/Payment";
import Completion from "./scenes/Checkout/Completion";
import { useAuth } from "./hooks/useAuth";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const user = useAuth()
  return (

    <Routes>
      <Route element={<Layout user={user?.user?._json} userData={user?.data} />}>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Home />}
        />
        <Route
          path="/shop"
          element={user ? <Shop user={user} /> : <Shop />}
        />
        <Route
          path="/product/:id"
          element={
            user ? <Product user={user} /> : <Product />
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
              <ProductComparison />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            user ? <Payment user={user} /> : <Navigate to="/entry" />
          }
        />
        <Route
          path="/checkout/completion"
          element={
            user ? <Completion user={user} /> : <Navigate to="/entry" />
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
          element={user ? <Blog user={user} /> : <Blog />}
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

        <Route path="*" element={<p>Page not found 404</p>} />


      </Route>
      <Route
        exact={false}
        path="/entry"
        element={user ? <Navigate to=".." /> : <Entry />}
      />

    </Routes>


  );
}

export default App;
