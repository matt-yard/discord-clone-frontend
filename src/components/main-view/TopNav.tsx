import { NavLink } from "react-router-dom";

const TopNav = () => {
  return (
    <nav>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
};

export default TopNav;
