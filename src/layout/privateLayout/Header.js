import React from "react";
import FoodSwipLogo from "../../assets/images/logo.png";
import LogoutMenu from "../../components/ui/LogoutMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/user";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="brand-area">
          <div className="brand">
            <img src={FoodSwipLogo} alt="FoodSwipe" />
          </div>
        </div>

        <div className="header-flex ">
          <div className="header-tooltip">
            <div className="user-tooltip">
              <LogoutMenu logout={handleLogout} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
