package repositories

import play.api.db.Database
import scala.collection.mutable.ListBuffer
import models.ChatParticipant
import javax.inject._
import java.sql.SQLException

@Singleton
class ChatParticipantRepository @Inject() (db: Database) {
	/**
	* Retrieves chat participants by chat ID.
	*
	* @param chatId the ID of the chat.
	* @return a list of chat participants for the given chat ID, or an empty list if an exception occurs.
	*/
	def getParticipiantByChatId(chatId: Long): List[ChatParticipant] = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT * FROM chat_participant WHERE chat_id  = " + chatId

			val resultSet = statement.executeQuery(query)
			val participants = new ListBuffer[ChatParticipant]()
			while (resultSet.next()) {
				val participant = ChatParticipant(
					resultSet.getLong("participant_id"),
					resultSet.getLong("user_id"),
					resultSet.getLong("chat_id"),
					resultSet.getLong("last_seen_message_id")
				)
				participants += participant
			}
			participants.toList
		} catch {
			case sqlException: SQLException => Nil
			case e: Exception => Nil
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}

	/**
	* Retrieves chat participants by user ID.
	*
	* @param userId the ID of the user.
	* @return a list of chat participants for the given user ID, or an empty list if an exception occurs.
	*/
	def getParticipiantByUserId(userId: Long): List[ChatParticipant] = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT * FROM chat_participant WHERE user_id  = " + userId

			val resultSet = statement.executeQuery(query)
			val participants = new ListBuffer[ChatParticipant]()
			while (resultSet.next()) {
				val participant = ChatParticipant(
					resultSet.getLong("participant_id"),
					resultSet.getLong("user_id"),
					resultSet.getLong("chat_id"),
					resultSet.getLong("last_seen_message_id")
				)
				participants += participant
			}
			participants.toList
		} catch {
			case sqlException: SQLException => Nil
			case e: Exception => Nil
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}

	/**
	* Retrieves the participant ID by user ID and chat ID.
	*
	* @param userId the ID of the user.
	* @param chatId the ID of the chat.
	* @return the participant ID if found, or -1 if not found or an exception occurs.
	*/
	def getParticipiantByUserIdAndChatId(userId: Long, chatId: Long): Long = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT participant_id FROM chat_participant WHERE user_id  = " + userId + " AND chat_id = " + chatId

			val resultSet = statement.executeQuery(query)
			if (resultSet.next()) {
				resultSet.getLong("participant_id")
			} else {
				-1
			}
		} catch {
			case sqlException: SQLException => -1
			case e: Exception => -1
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}
}

