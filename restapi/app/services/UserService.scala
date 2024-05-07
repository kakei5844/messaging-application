package services

import javax.inject._
import models.User
import repositories.UserRepository

@Singleton
class UserService @Inject() (userRepo: UserRepository) {

  /**
  * Performs a login operation for a user with the given username and password.
  *
  * @param username the username of the user.
  * @param password the password of the user.
  * @return the user if the login is successful, or null if the login fails.
  */
  def login(username: String, password: String): Option[User] = {
    userRepo.userLogin(username, password)
  }

  /**
  * Retrieves a user by ID.
  *
  * @param id the ID of the user.
  * @return the user if found, or null if the user is not found.
  */
  def findById(id: Long): Option[User] = {
    userRepo.findById(id)
  }

}
