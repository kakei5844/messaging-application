package models

import java.util.Date

case class ChatMessage(
	message_id: Long,
	chat_id: Long,
	sender_id: Long,
	text: String,
	time: Date
)

case class ChatMessageDTO(
	message_id: Long,
	chat_id: Long,
	sender_id: Long,
	text: String,
	time: Date,
	sender_name: String
)