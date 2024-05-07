import React, { useEffect, useState } from "react";
import { useChat } from '../../context/ChatContext';
import "./Chat.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { postMessage } from "../../services/chatService";
import ChatMessages from "./ChatMessages/ChatMessages";

/**
 * Represents the chat component.
 * @returns {JSX.Element} The rendered chat component.
 */
export default function Chat() {
  const { socket, message, setMessage, chatLog, setChatLog, sendMessage, currentActiveChat, recieveChatlog, connectToChatRoom, chatList } = useChat();
  const [messages, setMessages] = useState([]);
  const User = useUser();

  useEffect(() => {
    if (User && currentActiveChat) {
      connectToChatRoom(currentActiveChat.chat_id, User.user.user_id);
    }
  }, [currentActiveChat, User]);

  useEffect(() => {
    //console.log("chatLog", chatLog)
  }, [chatLog]);

  useEffect(() => {
    if (currentActiveChat) {
      /**
       * Fetches the chat messages for the current active chat.
       * @returns {Promise<void>}
       */
      const fetchMessagesData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/chatmessage/${currentActiveChat.chat_id}`);
          recieveChatlog(response.data);
          //console.log(response.data);
          scrollToBottom(); // Scroll to bottom after fetching messages
        } catch (error) {
          console.error(error);
        }
      };

      fetchMessagesData();
    }
  }, [currentActiveChat]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  /**
   * Scrolls to the bottom of the message list.
   */
  const scrollToBottom = () => {
    const messageList = document.getElementById("messageList");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };

  /**
   * Sends the chat message.
   */
  const send = () => {
    console.log("chatList send", chatList)

    if (currentActiveChat) {
      sendMessage(currentActiveChat.chat_id, User.user);
      // postMessage(currentActiveChat, User.user.user_id, message);
    }

  }

  /**
   * Handles the key press event.
   * @param {React.KeyboardEvent} e - The key press event.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  /**
   * Retrieves the chat name.
   * @returns {string} The chat name.
   */
  const getChatName = () => {
    if (currentActiveChat) {
      return currentActiveChat.initials
    }
  }

  /**
   * Retrieves the chat user name.
   * @returns {string} The chat user name.
   */
  const getChatUserName = () => {
    if (currentActiveChat) {
      return currentActiveChat.name
    }
  }

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div className="chat-container p-0 rounded">
        <div className="chatroom-header" style={{}}>
          <div className="friends-table-cell-avatar" style={{ paddingTop: "5px", paddingLeft: "0px" }}>
            <div className="friends-avatar" id="UserProfileCircle">
              {getChatName()}</div>
          </div>
          <div className="chatroom-name">{getChatUserName()}</div>
        </div>

        <ChatMessages chatLog={chatLog} activeChat={currentActiveChat} />

        <div
          className="input-area"
          style={{
            height: "100px",
            padding: "10px",
            borderTop: "1px solid lightgray",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press
            placeholder="Enter your message"
            style={{
              width: "80%",
              height: "50px",
              padding: "15px",
              borderRadius: "5px",
              border: "var(--chat-input-border)",
              background: "var(--chat-input-background)",
              color: "var(--chat-input-color)",
            }}
          >

          </input>
          <button className="btn btn-primary" id="sendButton" onClick={send}>Send</button>


        </div>
      </div>
    </div>

  );
}
