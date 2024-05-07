import axios from "axios";

const BASE_URL = "http://localhost:9000";

/**
 * Fetches a chat by its ID.
 * @param {string} chatId - The ID of the chat to fetch.
 * @returns {Promise<object>} A promise that resolves to the chat data.
 */
export const fetchChat = async (chatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches the list of chats associated with a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} A promise that resolves to the list of chat data.
 */
export const fetchChatList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/list/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves the chat participant by chat ID.
 * @param {string} chatId - The ID of the chat.
 * @returns {Promise<object>} A promise that resolves to the chat participant data.
 * @throws {Error} If there was an error retrieving the chat participant.
 */
export const getChatParticipantByChatId = async (chatId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chatparticipant/chat/${chatId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat participant by chat ID:", error);
    throw error;
  }
};

/**
 * Retrieves the chat participant by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object>} A promise that resolves to the chat participant data.
 * @throws {Error} If there was an error retrieving the chat participant.
 */
export const getChatParticipantByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chatparticipant/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat participant by user ID:", error);
    throw error;
  }
};

/**
 * Retrieves the chat message by chat ID.
 * @param {string} chatId - The ID of the chat.
 * @returns {Promise<object>} A promise that resolves to the chat message data.
 * @throws {Error} If there was an error retrieving the chat message.
 */
export const getChatMessageByChatId = async (chatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chatmessage/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat message by chat ID:", error);
    throw error;
  }
};
