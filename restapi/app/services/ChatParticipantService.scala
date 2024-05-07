package services

import javax.inject._
import models.ChatParticipant
import repositories.{ChatParticipantRepository, UserRepository, ChatRepository}


@Singleton
class ChatParticipantService @Inject() (userRepository: UserRepository,	chatParticipantRepository: ChatParticipantRepository, chatRepository: ChatRepository) {
	/**
	* Retrieves chat participants by user ID.
	*
	* @param userId the ID of the user.
	* @return the chat participants if the user exists, or throws a RuntimeException if the user is not found.
	*/
	def getParticipiantByUserId(userId: Long) = {
		userRepository.userExist(userId) match {
			case true => chatParticipantRepository.getParticipiantByUserId(userId)
			case false => new RuntimeException("User not found with user id: "  + userId)
		}
	}

	/**
	* Retrieves chat participants by chat ID.
	*
	* @param chatId the ID of the chat.
	* @return the chat participants if the chat exists, or throws a RuntimeException if the chat is not found.
	*/
	def getParticipiantByChatId(chatId: Long) = {
		chatRepository.chatExist(chatId) match {
			case true => chatParticipantRepository.getParticipiantByChatId(chatId)
      case false => new RuntimeException("Chat not found with chat id: "  + chatId)
		}
	}
}
