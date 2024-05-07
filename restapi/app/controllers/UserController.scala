package controllers

import models.{LoginRequest, User}
import play.api.libs.json.Json

import javax.inject._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import services.{ChatParticipantService, UserService}
import play.api.libs.json.OFormat

@Singleton
class UserController @Inject() (val controllerComponents: ControllerComponents, userService: UserService) extends BaseController{
  implicit val userFormat: OFormat[User] = Json.format[User]

  /**
  * Handles the login request.
  *
  * @return the user if the login is successful, or an Unauthorized response if the login fails.
  */
  def login(): Action[LoginRequest] = Action(parse.json[LoginRequest]) { request =>
    val loginRequest = request.body

    userService.login(loginRequest.username, loginRequest.password) match {
      case Some(user) => Ok(Json.toJson(user))
      case None => Unauthorized("Invalid username or password")
    }
  }

  /**
  * Retrieves a user by user ID.
  *
  * @param id the ID of the user.
  * @return the user if found, or a NotFound response if the user is not found.
  */
  def getUser(id: Long): Action[AnyContent] = Action{
    userService.findById(id) match {
      case Some(user) => Ok(Json.toJson(user))
      case None => NotFound("User not found")
    }
  }

  /**
  * Retrieves the username of a user by ID.
  *
  * @param id the ID of the user.
  * @return the username if found, or a NotFound response if the user is not found.
  */
  def getUsername(id: Long): Action[AnyContent] = Action{
    userService.findById(id) match {
      case Some(user) => Ok(Json.toJson(user.username))
      case None => NotFound("User not found")
    }
  }
}
