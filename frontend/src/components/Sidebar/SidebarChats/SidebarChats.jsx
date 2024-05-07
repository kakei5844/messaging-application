import { useState, createContext, useContext, useEffect } from 'react';
import "./SidebarChats.css";
import axios from "axios";
import { useChat } from '../../../context/ChatContext'
import { useUser } from "../../../context/UserContext";
import { useNavigation } from '../../../context/NavigationContext';

/**
 * Component that represents a chat item in the sidebar.
 * Displays the chat avatar, name, and notification count.
 * @param {Object} chat - The chat object containing chat details.
 * @param {Object} notify - The notification object containing the notification count.
 */
export default function SideBarChats({ chat, notify }) {
  const { changeCurrentActiveChat, currentActiveChat, resetChatNotif } = useChat();
  const [isActiveChat, setIsActiveChat] = useState(false);
  const { navagate } = useNavigation();
  const User = useUser();

  useEffect(() => {
    setIsActiveChat(currentActiveChat.chat_id === chat.chat_id);
  }, [currentActiveChat, chat.chat_id]);

  return (
    <div
      className={`d-flex align-items-center my-1 side-bar-chat ${isActiveChat ? 'active-chat' : ''}`}
      onClick={() => {
        changeCurrentActiveChat(chat);
        navagate("chat")
        resetChatNotif(currentActiveChat)
      }}
    >
      <div className="chat-table-cell-avatar" >
        <div className="chat-avatar"
          id='ProfileCircle'
        // style={{
        //   backgroundColor: getRandomColor(),
        //   color: getRandomTextColor(getRandomColor()),
        // }}
        >
          {chat.initials}</div>
      </div>
      <div
        className="d-flex align-items-center justify-content-center chat-name"
      >
        {chat.name}
      </div>

      <div>
        {notify.counter > 0 ?
          <span id='notif' class="badge-light">{notify.counter}</span>
          :
          <div></div>}
      </div>
    </div >
  );
}
