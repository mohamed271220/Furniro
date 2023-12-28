import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./scenes/Home";
import Entry from "./scenes/Entry";
import Shop from "./scenes/Shop";
import Product from "./scenes/Product";
import Cart from "./scenes/Cart";
import ProductComparison from "./scenes/Comparison";
import Contact from "./scenes/Contact";
import Blog from "./scenes/Blog";
import Dashboard from "./scenes/Dashboard";
import Layout from "./scenes/Layout";
import AddProduct from "./scenes/AddProduct";
import AddPost from "./scenes/AddPost";
import NotFound from "./scenes/404";
import "./index.css";
import Payment from "./scenes/Checkout/Payment";
import Completion from "./scenes/Checkout/Completion";
import { useAuth } from "./hooks/useAuth";
import Profile from './scenes/Profile';
import LoadingSpinner from "./constants/Loading/LoadingSpinner/LoadingSpinner";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-primary">
      <div className="flex h-[150px] w-[150px] items-center justify-center rounded-lg bg-white">
        <LoadingSpinner />
      </div>
    </div>
  )

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
          path="/addPost"
          element={
            user &&
              (user?.data.role === "admin" ||
                user?.data.role === "coolerAdmin") ? (
              <AddPost user={user} />
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
            user || user?.data.cart ? <Payment user={user} /> : <Navigate to="/entry" />
          }
        />
        <Route
          path="/completion"
          element={
            user ? <Completion user={user} /> : <Navigate to="/entry" />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact />
          }
        />
        <Route
          path="/blog"
          element={user ? <Blog user={user} /> : <Blog />}
        />
        <Route
          path="/profile"
          element={
            user ? <Profile user={user} /> : <Navigate to="/entry" />
          }
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

        <Route path="*" element={<NotFound />} />


      </Route>
      <Route
        exact={false}
        path="/entry"
        element={user ? <Navigate to="../.." /> : <Entry />}
      />

    </Routes>


  );
}

export default App;
