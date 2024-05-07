package controllers

import models.Friends
import services.{ChatParticipantService, ChatService, FriendsService, UserService}

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.db._
import play.api.libs.json._

import models.User
import services.UserService

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject() (
  controllerComponents: ControllerComponents
) extends AbstractController(controllerComponents) {


}
