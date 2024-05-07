import React from "react";
import "./FriendsTable.css";
import { FaRegCommentAlt } from 'react-icons/fa';
import { useFriends } from '../../../context/FriendsContext';
import { useChat } from '../../../context/ChatContext'
import { useNavigation } from '../../../context/NavigationContext';

/**
 * Component that renders a table of friends.
 */
const FriendsTable = () => {
  const { currentActiveChat, changeCurrentActiveChat, chatList } = useChat();
  const { navagation, navagate } = useNavigation();

  const { friends } = useFriends();
  // const friends = [
  //   { id: 1, initials: "JD", name: "John Doe" },
  //   { id: 2, initials: "JS", name: "Jane Smith" },
  //   { id: 3, initials: "AM", name: "Alex Martin" },
  //   { id: 4, initials: "ES", name: "Emily Summers" },
  // ];

  /**
   * Callback function that handles editing the current active chat.
   * @param {number} friendId - The ID of the friend to initiate a chat with.
   */
  const editCurrentActiveChat = (friendId) => {
    navagate("chat");
    console.log("chatlist:", chatList, "friendId:", friendId);
    const chat = chatList.find(chat =>
      chat.user_ids.length === 1 && chat.user_ids[0] === friendId
    );
    console.log("chat:", chat);
    changeCurrentActiveChat(chat);
  }

  return (friends &&
    <div className="friends-table-container" style={{ overflow: "auto", height: "calc(100vh - 150px)", }}>
      <div className="friends-table-header">
        All Friends: {friends.length}
      </div>
      <table className="friends-table">
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id} className="friends-table-row">
              <td className="friends-table-cell-avatar">
                <div className="friends-avatar" id="UserProfileCircle">
                  {friend.initials}</div>
              </td>
              <td className="friends-table-cell-name">{friend.firstname} {friend.lastname}</td>
              <td className="friends-table-cell-action">
                <button className="friends-message-button" onClick={() => editCurrentActiveChat(friend.user_id)}>
                  <FaRegCommentAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendsTable;
