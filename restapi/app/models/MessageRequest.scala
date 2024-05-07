package models
import play.api.libs.json.Json
import play.api.libs.json.OFormat
import java.util.Date

case class MessageRequest(chat_id: Long, sender_id: Long, text: String, time: Date)

object MessageRequest {

  implicit val messageRequestFormat: OFormat[MessageRequest] = Json.format[MessageRequest]
}
