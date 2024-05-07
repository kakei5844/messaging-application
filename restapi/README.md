
# Chat Web Application (Back-end)

This is the backend Rest API for a real-time chat application, built using the Scala Play Framework. It serves as the backend for the frontend application, providing APIs to interact with the MySQL database.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Documentation](#api-documentation)


## Features
- User login and logout
- Message history and persistence
- Friends list persistence
- Private and group chat support

## Technologies Used
- Scala 2.13
- Play Framework 3.0
- MySQL


## Getting Started

### Prerequisites
- Scala 2.13 or higher
- sbt (Scala Build Tool)
- MySQL database

### Installation
1. Clone the repository:

```bash
 git clone https://github.com/kakei5844/fluent-dialogue-messenger-backend.git
```

2. Navigate to the project directory:
```bash
 cd fluent-dialogue-messenger-backend
```

3. Run the application:
```bash
 sbt run
```

### Configuration
1. Configure the MySQL database connection in the `application.conf` file, you may need to change the scheme name in "default.url", and password in "default.password" to adapt to your specific database configuration.
2. Create a new schema in your MySQL database, copy and paste the `1.sql` file to MySQL and run the script.
3. There you go! Now your backend is connected with a database.

## API Documentation
To get the API Documentation, run `sbt doc`, then navigate to directory of `target/scala-2.13/api`, open the `index.html` in your browser, there you'll see all the endpoints documented.


