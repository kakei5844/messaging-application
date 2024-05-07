import React from 'react'
import "./ChatMessages.css";

/**
 * Renders a group chat message received by the user.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The group chat message object.
 * @param {Function} props.convertTime - The function to convert the message timestamp to a formatted time string.
 * @returns {JSX.Element} The rendered group received chat message component.
 */
function GroupReceivedChatMessage({ message, convertTime }) {
  return (
    <div className="message received-message">
      <div className="chatroom-table-cell-avatar">
        <div className="chatroom-avatar" id="UserProfileCircle">
          {message.sender_name
            .split(' ')
            .map(word => word[0])
            .join('')}
        </div>
      </div>
      <div className="message-text">{message.text}</div>
      <div className="message-time">{convertTime(message.time)}</div>
    </div>
  )
}

export default GroupReceivedChatMessage