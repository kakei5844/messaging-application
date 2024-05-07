package controllers

import javax.inject._
import models.ChatParticipant
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import services.ChatParticipantService
import play.api.libs.json.OFormat

import javax.inject.Inject
import scala.reflect.runtime.universe.Try

@Singleton
class ChatParticipantController @Inject() (val controllerComponents: ControllerComponents, chatParticipantService: ChatParticipantService) extends BaseController {
	implicit val participantFormat: OFormat[ChatParticipant] = Json.format[ChatParticipant]

	/**
	* Retrieves chat participants by chat ID.
	*
	* @param id the ID of the chat.
	* @return the response with the chat participants as JSON.
	*/
	def getChatparticipantWithChatId(id: Long) = Action {
		chatParticipantService.getParticipiantByChatId(id) match {
			case participants: List[_] => Ok(Json.toJson(participants.asInstanceOf[List[ChatParticipant]]))
			case e: RuntimeException => NotFound(e.getMessage())
		}
	}

	/**
	* Retrieves chat participants by user ID.
	*
	* @param id the ID of the user.
	* @return the response with the chat participants as JSON.
	*/
	def getChatparticipantWithUserId(id: Long) = Action {
		chatParticipantService.getParticipiantByUserId(id) match {
			case participants: List[_] => Ok(Json.toJson(participants.asInstanceOf[List[ChatParticipant]]))
			case e: RuntimeException => NotFound(e.getMessage())
		}
	}
}
