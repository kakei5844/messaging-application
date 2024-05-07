package services

import javax.inject._
import models.Chat
import repositories.{ChatRepository,UserRepository}
import enums.DIRECT


@Singleton
class ChatService @Inject() (userRepository: UserRepository, chatRepository: ChatRepository) {
	/**
	* Retrieves a chat by its ID.
	*
	* @param chatId the ID of the chat to retrieve.
	* @return the chat with the specified ID.
	*/
	def getChat(chatId: Long) = {
		chatRepository.getChat(chatId)
	}

	/**
	* Retrieves a list of chats belonging to the specified user.
	*
	* @param userId the ID of the user.
	* @return a list of chats associated with the user.
	* @throws RuntimeException if the user is not found.
	*/
	def getChatListById(userId: Long) = {
		userRepository.userExist(userId) match {
			case true => chatRepository.findChatsByUserId(userId)
			case false => new RuntimeException("User not found with user id: "  + userId)
		}
	}
}
