package repositories

import play.api.db.Database
import scala.collection.mutable.ListBuffer
import models.User
import javax.inject._
import java.sql.SQLException

@Singleton
class UserRepository @Inject() (db: Database) {
  /**
  * Retrieves a user by ID.
  *
  * @param id the ID of the user.
  * @return the user if found, or null if the user is not found or an exception occurs.
  */
  def findById(id: Long): Option[User] = {
    var connection: java.sql.Connection = null
    try {
      connection = db.getConnection()

      val statement = connection.createStatement
      val query = "SELECT * FROM users WHERE user_id = " + id

      val resultset = statement.executeQuery(query)
      if(resultset.next()) 
        Some(User(
          resultset.getLong("user_id"), 
          resultset.getString("email"), 
          resultset.getString("username"), 
          resultset.getString("firstname"),
          resultset.getString("lastname"),
          resultset.getString("initials"),
          resultset.getString("password")
        ))
      else None
    } catch {
      case sqlException: SQLException => None
      case e: Exception => None
    } finally {
      if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
    }

  }
  
  /**
  * Checks if a user with the given ID exists in the database.
  *
  * @param id the ID of the user.
  * @return true if the user exists, false otherwise or if an exception occurs.
  */
  def userExist(id: Long): Boolean = {
    var connection: java.sql.Connection = null
    try {
      connection = db.getConnection()

      val statement = connection.createStatement
      val query = "SELECT * FROM users WHERE user_id = " + id

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
  * Performs a login operation for a user with the given username and password.
  *
  * @param username the username of the user.
  * @param password the password of the user.
  * @return the user if the login is successful, or null if the login fails or an exception occurs.
  */
  def userLogin(username: String, password: String): Option[User] = {
    var connection: java.sql.Connection = null
      try {
        connection = db.getConnection()

        val statement = connection.createStatement
        val query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"

        val resultset = statement.executeQuery(query)
        if(resultset.next()){ 
          Some(User(
            resultset.getLong("user_id"), 
            resultset.getString("email"), 
            resultset.getString("username"), 
            resultset.getString("firstname"),
            resultset.getString("lastname"),
            resultset.getString("initials"),
            resultset.getString("password")
          ))
        }
        else None
      } catch {
        case sqlException: SQLException => None
        case e: Exception => None
      } finally {
        if (connection != null) try {connection.close()} catch {case e: Exception => println(e.getMessage())}
      }
  }

}

