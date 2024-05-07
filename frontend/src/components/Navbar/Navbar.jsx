import { useState, createContext, useContext, useEffect } from 'react';
import "./Navbar.css";
import smileyLogo from "../../assets/smileyLogo.png";
import { FaUserFriends, FaUser, FaFacebookMessenger, FaTools } from 'react-icons/fa';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from "../../context/UserContext";

/**
 * Component that represents the navigation bar.
 * Displays the logo, brand name, and navigation icons.
 * @param {Function} onNavbarItemClick - Callback function invoked when a navigation icon is clicked.
 */
export default function Navbar({ onNavbarItemClick }) {
  const User = useUser();
  const { navagation } = useNavigation();

  useEffect(() => {
    console.log("user info:", User);
  }, [User]);

  const initials = User.user?.initials || ""; // Defensive coding for User.user.initials

  return (
    <div>
      <div
        className="row align-items-center d-flex justify-content-center"
        style={{ height: "50px" }}
      >
        <div className="col-1 p-0">
          <img
            src={smileyLogo}
            alt="Logo"
            style={{ height: "40px", width: "40px" }}
          />
        </div>
        <div className="brand-name col-6 p-0">
          Fluent Dialogue Messenger
        </div>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ height: "85px" }}
      >
        <div
          className="row my-1 justify-content-center rounded-pill p-0 icon"
        >
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "profile" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("profile")}
          >
            <div className='user-avatar'>
              {initials}
            </div>
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "friends" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("friends")}
          >
            <FaUserFriends size={40} />
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "chat" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("chat")}
          >
            <FaFacebookMessenger size={32} />
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "settings" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("settings")}
          >
            <FaTools size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
