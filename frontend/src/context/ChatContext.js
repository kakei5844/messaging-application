import { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { postMessage } from "../services/chatService";
import { useUser } from "./UserContext";

import messageSound from "../assets/Notification.mp3";
const chatContext = createContext();

/**
 * Provider component that wraps the chat-related functionality and state.
 * @param {object} children - The child components.
 */
export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [chatNotifs, setChatNotifs] = useState([]);
  const [currentActiveChat, setCurrentActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]);
  const User = useUser();

  /**
   * Connects to the personal channel for the logged-in user.
   * @param {object} user - The user object.
   */
  const connectPersonalChannel = (user) => {
    //console.log("User.user:",user)
    if (!socket) {
      const { user_id, firstname, lastname, username } = user;

      // use locally hosted websocket server for public git repository
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: user_id,
          userName: username,
          firstname: firstname,
          lastname: lastname,
        },
      });

      newSocket.on("connect", () => {
        console.log("User_id:", user_id, " connected to Socket");
      });

      //console.log("Connected to personal channel");
      setSocket(newSocket);
    }
  };

  /**
   * Connects to the chat room with the specified chat ID and user ID.
   * @param {string} chat_id - The ID of the chat room.
   * @param {string} user_id - The ID of the user.
   */
  const connectToChatRoom = (chat_id, user_id) => {
    console.log("attempting to join room:", chat_id);
    joinChatRoom(chat_id, user_id); // Join the chat room when connected
    console.log("Connected to channel:", chat_id);
  };

  useEffect(() => {
    if (!socket) return; // Check if socket is null

    const handleChatMessage = (data) => {
      console.log("recieved message:", data);
      const { roomId, sender, message, sentTime, sender_name } = data;
      console.log(User.user.user_id);

      postMessage(roomId, sender, message, sentTime);

      if (sender !== User.user.user_id) {
        const sound = new Audio(messageSound);
        sound.play();

        console.log("chatNotifs", chatNotifs);

        const updatedNotif = chatNotifs.map((notif) => {
          if (notif.chat_id === roomId) {
            return { ...notif, counter: notif.counter + 1 };
          }
          return notif;
        });

        console.log("updatedNotif:", updatedNotif);
        setChatNotifs(updatedNotif);
      }

      try {
        const mappedObject = {
          message_id: null,
          chat_id: roomId,
          sender_participant_id: sender,
          text: message,
          time: sentTime,
          sender_name: sender_name,
        };
        setChatLog((prevChatLog) => [...prevChatLog, mappedObject]);
      } catch (error) {
        console.log("Received non-JSON message:", data);
      }
    };

    socket.on("chat message", handleChatMessage);

    // Clean up event listeners when component unmounts or socket changes
    return () => {
      console.log("Socket is unmounted"); // Log when the socket is unmounted
      socket.off("chat message", handleChatMessage);
    };
  }, [socket, chatNotifs]);

  /**
   * Joins the chat room with the specified chat ID and user ID.
   * @param {string} chatId - The ID of the chat room.
   * @param {string} userId - The ID of the user.
   */
  const joinChatRoom = (chatId, userId) => {
    if (socket) {
      socket.emit("joinRoom", chatId, userId);
    }
  };

  /**
   * Sends a chat message to the specified chat room.
   * @param {string} chat_id - The ID of the chat room.
   * @param {object} user - The user object.
   */
  const sendMessage = (chat_id, user) => {
    console.log("userId:", user, " activeChatId:", chat_id);
    if (socket && socket.connected && message.trim() !== "") {
      console.log("send" + user.firstname);
      const currentTime = Date.now(); // Get current local time
      const data = {
        roomId: chat_id,
        sender: user.user_id,
        message: message.trim(),
        sentTime: currentTime,
        sender_name: user.firstname + user.lastname,
      };
      socket.emit("chat message", data);
      setMessage("");
    }
  };

  /**
   * Changes the current active chat to the specified chat.
   * @param {object} chat - The chat object.
   */
  const changeCurrentActiveChat = (chat) => {
    setCurrentActiveChat(chat);
  };

  /**
   * Receives the chat log for the specified chat room.
   * @param {array} chatlog - The chat log data.
   */
  const recieveChatlog = (chatlog) => {
    setChatLog(chatlog);
  };

  /**
   * Updates the chat list with the provided data and adds notification counters for each chat.
   * @param {array} data - The chat list data.
   */
  const updateChatList = (data) => {
    setChatList(data);

    //adding notif counter for each chat
    const mappedChats = data.map((chat) => {
      return { chat_id: chat.chat_id, counter: 0 };
    });

    //console.log("mappedChats:",mappedChats);
    setChatNotifs(mappedChats);
    //console.log("chatNotifs:",chatNotifs)
  };

  /**
   * Resets the notification counter for the specified chat.
   * @param {object} chat - The chat object.
   */
  const resetChatNotif = (chat) => {
    console.log("chatId:", chat);
    console.log("chatNotifs:", chatNotifs);

    const ResetNotif = chatNotifs.map((notif) => {
      if (notif.chat_id === chat.chat_id) {
        return { ...notif, counter: (notif.counter = 0) };
      }
      return notif;
    });
  };

  const contextData = {
    socket,
    connectPersonalChannel,
    connectToChatRoom,
    message,
    setMessage,
    chatLog,
    sendMessage,
    joinChatRoom,
    currentActiveChat,
    changeCurrentActiveChat,
    recieveChatlog,
    chatList,
    updateChatList,
    chatNotifs,
    resetChatNotif,
  };
  return (
    <chatContext.Provider value={contextData}>{children}</chatContext.Provider>
  );
}

/**
 * Custom hook that provides access to the chat context.
 * @returns {object} The chat context data.
 */
export function useChat() {
  return useContext(chatContext);
}
