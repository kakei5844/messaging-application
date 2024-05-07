package models

import play.api.libs.json.OFormat
import play.api.libs.json.Json

case class User(
  user_id: Long,
  email: String,
  username: String,
  firstname: String,
  lastname: String,
  initials: String,
  password: String
)

// object User {
//   implicit val userFormat: OFormat[User] = Json.format[User]
// }

case class UserDto(
  user_id: Long,
  email: String,
  username: String,
  firstname: String,
  lastname: String,
  initials: String
)