import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar'

const Layout = ({ user }) => {
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/logout`,
      "_self"
    );
  };
  return (
    <div>
    
      <Navbar user={user} logout={logout} />

   
      <Outlet />
    </div>
  );
};

export default Layout;
