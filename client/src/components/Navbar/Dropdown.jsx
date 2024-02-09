import { useState } from "react";
import {
  AiFillProfile,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { LuArrowRightLeft } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
const Dropdown = ({
  user,
  userData,
  logout,
  cartTotalQuantity,
  compareQuantity,
  handleCartModalOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="m-0 p-0 fixed inset-0 z-0"
        />
      )}
      <div className="relative flex flex-col items-center z-7  bg-white rounded-lg shadow-lg text-gray-900 hover:bg-secondary  ">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full flex justify-center items-center w-7 h-7 lg:shadow-lg active:text-secondary hover:text-dim-yellow"
        >
          {!isOpen  ? (
            <div className="relative">
              <AiFillProfile />
              {(cartTotalQuantity !== 0 || compareQuantity !== 0) && (
                <span
                  className="absolute -top-1 -right-1 lg:h-[0.7rem]  
              lg:w-[.7rem]
              md:h-[0.5rem]
              md:w-[.5rem]
              sm:h-[0.3rem]
              sm:w-[.3rem]
               bg-red-600
               text-red-600 rounded-full border-2"
                ></span>
              )}
            </div>
          ) : (
            <MdKeyboardArrowDown />
          )}
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white z-50 absolute top-10  flex flex-col items-start rounded-lg ">

            {user && <motion.div
              whileHover={{
                backgroundColor: "#FFF3E3",
              }}
              whileTap={{
                backgroundColor: "#FFF3E3",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
                handleCartModalOpen();
              }}
              className="flex flex-row w-full gap-[1vh]  text-black p-2  cursor-pointer "
            >
              <Link className="flex flex-row w-full justify-between items-center " >
                <h2 className="flex flex-row w-full justify-between items-center ">
                  <span className="flex ml-1 flex-row items-center gap-[1vh]  text-[2vh]">
                    <AiOutlineShoppingCart />
                    Cart
                  </span>
                  <span className="bg-red-600 text-[1.4vh] rounded-full p-1 text-white">
                    {cartTotalQuantity}
                  </span>
                </h2>
              </Link>
            </motion.div>}

            <motion.div
              whileHover={{
                backgroundColor: "#FFF3E3",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
              className="flex flex-row w-full gap-[1vh]  text-black p-2 cursor-pointer items-center justify-center">
              <Link className="flex flex-row w-full justify-between items-center " to='/productComparison'>
                <h2 className="flex flex-row w-full justify-between items-center ">
                  <span className="flex ml-1 flex-row items-center gap-[1vh]  text-[2vh]">
                    <LuArrowRightLeft />
                    Compare
                  </span>
                  <span className="bg-red-600 text-[1.4vh] rounded-full p-1 text-white">
                    {compareQuantity}
                  </span>
                </h2>
              </Link>
            </motion.div>
            {user && (userData.role === "admin" ||
              userData.role === "coolerAdmin") && (
                <motion.div
                  whileHover={{
                    backgroundColor: "#FFF3E3",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                  }}
                  className="flex flex-row w-full gap-[1vh]   text-black p-2 cursor-pointer items-center justify-center">
                  <Link to="/addProduct">

                    <h2 className="flex flex-row justify-between items-center ">
                      <span className="flex ml-1 flex-row items-center gap-[1vh] text-[2vh]">
                        <Link to="/addProduct">Add a product</Link>
                      </span>
                      <span className="bg-red-600 text-[1.2vh] font-bold rounded-full p-1 text-white">
                        Admin
                      </span>
                    </h2>
                  </Link>
                </motion.div>
              )}
            {user && (userData.role === "admin" ||
              userData.role === "coolerAdmin") && (
                <motion.div
                  whileHover={{
                    backgroundColor: "#FFF3E3",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                  }}
                  className="flex flex-row w-full gap-[1vh]   text-black p-2  cursor-pointer items-center justify-center">
                  <Link to="/addPost">

                    <h2 className="flex flex-row justify-between items-center ">
                      <span className="flex ml-1 flex-row items-center gap-[1vh] text-[2vh]">
                        <Link to="/addPost">Add a post</Link>
                      </span>
                      <span className="bg-red-600 text-[1.2vh] font-bold rounded-full p-1 text-white">
                        Admin
                      </span>
                    </h2>
                  </Link>
                </motion.div>
              )}
            {user && (userData.role === "admin" ||
              userData.role === "coolerAdmin") && (
                <motion.div
                  whileHover={{
                    backgroundColor: "#FFF3E3",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                  }}
                  className="flex flex-row w-full gap-[1vh]   text-black p-2  cursor-pointer items-center justify-center">
                  <Link to="/addPost">
                    <h2 className="flex flex-row justify-between items-center ">
                      <span className="flex ml-1 flex-row items-center gap-[1vh] text-[2vh]">
                        <Link to="/dashboard">Admin Dashboard</Link>
                      </span>
                      <span className="bg-red-600 text-[1.2vh] font-bold rounded-full p-1 text-white">
                        Admin
                      </span>
                    </h2>
                  </Link>
                </motion.div>
              )}

            {user && <motion.div
              whileHover={{
                backgroundColor: "#FFF3E3",
              }}
              onClick={logout}
              className="flex flex-row w-full gap-[1vh] text-[2vh]  text-black p-2 rounded-lg cursor-pointer items-center justify-center">
              <h2>
                <Link>Logout</Link>
              </h2>
            </motion.div>
            }
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
