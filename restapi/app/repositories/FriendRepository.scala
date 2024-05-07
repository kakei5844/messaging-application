package repositories

import play.api.db.Database
import scala.collection.mutable.ListBuffer
import models.UserDto
import javax.inject._
import java.sql.SQLException

@Singleton
class FriendRepository @Inject() (db: Database) {
  /**
  * Retrieves the list of friends for a given user ID.
  *
  * @param userId the ID of the user.
  * @return the list of friends for the given user ID, or an empty list if an exception occurs.
  */
  def findFriendsByUserId(userId: Long): List[UserDto] = {
    var connection: java.sql.Connection = null
    try {
      connection = db.getConnection()

      val statement = connection.createStatement
      val query = "SELECT * FROM users WHERE user_id IN (SELECT friend_user_id FROM friends WHERE user_id = " + userId + ")"

      val resultset = statement.executeQuery(query)
      val friendsList = new ListBuffer[UserDto]()
      while(resultset.next()) {
        friendsList += UserDto(
          resultset.getLong("user_id"), 
          resultset.getString("email"), 
          resultset.getString("username"), 
          resultset.getString("firstname"),
          resultset.getString("lastname"),
          resultset.getString("initials")
        )
      }
      friendsList.toList
    } catch {
      case sqlException: SQLException => Nil
      case e: Exception => Nil
    } finally {
      if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
    }
  }

}
