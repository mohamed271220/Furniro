import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/icons/LOGO.svg";
import { AiOutlineShoppingCart, AiFillHeart, AiFillBell } from "react-icons/ai";
import Dropdown from "./Dropdown";
const Navbar = ({ user, logout }) => {
  console.log(user);

  //TODO check both cart and comparison

  return (
    <div className="hidden w-full md:flex flex-row  justify-between items-center padding-x py-2 sm:py-1">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <ul className="flex flex-row space-x-4">
        <li className="nav-text">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-text">
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li className="nav-text">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="nav-text">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <div
        className="flex flex-row
      justify-center items-center gap-[1vh]
       space-x-4"
      >
        <Dropdown  user={user} logout={logout} />
        <div className="icon rounded-full flex justify-center items-center w-7 h-7 lg:shadow-lg hover:text-dim-yellow">
          <AiFillHeart />
        </div>
        <img
          src={user?.picture}
          alt="profile"
          className={"w-10 h-10 rounded-full"}
        />
        
      </div>
    </div>
  );
};

export default Navbar;
