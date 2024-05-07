package controllers

import javax.inject._
import models.{ Chat, ChatDto }
import play.api.libs.json._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import services.ChatService
import play.api.libs.json.OFormat

import javax.inject.Inject
import scala.reflect.runtime.universe.Try

@Singleton
class ChatController @Inject() (val controllerComponents: ControllerComponents, chatService: ChatService ) extends BaseController{
  implicit val chatDtoFormat: OFormat[ChatDto] = Json.format[ChatDto]
  implicit val chatFormat: OFormat[Chat] = Json.format[Chat]

	/**
	* Retrieves a chat by its ID.
	*
	* @param id the ID of the chat to retrieve.
	* @return the HTTP response containing the chat as JSON, or an error response if the chat is not found.
	*/
  def getChat(id: Long) = Action{
		chatService.getChat(id) match {
			case chat => Ok(Json.toJson(chat))
			case e: RuntimeException => NotFound(e.getMessage())
		}
	}

	/**
	* Retrieves a list of chats by the given user ID.
	*
	* @param id the ID of user to retrieve the chat list.
	* @return the HTTP response containing the list of chats as JSON, or an error response if the chats are not found.
	*/
	def getChatList(id: Long) = Action{
		chatService.getChatListById(id) match {
			case chatList: List[_] => Ok(Json.toJson(chatList.asInstanceOf[List[ChatDto]]))
			case e: RuntimeException => NotFound(e.getMessage())
		}
	}
}
