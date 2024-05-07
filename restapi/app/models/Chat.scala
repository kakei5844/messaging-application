package models

import enums.ChatType
import java.util.Date

case class Chat(
  chat_id: Long,
  chat_type: ChatType,
  name: String
)

case class ChatDto(
  chat_id: Long,
  user_ids: List[Long],
  chat_type: ChatType,
  name: String,
  latest_created_at: Date,
  other_participant: String,
  initials: String
)