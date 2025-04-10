import React from "react";
import { NavLink } from "react-router-dom";

const Subnavigation = () => {
  return (
    <nav className="subnav">
      <ul className="subnav-list">
        <li className="subnav-item">
          <NavLink to="/orders/new">New</NavLink>
        </li>
        <li className="subnav-item">
          <NavLink to="/orders/in-progress">In progress</NavLink>
        </li>
        <li className="subnav-item">
          <NavLink to="/orders/completed">Completed</NavLink>
        </li>
        <li className="subnav-item">
          <NavLink to="/orders/canceled">Canceled</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Subnavigation;
