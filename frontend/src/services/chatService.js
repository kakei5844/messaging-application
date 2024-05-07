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
 * Posts a chat message.
 * @param {string} chat_id - The ID of the chat.
 * @param {string} sender_id - The ID of the message sender.
 * @param {string} text - The message text.
 * @param {number} time - The timestamp of the message.
 * @returns {Promise<object>} A promise that resolves to the posted message data.
 */
export const postMessage = async (chat_id, sender_id, text, time) => {
  // const time = Date.now();

  try {
    // console.log(chat_id, sender_participant_Id, text, time);
    const response = await axios.post(`${BASE_URL}/chatmessage/post`, {
      chat_id,
      sender_id,
      text,
      time,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
