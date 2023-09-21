import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import Footer from "../../components/Footer";
import { AnimatePresence } from "framer-motion";
import CartModal from "../../components/CartModal";

const Layout = ({ user,userData }) => {
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };

  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity) || 0;

  const compareItems = useSelector((state) => state.compare);
  const compareQuantity = useSelector((state) => state.compare.quantity) || 0;

  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState(false);

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleClose() {
    setIsCreatingNewChallenge(false);
  }

  console.log(compareItems);
  return (
    <div>
      {isCreatingNewChallenge && <CartModal user={user} onClose={handleClose} />}

      <Navbar
        cartItems={cartItems}
        cartTotalQuantity={cartTotalQuantity}
        user={user}
        userData={userData}
        logout={logout}
        compareItems={compareItems}
        compareQuantity={compareQuantity}
        handleStartAddNewChallenge={handleStartAddNewChallenge}
      />
      <Sidebar
        cartTotalQuantity={cartTotalQuantity}
        cartItems={cartItems}
        user={user}
        userData={userData}
        logout={logout}
        compareItems={compareItems}
        compareQuantity={compareQuantity}
      />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
