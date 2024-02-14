import { Link, NavLink } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Logo from "../../assets/icons/LOGO.svg";
import { AiOutlineSearch } from "react-icons/ai";

import Dropdown from "./Dropdown";
import { useState } from "react";

const Navbar = ({
  user,
  userData,
  logout,
  cartTotalQuantity,
  compareQuantity = 0,
  handleCartModalOpen,
  handleSearchModalOpen
}) => {
  return (
    <>

      <div
        className=" hidden w-full md:flex flex-row 
    gap-[2vh] justify-between items-center px-[2vh] py-3  "
      >
        <Link className=" cursor-pointer" to="/">
          <img className=" max-w-[15rem]  w-[8rem] md:w-[10rem] lg:w-[15rem]" src={Logo} alt="logo" />
        </Link>
        <ul className="flex flex-row space-x-4">
          <li className="nav-text">
            <NavLink className='text-[1.4vh]  lg:text-[2vh]' to="/">Home</NavLink>
          </li>
          <li className="nav-text">
            <NavLink className='text-[1.4vh] lg:text-[2vh]' to="/shop">Shop</NavLink>
          </li>
          <li className="nav-text">
            <NavLink className='text-[1.4vh]  lg:text-[2vh]' to="/blog">Blog</NavLink>
          </li>
          <li className="nav-text">
            <NavLink className='text-[1.4vh]  lg:text-[2vh]' to="/contact">Contact</NavLink>
          </li>
        </ul>
        <div
          className="flex flex-row
      justify-center items-center gap-[1vh]
       space-x-4"
        >
          <Dropdown
            handleCartModalOpen={handleCartModalOpen}
            compareQuantity={compareQuantity}
            cartTotalQuantity={cartTotalQuantity}
            user={user}
            userData={userData}
            logout={logout}
          />
          <div className="hidden rounded-full lg:flex justify-center items-center w-7 h-7 lg:shadow-lg active:text-secondary hover:text-dim-yellow" onClick={handleSearchModalOpen}>
            <AiOutlineSearch />
          </div>
          {user ? <Link to={`/profile`}>
            <img
              src={user?.picture}
              alt="profile"
              className={"w-10 h-10 rounded-full"}
            />
          </Link> : <Link to="/entry" className="text-[1.4vh]  lg:text-[2vh] bg-dim-yellow text-white px-[2.4vh] py-[1vh] rounded-lg" >Login</Link>
          }
        </div>

      </div>
      <div className="lg:hidden  flex justify-center items-center cursor-pointer text-white text-[5vh] fixed  z-50    bottom-5 right-2 bg-dim-yellow rounded-full w-20 h-20" onClick={handleSearchModalOpen}>
        <AiOutlineSearch />
      </div>
    </>
  );
};

export default Navbar;
