import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

/**
 * Provider component that wraps the user-related functionality and state.
 * @component
 * @param {object} children - The child components.
 */
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  /**
   * Retrieves the user object from local storage.
   * @returns {object|null} The user object or null if not found.
   */
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  /**
   * Checks if a user is authenticated.
   * @returns {boolean} True if the user is authenticated, false otherwise.
   */
  const userIsAuthenticated = () => {
    return localStorage.getItem("user") !== null;
  };

  /**
   * Logs in the user by storing the user object in local storage.
   * @param {object} user - The user object to store.
   */
  const userLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  /**
   * Logs out the user by removing the user object from local storage.
   */
  const userLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextData = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

export default UserContext;

/**
 * Custom hook that provides access to the user context.
 * @returns {object} The user context data.
 */
export function useUser() {
  return useContext(UserContext);
}

export { UserProvider };
