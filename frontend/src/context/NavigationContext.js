import { useState, createContext, useContext, useEffect } from "react";

const navigationContext = createContext();

/**
 * Provider component that wraps the navigation-related functionality and state.
 * @component
 * @param {object} children - The child components.
 */
export function NavigationProvider({ children }) {
  const [navagation, setNavagation] = useState("profile");

  /**
   * Changes the current navigation destination.
   * @param {string} destination - The destination to navigate to.
   */
  const navagate = (destination) => {
    setNavagation(destination);
  };

  const contextData = {
    navagation,
    navagate,
  };
  return (
    <navigationContext.Provider value={contextData}>
      {children}
    </navigationContext.Provider>
  );
}

/**
 * Custom hook that provides access to the navigation context.
 * @returns {object} The navigation context data.
 */
export function useNavigation() {
  return useContext(navigationContext);
}
