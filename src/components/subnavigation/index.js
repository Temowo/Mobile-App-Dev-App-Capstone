import React from "react";
import { NavLink } from "react-router-dom";

export const ProfileSubnav = () => {
  return (
    <nav className="subnav">
      <ul className="subnav-list">
        <li className="subnav-item">
          <NavLink to="/profile">Account details</NavLink>
        </li>
        <li className="subnav-item">
          <NavLink to="/profile-settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};
