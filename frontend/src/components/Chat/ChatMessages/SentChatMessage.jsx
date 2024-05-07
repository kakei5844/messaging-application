import React from 'react'
import "./ChatMessages.css";

/**
 * Renders a chat message sent by the user.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The chat message object.
 * @param {Function} props.convertTime - The function to convert the message timestamp to a formatted time string.
 * @returns {JSX.Element} The rendered sent chat message component.
 */
function SentChatMessage({ message, convertTime }) {
  return (
    <div className="message sent-message">
      <div className="message-text">{message.text}</div>
      <div className="message-time">{convertTime(message.time)}</div>
    </div>
  )
}

export default SentChatMessage