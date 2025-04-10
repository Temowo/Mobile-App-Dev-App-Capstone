import React from "react";
import { NavLink } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import {
  CreditCardIcon,
  UserIcon,
  ShoppingCartIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ isNavbarOpen }) => {
  const { user } = useAuth();

  // Safely check if user and user role exist
  const userRole = user?.user?.user?.role || "GUEST";

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/home">
            <HomeIcon className="w-6 h-6 mr-3 inline-block" />
            <span className="navbar-item-link">Home</span>
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to="/orders/new">
            <ShoppingCartIcon className="w-6 h-6 mr-3 inline-block" />
            <span className="navbar-item-link">Orders</span>
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to="/menu">
            <GiKnifeFork className="w-6 h-6 mr-3 inline-block" />
            <span className="navbar-item-link">Menu</span>
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to="/transactions">
            <CreditCardIcon className="w-6 h-6 mr-3 inline-block" />
            <span className="navbar-item-link">Transactions</span>
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to="/profile">
            <UserIcon className="w-6 h-6 mr-3 inline-block" />
            <span className="navbar-item-link">Profile</span>
          </NavLink>
        </li>

        {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
          <li className="navbar-item">
            <NavLink to="/add-vendor">
              <PlusIcon className="w-6 h-6 mr-3 inline-block" />
              <span className="navbar-item-link">Add Vendor</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
