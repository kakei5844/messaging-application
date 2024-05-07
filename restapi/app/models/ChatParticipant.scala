package models

case class ChatParticipant(
  participant_id: Long, 
  user_id: Long, 
  chat_id: Long, 
  last_seen_message_id: Long
)