package services

import javax.inject._
import models.Friends
import repositories.FriendRepository
import models.UserDto
import repositories.UserRepository

@Singleton
class FriendsService @Inject() (userRepository: UserRepository, friendRepo: FriendRepository) {
  /**
  * Retrieves the list of friends for a given user ID.
  *
  * @param userId the ID of the user.
  * @return the list of friends if the user is found, or a RuntimeException if the user is not found.
  */
  def getFriendsList(userId: Long) = {
    userRepository.userExist(userId) match {
      case true => friendRepo.findFriendsByUserId(userId)
      case false => new RuntimeException("User not found with user id: "  + userId)
    }
  }
}
