import { useState, createContext, useContext, useEffect } from "react";

const SettingContext = createContext();

/**
 * Provider component that wraps the settings-related functionality and state.
 * @component
 * @param {object} children - The child components.
 */
function SettingProvider({ children }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light";
    if (storedTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  useEffect(() => {
    setBodyAttribute(theme);
  }, [theme]);

  /**
   * Sets the `data-theme` attribute of the body element.
   * @param {string} theme - The theme to apply.
   */
  const setBodyAttribute = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
  };

  /**
   * Sets the dark mode theme and updates the stored theme in localStorage.
   */
  const setDarkMode = () => {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  /**
   * Sets the light mode theme and updates the stored theme in localStorage.
   */
  const setLightMode = () => {
    localStorage.setItem("theme", "light");
    setTheme("light");
  };

  const contextData = {
    theme,
    setDarkMode,
    setLightMode,
  };

  return (
    <SettingContext.Provider value={contextData}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext;

/**
 * Custom hook that provides access to the settings context.
 * @returns {object} The settings context data.
 */
export function useSetting() {
  return useContext(SettingContext);
}

export { SettingProvider };
