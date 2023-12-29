import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';


import Footer from "../../components/Footer";

import CartModal from "../../components/CartModal";
import ScrollToTop from "../../hooks/scroll-to-top";

const Layout = ({ user, userData }) => {
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

  const [prevCompareState, setPrevCompareState] = useState(compareItems);
  const [showNotification, setShowNotification] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const animationControls = useAnimation();

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
  }


  useEffect(() => {
    console.log('compareQuantity:', compareItems);
    console.log('prevCompareState:', prevCompareState);

    if (prevCompareState !== compareItems) {
      setShowNotification(true);
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });

      setTimeout(() => {
        animationControls.start({
          opacity: 0,
          y: -50,
          transition: { duration: 0.5 },
        });
        setShowNotification(false);
      }, 3000);

      setPrevCompareState(compareItems);
    }
  }, [compareItems, prevCompareState, animationControls]);



  return (
    <div className='relative'>
      {isModalOpen && <CartModal user={user} isOpen={isModalOpen} onClose={handleClose} />}
      <ScrollToTop />
      <Navbar
        cartItems={cartItems}
        cartTotalQuantity={cartTotalQuantity}
        user={user}
        userData={userData}
        logout={logout}
        compareItems={compareItems}
        compareQuantity={compareQuantity}
        handleModalOpen={handleModalOpen}
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
      <AnimatePresence>
        <motion.div
          className="z-50 h-12 w-fit fixed bottom-0 right-0 m-6 p-4 bg-green-500 text-white flex items-center space-x-2 rounded shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={animationControls}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
        >
          <IoMdCheckmarkCircleOutline className="h-6 w-6" />
          <span>Comparison updated!</span>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
