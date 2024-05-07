package controllers

import javax.inject._
import models.{ ChatMessage, MessageRequest }
import play.api.mvc.{Action, BaseController, ControllerComponents}
import services.ChatMessageService
import play.api.libs.json._
import java.text.SimpleDateFormat
import java.util.Date
import models.ChatMessageDTO

@Singleton
class ChatMessageController @Inject() (val controllerComponents: ControllerComponents, chatMessageService: ChatMessageService) extends BaseController {
	implicit val messageFormat: OFormat[ChatMessage] = Json.format[ChatMessage]
	implicit val participantFormat: OFormat[ChatMessageDTO] = Json.format[ChatMessageDTO]
	
	/**
	* Retrieves chat messages by chat ID.
	*
	* @param id the ID of the chat.
	* @return the chat messages as JSON.
	*/
	def getChatMessageByChatId(id: Long) = Action {
		chatMessageService.getChatMessageByChatId(id) match {
			case messages: List[_] => Ok(Json.toJson(messages.asInstanceOf[List[ChatMessageDTO]]))
			case e: RuntimeException => NotFound(e.getMessage())
		}
	}

	/**
	* Posts a chat message.
	*
	* @return the result of the post operation.
	*/
	def postChatMessage(): Action[MessageRequest] = Action(parse.json[MessageRequest]) { request =>
		val messageRequest = request.body
		if (chatMessageService.postChatMessage(messageRequest)) {
			Ok("Chat message posted")
		} else {
			InternalServerError("Failed to post chat message")
		}
	}
}