import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/icons/LOGO.svg";
import { AiOutlineSearch } from "react-icons/ai";
import Dropdown from "./Dropdown";

const Navbar = ({
  user,
  userData,
  logout,
  cartTotalQuantity,
  compareQuantity = 0,
  handleStartAddNewChallenge,
}) => {
  // console.log(user);

  //TODO check both cart and comparison

  // console.log(cartItems);

  // console.log(user);

  return (
    <div
      className="hidden w-full md:flex flex-row 
    gap-[2vh] justify-between items-center padding-x py-3 "
    >
      <Link className=" cursor-pointer" to="/">
        <img className="hidden lg:block  w-[30vh]" src={Logo} alt="logo" />
      </Link>
      <ul className="flex flex-row space-x-4">
        <li className="nav-text">
          <NavLink className='text-[2vh] lg:text-[3vh]'  to="/">Home</NavLink>
        </li>
        <li className="nav-text">
          <NavLink className='text-[2vh] lg:text-[3vh]'  to="/shop">Shop</NavLink>
        </li>
        <li className="nav-text">
          <NavLink  className='text-[2vh] lg:text-[3vh]' to="/blog">Blog</NavLink>
        </li>
        <li className="nav-text">
          <NavLink  className='text-[2vh] lg:text-[3vh]' to="/contact">Contact</NavLink>
        </li>
      </ul>
      <div
        className="flex flex-row
      justify-center items-center gap-[1vh]
       space-x-4"
      >
        <Dropdown
          handleStartAddNewChallenge={handleStartAddNewChallenge}
          compareQuantity={compareQuantity}
          cartTotalQuantity={cartTotalQuantity}
          user={user}
          userData={userData}
          logout={logout}
        />
        <div className="icon rounded-full flex justify-center items-center w-[3vh] h-[3vh] lg:shadow-lg hover:text-dim-yellow">
          <AiOutlineSearch />
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
