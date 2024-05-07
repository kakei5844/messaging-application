package controllers

import javax.inject._
import models.UserDto
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import services.FriendsService
import play.api.libs.json.OFormat

import javax.inject.Inject
import scala.reflect.runtime.universe.Try

@Singleton
class FriendsController @Inject() (val controllerComponents: ControllerComponents, friendsService: FriendsService) extends BaseController {
  implicit val userDtoFormat: OFormat[UserDto] = Json.format[UserDto]
  
  /**
  * Retrieves the friends list for a given user ID.
  *
  * @param id the ID of the user.
  * @return the friends list as JSON if successful, or a 404 Not Found response with an error message if an exception occurs.
  */
  def getFriends(id: Long) = Action {
    friendsService.getFriendsList(id) match {
      case friends: List[_] => Ok(Json.toJson(friends.asInstanceOf[List[UserDto]]))
      case e: RuntimeException => NotFound(e.getMessage())
    }
  }

}
