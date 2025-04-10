import React, { useState } from "react";

import Header from "./Header";
import Navbar from "./Navbar";
import NavList from "../../components/ui/NavList";

const PrivateLayout = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <main className="main">
      <Header toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
      <div className="main-flex">
        <NavList />
        <Navbar isNavbarOpen={isNavbarOpen} />

        {children}
      </div>
    </main>
  );
};

export default PrivateLayout;
