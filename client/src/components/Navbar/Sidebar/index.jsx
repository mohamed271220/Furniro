import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Logo from "../../../assets/icons/LOGO.svg";

function Navbar({ user, logout, cartTotalQuantity, compareQuantity }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="md:hidden block z-50">
      <IconContext.Provider value={{ color: "#000" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <img src={Logo} alt="logo" />
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}

            <li key={7} className="nav-text">
              <NavLink className=" flex flex-row justify-between">
                {" "}
                <span>Cart</span>
                <span className="bg-red-600 rounded-full p-1 text-white">
                  {cartTotalQuantity}
                </span>
              </NavLink>
            </li>
            <li key={8} className="nav-text">
              <NavLink className=" flex flex-row justify-between">
                {" "}
                <span>Compare</span>
                <span className="bg-red-600 rounded-full p-1 text-white">
                  {compareQuantity}
                </span>
              </NavLink>
            </li>
            <li key={9} className="nav-text">
              <NavLink onClick={logout}>
                {" "}
                <span>Logout</span>
              </NavLink>
            </li>
            <li>
              <Link className="nav-text">
                <img
                  src={user?.picture}
                  alt="profile"
                  className={"w-10 h-10 rounded-full "}
                />
                <span>{user?.name}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
