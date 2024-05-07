import axios from "axios";

const BASE_URL = "http://localhost:9000";

/**
 * Fetches a user by their ID.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to the user data.
 */
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Logs in a user with the provided username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A promise that resolves to the logged-in user data.
 * @throws {Error} If there was an error logging in the user.
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    const user = response.data;

    console.log("userservice login", user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieves the logged-in user from local storage.
 * @returns {object|null} The logged-in user data, or null if not found.
 */
export const getLoggedInUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

/**
 * Logs out the user by removing the user data from local storage.
 */
export const logoutUser = () => {
  localStorage.removeItem("user");
};
