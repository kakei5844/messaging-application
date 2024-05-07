package enums

import play.api.libs.json._

sealed trait ChatType

case object DIRECT extends ChatType
case object GROUP extends ChatType

object ChatType {
  implicit val chatTypeFormat: Format[ChatType] = new Format[ChatType] {
    override def reads(json: JsValue): JsResult[ChatType] = json match {
      case JsString("DIRECT") => JsSuccess(DIRECT)
      case JsString("GROUP") => JsSuccess(GROUP)
      case _ => JsError("Invalid ChatType")
    }

    override def writes(chatType: ChatType): JsValue = chatType match {
      case DIRECT => JsString("DIRECT")
      case GROUP => JsString("GROUP")
    }
  }

  def fromString(chatTypeString: String): ChatType = chatTypeString match {
    case "DIRECT" => DIRECT
    case "GROUP" => GROUP
    case _ => throw new IllegalArgumentException("Invalid ChatType")
  }
}