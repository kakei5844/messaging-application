package repositories

import play.api.db.Database
import scala.collection.mutable.ListBuffer
import models.{ Chat, ChatDto }
import enums.ChatType
import javax.inject._
import java.sql.SQLException

import java.sql.Timestamp
import java.util.Date

@Singleton
class ChatRepository @Inject() (db: Database) {
	/**
	* Retrieves a chat by its ID.
	*
	* @param chatId the ID of the chat to retrieve.
	* @return the chat with the specified ID, or null if not found.
	* @throws SQLException if there is an error retrieving the chat from the database.
	* @throws RuntimeException if there is an error retrieving the chat.
	*/
	def getChat(chatId: Long): Chat = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT * FROM chat WHERE chat_id = " + chatId

			val resultSet = statement.executeQuery(query)
			if (resultSet.next()) {
				val chat = Chat(
					resultSet.getLong("chat_id"),
					ChatType.fromString(resultSet.getString("chat_type")),
					resultSet.getString("name")
				)
				chat
			} else {
				null
			}
		} catch {
				case sqlException: SQLException => throw new SQLException("Error retrieving chat from the database", sqlException)
				case e: Exception => throw new RuntimeException("Error retrieving chat", e)
		} finally {
				if (connection != null) try { connection.close() } catch { case e: Exception => println(e.getMessage()) }
		}
	}

	/**
	* Checks if a chat exists with the specified ID.
	*
	* @param id the ID of the chat to check.
	* @return true if the chat exists, false otherwise.
	*/
	def chatExist(id: Long): Boolean = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT * FROM chat WHERE chat_id = " + id

			val resultset = statement.executeQuery(query)
			if(resultset.next()) true
			else false
		} catch {
			case sqlException: SQLException => false
			case e: Exception => false
		} finally {
			if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
		}
	}

	/**
	* Finds a list of chats associated with the specified user ID.
	*
	* @param userId the ID of the user.
	* @return a list of ChatDto objects representing the chats.
	* @throws SQLException if there is an error retrieving the chats from the database.
	* @throws RuntimeException if there is an error retrieving the chats.
	*/
	def findChatsByUserId(userId: Long): List[ChatDto] = {
		var connection: java.sql.Connection = null
		try {
			connection = db.getConnection()

			val statement = connection.createStatement
			val query = "SELECT DISTINCT c.chat_id, c.chat_type, COALESCE(c.name, u_names.other_participants) AS name, cp.user_id, MAX(cm.created_at) AS latest_created_at, CONCAT_WS(', ', u_names.other_participants) AS other_participants, GROUP_CONCAT(DISTINCT u_names.initials SEPARATOR ', ') AS initials FROM chat c LEFT JOIN chat_participant cp ON c.chat_id = cp.chat_id LEFT JOIN chat_message cm ON c.chat_id = cm.chat_id LEFT JOIN ( SELECT cp.chat_id, GROUP_CONCAT(CONCAT(u.firstname, ' ', u.lastname)) AS other_participants, GROUP_CONCAT(DISTINCT CASE WHEN c.chat_type = 'Group' THEN SUBSTRING(c.name, 1, 1) ELSE u.initials END ) AS initials FROM chat_participant cp LEFT JOIN users u ON cp.user_id = u.user_id LEFT JOIN chat c ON cp.chat_id = c.chat_id WHERE cp.user_id != " + userId + " GROUP BY cp.chat_id ) AS u_names ON c.chat_id = u_names.chat_id WHERE cp.chat_id IN ( SELECT chat_id FROM chat_participant WHERE user_id = " + userId + " ) AND cp.user_id != " + userId + " GROUP BY c.chat_id, c.chat_type, c.name, cp.user_id ORDER BY latest_created_at DESC;"

			val resultset = statement.executeQuery(query)

			val chatList = new ListBuffer[ChatDto]()
			while (resultset.next()) {
				// get latest message date
				val latestCreatedAt = Option(resultset.getTimestamp("latest_created_at"))
					.map(timestamp => new Date(timestamp.getTime))
					.getOrElse(new Date(1640908800000L))

				// check if chat is already in chatList
				val chatId = resultset.getLong("chat_id")
				chatList.find(chat => chat.chat_id == chatId) match {
					
					case Some(x) => {
						// append user_id to existing chat
						chatList += ChatDto(
						chatId,
						List(resultset.getLong("user_id")) ++ x.user_ids,
						ChatType.fromString(resultset.getString("chat_type")),
						resultset.getString("name"),
						x.latest_created_at,
						resultset.getString("other_participants"),
						resultset.getString("initials")
					)
						// remove original chat
						chatList -= x
					}
					case None => chatList += ChatDto(
					resultset.getLong("chat_id"),
					List(resultset.getLong("user_id")),
					ChatType.fromString(resultset.getString("chat_type")),
					resultset.getString("name"),
					latestCreatedAt,
					resultset.getString("other_participants"),
					resultset.getString("initials")
				)
				}
				
			}
			
			chatList.toList

		} catch {
			case sqlException: SQLException => Nil
			case e: Exception => Nil
		} finally {
			if (connection != null) try { connection.close() } catch { case e: Exception => println(e.getMessage()) }
		}
	}
}