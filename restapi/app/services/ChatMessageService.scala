package services

import javax.inject._
import models.{ChatMessage, MessageRequest}
import repositories.{ChatMessageRepository, ChatRepository, ChatParticipantRepository}

@Singleton
class ChatMessageService @Inject() (chatRepository: ChatRepository, chatMessageRepository: ChatMessageRepository, chatParticipantRepository: ChatParticipantRepository) {
    /**
    * Retrieves chat messages by chat ID.
    *
    * @param chatId the ID of the chat.
    * @return the chat messages.
    * @throws RuntimeException if the chat with the given ID is not found.
    */
    def getChatMessageByChatId(chatId: Long) = {
      chatRepository.chatExist(chatId) match {
        case true => chatMessageRepository.getChatMessageByChatId(chatId)
        case false => new RuntimeException("Chat not found with chat id: "  + chatId)
      }
    }

    /**
    * Posts a chat message.
    *
    * @param messageRequest the message request containing the necessary information.
    * @return true if the chat message is successfully posted, false otherwise.
    */
    def postChatMessage(messageRequest: MessageRequest): Boolean = {
      val senderParticipantId = chatParticipantRepository.getParticipiantByUserIdAndChatId(messageRequest.sender_id, messageRequest.chat_id)
      chatMessageRepository.postChatMessage(messageRequest.chat_id, senderParticipantId, messageRequest.text, messageRequest.time)
    }

}