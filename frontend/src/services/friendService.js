import axios from "axios";

const BASE_URL = "http://localhost:9000";

/**
 * Fetches the friend list associated with a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} A promise that resolves to the friend list data.
 */
export const fetchFriendList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/friends/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
