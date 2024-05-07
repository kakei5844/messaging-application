import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import "./Settings.css";
import { FaBellSlash, FaMoon, FaClock, FaSun, FaKey } from "react-icons/fa";
import { useSetting } from "../../context/SettingContext";

/**
 * Component that represents the settings page.
 */
export default function Settings() {

  const navigate = useNavigate();
  const { theme, setDarkMode, setLightMode } = useSetting();

  // const [theme, setTheme] = useState("light");
  // const [fontSize, setFontSize] = useState("M");
  // const [mute, setMute] = useState("Unmute");

  // const setDarkMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "dark");
  //   localStorage.setItem("selectedTheme", "dark");
  // }

  // const setLightMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "light");
  //   localStorage.setItem("selectedTheme", "light");
  // }

  // const selectedTheme = localStorage.getItem("selectedTheme");

  // if (selectedTheme === "dark") {
  //   setDarkMode();
  // }

  /**
   * Toggles between dark and light themes.
   */
  const toggleTheme = () => {
    if (theme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }

  let themeIcon = theme === "dark" ? <FaMoon className="setting-icon" size={40} /> : <FaSun className="setting-icon" size={44} />;

  // useEffect(() => {
  //   const theme_cookie = getCookie("theme")
  //   const fontSize_cookie = getCookie("fontSize")
  //   const mute_cookie = getCookie("mute")

  //   if (theme_cookie) {
  //     setTheme(theme_cookie);
  //   }

  //   if (fontSize_cookie) {
  //     setFontSize(fontSize_cookie);
  //   }

  //   if (mute_cookie) {
  //     setMute(mute_cookie);
  //   }
  // }, []);

  /**
   * Handles the logout action.
   * Logs out the user and navigates to the login page.
   */
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  }


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Save the theme and font size to cookies
  //   setCookie('theme', theme);
  //   setCookie('fontSize', fontSize);
  //   setCookie('mute', mute)

  //   // Perform other actions with the updated settings
  //   console.log('Form submitted: ' + theme + ', ' + fontSize);
  // };

  // const setCookie = (name, value) => {
  //   document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  // };

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div className="settings-container p-0 rounded">
        <div className="profile-header">Settings</div>

        <div className="settings-main">
          <div className="sttngs-box" onClick={() => toggleTheme()}>
            {themeIcon}
            <p style={{ paddingTop: "10px" }}>Theme</p>
          </div>
          <div className="sttngs-box" style={{}}>
            <FaBellSlash className="setting-icon" size={48} />
            <p style={{ paddingTop: "10px" }}>Notifications</p>

          </div>
          <div className="sttngs-box">
            <FaClock className="setting-icon" size={40} />
            <p style={{ paddingTop: "10px" }}>Show activity</p>

          </div>
          <div className="sttngs-box">
            <FaKey className="setting-icon" size={40} />
            <p style={{ paddingTop: "10px" }}>Change Password</p>

          </div>
          <button className="button-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
