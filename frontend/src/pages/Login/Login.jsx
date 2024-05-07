
import "./Login.css";
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userService";
import { useUser } from "../../context/UserContext";
import logo from "../../assets/smileyLogo.png";
import { useNavigation } from "../../context/NavigationContext";

/**
 * Component that represents the login page.
 */
const Login = () => {
  const User = useUser()
  const isLoggedIn = User.userIsAuthenticated()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const { navagate } = useNavigation();

  /**
   * Checks if the username and password fields are filled.
   * @returns {boolean} Returns true if both fields are filled; false otherwise.
   */
  const formValidation = () => {
    // Check all inputs
    if (!username || !password) {
      // setErrorMessage("Please provide username and password")
      return false;
    }
    return true;
  };

  /**
   * Handles the form submission.
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    try {
      const response = await loginUser(username, password)
      const { user_id, email, firstname, lastname, initials } = response
      const authdata = window.btoa(username + ':' + password)
      const authenticatedUser = { user_id, email, username, firstname, lastname, initials, authdata }

      User.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')

    } catch (error) {
      // handleLogError(error)
      setErrorMessage(error.response.data)
    }
  };

  /**
   * Redirects the user to the profile page if already logged in.
   */
  if (isLoggedIn) {
    navagate("profile")
    return <Navigate to={'/'} />
  }

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" style={{ height: "70px", width: "auto" }} />
          <span className="logo-text">Fluent Dialogue Messenger</span>
        </div>
        <div className="login-box">
          <h2 className="title">Login to use FDM!</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button-container">
              <button className="button" type="submit">Login</button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
export default Login;
