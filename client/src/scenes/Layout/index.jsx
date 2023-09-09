import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Footer from "../../components/Footer";

const Layout = ({ user }) => {
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  const compareItems = useSelector((state) => state.compare);
  const compareQuantity = useSelector((state) => state.compare.quantity);


  console.log(compareItems);
  return (
    <div>
      <Navbar
        cartItems={cartItems}
        cartTotalQuantity={cartTotalQuantity}
        user={user}
        logout={logout}
        compareItems={compareItems}
        compareQuantity={compareQuantity}
      />
      <Sidebar
        cartTotalQuantity={cartTotalQuantity}
        cartItems={cartItems}
        user={user}
        logout={logout}
        compareItems={compareItems}
        compareQuantity={compareQuantity}
      />

      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
