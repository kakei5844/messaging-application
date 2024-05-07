import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext"; // Assuming you have a UserContext

const friendsContext = createContext();

/**
 * Provider component that wraps the friends-related functionality and state.
 * @component
 * @param {object} children - The child components.
 */
export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [friendCount, setFriendCount] = useState(0);
  const { user } = useUser(); // Get the user object from UserContext

  useEffect(() => {
    if (user) fetchFriends(user.user_id); // Pass the user's ID to the fetchFriends function
  }, [user]);

  /**
   * Fetches the friends list for the specified user ID.
   * @param {string} userId - The ID of the user.
   */
  const fetchFriends = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/friends/${userId}`
      );
      setFriends(response.data);
      setFriendCount(response.data.length);
      //console.log("friends:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    friends,
    friendCount,
  };

  return (
    <friendsContext.Provider value={contextData}>
      {children}
    </friendsContext.Provider>
  );
}

/**
 * Custom hook that provides access to the friends context.
 * @returns {object} The friends context data.
 */
export function useFriends() {
  return useContext(friendsContext);
}
