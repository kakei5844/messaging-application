package repositories

import play.api.db.Database
import scala.collection.mutable.ListBuffer
import models.{ChatMessage, MessageRequest}
import javax.inject._
import java.sql.SQLException

import java.sql.{Connection, PreparedStatement, CallableStatement, Timestamp}
import java.util.Date
import models.ChatMessageDTO

@Singleton
class ChatMessageRepository @Inject() (db: Database) {
	/**
	* Retrieves chat messages by chat ID.
	*
	* @param chatId the ID of the chat.
	* @return the list of chat messages.
	* @throws SQLException if an SQL exception occurs.
	*/
	def getChatMessageByChatId(chatId: Long): List[ChatMessageDTO] = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT cm.message_id, cm.chat_id, u.user_id as sender_id, cm.content, cm.created_at, CONCAT(u.firstname, ' ', lastname) as sender_name FROM chat_message cm LEFT JOIN chat_participant cp ON cp.participant_id = cm.sender_participant_id LEFT JOIN users u ON u.user_id = cp.user_id WHERE cm.chat_id  = " + chatId;

			val resultSet = statement.executeQuery(query)

			val messages = new ListBuffer[ChatMessageDTO]()
			while (resultSet.next()) {                
				val message = ChatMessageDTO(
					resultSet.getLong("message_id"),
					resultSet.getLong("chat_id"),
					resultSet.getLong("sender_id"),
					resultSet.getString("content"),
					new Date(resultSet.getTimestamp("created_at").getTime),
					resultSet.getString("sender_name")
				)
				messages += message
			}
			messages.toList
		} catch {
			case sqlException: SQLException => Nil
			case e: Exception => Nil
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}

	/**
	* Posts a chat message.
	*
	* @param chat_id the ID of the chat.
	* @param sender_participant_id the ID of the sender participant.
	* @param content the content of the message.
	* @param created_at the creation date of the message.
	* @return true if the chat message is successfully posted, false otherwise.
	* @throws SQLException if an SQL exception occurs.
	*/
	def postChatMessage(chat_id: Long, sender_participant_id: Long, content: String, created_at: Date): Boolean = {
		var connection: java.sql.Connection = null
		var callableStatement: CallableStatement = null

		try {
			connection = db.getConnection()

			callableStatement = connection.prepareCall("{CALL insertMessage(?, ?, ?, ?)}")

			callableStatement.setLong(1, chat_id)
			callableStatement.setLong(2, sender_participant_id)
			callableStatement.setString(3, content)
			callableStatement.setTimestamp(4, new Timestamp(created_at.getTime))

			val rowsAffected = callableStatement.executeUpdate()

			rowsAffected > 0

		} catch {
			case sqlException: SQLException =>
				false
			case e: Exception => 
				false
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}
}