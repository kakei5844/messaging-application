CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  initials VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE friends (
  friend_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  friend_user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (friend_user_id) REFERENCES users(user_id)
);

CREATE TABLE chat (
	chat_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_type VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE chat_participant (
	participant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    chat_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id)
);

CREATE TABLE chat_message (
	message_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT NOT NULL,
    sender_participant_id INT NOT NULL,
    content VARCHAR(500),
    created_at TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
    FOREIGN KEY (sender_participant_id) REFERENCES chat_participant(participant_id)
);

ALTER TABLE chat_participant
ADD COLUMN last_seen_message_id INT,
ADD CONSTRAINT fk_participant_message foreign key (last_seen_message_id) REFERENCES chat_message(message_id);

INSERT INTO users VALUES(1, 'admin@localhost', 'admin', 'Admin', 'Admin', 'AA', 'admin');
INSERT INTO users VALUES(2, 'user@localhost', 'user', 'User', 'User', 'UU', 'user');
INSERT INTO users VALUES(3, 'user2@localhost', 'azamat123', 'Azamat', 'Nurpeissov', 'AN', 'helloWorld!');
INSERT INTO users VALUES(4, 'user3@localhost', 'kiki123', 'Kiki', 'Lam', 'KL', 'helloWorld!');
INSERT INTO users VALUES(5, 'user4@localhost', 'eric123', 'Eric', 'Chung', 'EC', 'helloWorld!');
INSERT INTO users VALUES(6, 'user5@localhost', 'iris123', 'Iris', 'Gong', 'IG', 'helloWorld!');
INSERT INTO users VALUES(7, 'user5@localhost', 'matthew123', 'Matthew', 'Chau', 'MC', 'helloWorld!');
INSERT INTO users VALUES(8, 'user6@localhost', 'nathan123', 'Nathan', 'Lee', 'NL', 'helloWorld!');
INSERT INTO users VALUES(9, 'user6@localhost', 'aruzhan123', 'Aruzhan', 'Boken', 'AB', 'helloWorld!');
INSERT INTO users VALUES(10, 'user7@localhost', 'kelly123', 'Kelly', 'Chim', 'KC', 'helloWorld!');
INSERT INTO users VALUES(11, 'user8@localhost', 'john123', 'John', 'Doe', 'JD', 'helloWorld!');
INSERT INTO users VALUES(12, 'user9@localhost', 'taylor123', 'Taylor', 'Swift', 'TS', 'helloWorld!');

INSERT INTO friends VALUES(1, 1, 2);
INSERT INTO friends VALUES(2, 2, 1);
INSERT INTO friends VALUES(3, 1, 3);
INSERT INTO friends VALUES(4, 3, 1);

-- INSERT INTO friends VALUES(5, 11, 3);
INSERT INTO friends VALUES(6, 11, 4);
-- INSERT INTO friends VALUES(7, 11, 5);
-- INSERT INTO friends VALUES(8, 11, 6);
-- INSERT INTO friends VALUES(9, 11, 7);
-- INSERT INTO friends VALUES(10, 11, 8);
-- INSERT INTO friends VALUES(11, 11, 9);
-- INSERT INTO friends VALUES(12, 11, 10);
INSERT INTO friends VALUES(13, 11, 12);

-- INSERT INTO friends VALUES(14, 3, 11);
INSERT INTO friends VALUES(15, 4, 11);
-- INSERT INTO friends VALUES(16, 5, 11);
-- INSERT INTO friends VALUES(17, 6, 11);
-- INSERT INTO friends VALUES(18, 7, 11);
-- INSERT INTO friends VALUES(19, 8, 11);
-- INSERT INTO friends VALUES(20, 9, 11);
-- INSERT INTO friends VALUES(21, 10, 11);
INSERT INTO friends VALUES(22, 12, 11);

-- INSERT INTO friends VALUES(23, 3, 12);
INSERT INTO friends VALUES(24, 4, 12);
-- INSERT INTO friends VALUES(25, 5, 12);
-- INSERT INTO friends VALUES(26, 6, 12);
-- INSERT INTO friends VALUES(27, 7, 12);
-- INSERT INTO friends VALUES(28, 8, 12);
-- INSERT INTO friends VALUES(29, 9, 12);
-- INSERT INTO friends VALUES(30, 10, 12);

-- INSERT INTO friends VALUES(32, 12, 3);
INSERT INTO friends VALUES(33, 12, 4);
-- INSERT INTO friends VALUES(34, 12, 5);
-- INSERT INTO friends VALUES(35, 12, 6);
-- INSERT INTO friends VALUES(36, 12, 7);
-- INSERT INTO friends VALUES(37, 12, 8);
-- INSERT INTO friends VALUES(38, 12, 9);
-- INSERT INTO friends VALUES(39, 12, 10);

INSERT INTO friends VALUES(40, 4, 3);
INSERT INTO friends VALUES(41, 4, 5);
INSERT INTO friends VALUES(42, 4, 6);
INSERT INTO friends VALUES(43, 4, 7);
INSERT INTO friends VALUES(44, 4, 8);
INSERT INTO friends VALUES(45, 4, 9);
INSERT INTO friends VALUES(46, 4, 10);

INSERT INTO friends VALUES(47, 3, 4);
INSERT INTO friends VALUES(48, 5, 4);
INSERT INTO friends VALUES(49, 6, 4);
INSERT INTO friends VALUES(50, 7, 4);
INSERT INTO friends VALUES(51, 8, 4);
INSERT INTO friends VALUES(52, 9, 4);
INSERT INTO friends VALUES(53, 10, 4);

INSERT INTO chat VALUES(1, "DIRECT", null);
INSERT INTO chat VALUES(2, "DIRECT", null);

-- INSERT INTO chat VALUES(3, "DIRECT", null);
INSERT INTO chat VALUES(4, "DIRECT", null);
-- INSERT INTO chat VALUES(5, "DIRECT", null);
-- INSERT INTO chat VALUES(6, "DIRECT", null);
-- INSERT INTO chat VALUES(7, "DIRECT", null);
-- INSERT INTO chat VALUES(8, "DIRECT", null);
-- INSERT INTO chat VALUES(9, "DIRECT", null);
-- INSERT INTO chat VALUES(10, "DIRECT", null);
INSERT INTO chat VALUES(11, "DIRECT", null);

-- INSERT INTO chat VALUES(12, "DIRECT", null);
INSERT INTO chat VALUES(13, "DIRECT", null);
-- INSERT INTO chat VALUES(14, "DIRECT", null);
-- INSERT INTO chat VALUES(15, "DIRECT", null);
-- INSERT INTO chat VALUES(16, "DIRECT", null);
-- INSERT INTO chat VALUES(17, "DIRECT", null);
-- INSERT INTO chat VALUES(18, "DIRECT", null);
-- INSERT INTO chat VALUES(19, "DIRECT", null);

INSERT INTO chat VALUES(20, "DIRECT", null);
INSERT INTO chat VALUES(21, "DIRECT", null);
INSERT INTO chat VALUES(22, "DIRECT", null);
INSERT INTO chat VALUES(23, "DIRECT", null);
INSERT INTO chat VALUES(24, "DIRECT", null);
INSERT INTO chat VALUES(25, "DIRECT", null);
INSERT INTO chat VALUES(26, "DIRECT", null);


INSERT INTO chat_participant VALUES(1, 1, 1, null);
INSERT INTO chat_participant VALUES(2, 2, 1, null);

INSERT INTO chat_participant VALUES(3, 1, 2, null);
INSERT INTO chat_participant VALUES(4, 3, 2, null);

-- INSERT INTO chat_participant VALUES(5, 11, 3, null);
-- INSERT INTO chat_participant VALUES(6, 3, 3, null);

INSERT INTO chat_participant VALUES(7, 11, 4, null);
INSERT INTO chat_participant VALUES(8, 4, 4, null);

-- INSERT INTO chat_participant VALUES(9, 11, 5, null);
-- INSERT INTO chat_participant VALUES(10, 5, 5, null);

-- INSERT INTO chat_participant VALUES(11, 11, 6, null);
-- INSERT INTO chat_participant VALUES(12, 6, 6, null);

-- INSERT INTO chat_participant VALUES(13, 11, 7, null);
-- INSERT INTO chat_participant VALUES(14, 7, 7, null);

-- INSERT INTO chat_participant VALUES(15, 11, 8, null);
-- INSERT INTO chat_participant VALUES(16, 8, 8, null);

-- INSERT INTO chat_participant VALUES(17, 11, 9, null);
-- INSERT INTO chat_participant VALUES(18, 9, 9, null);

-- INSERT INTO chat_participant VALUES(19, 11, 10, null);
-- INSERT INTO chat_participant VALUES(20, 10, 10, null);

INSERT INTO chat_participant VALUES(21, 11, 11, null);
INSERT INTO chat_participant VALUES(22, 12, 11, null);

-- INSERT INTO chat_participant VALUES(23, 12, 12, null);
-- INSERT INTO chat_participant VALUES(24, 3, 12, null);

INSERT INTO chat_participant VALUES(25, 12, 13, null);
INSERT INTO chat_participant VALUES(26, 4, 13, null);

-- INSERT INTO chat_participant VALUES(27, 12, 14, null);
-- INSERT INTO chat_participant VALUES(28, 5, 14, null);

-- INSERT INTO chat_participant VALUES(29, 12, 15, null);
-- INSERT INTO chat_participant VALUES(30, 6, 15, null);

-- INSERT INTO chat_participant VALUES(31, 12, 16, null);
-- INSERT INTO chat_participant VALUES(32, 7, 16, null);

-- INSERT INTO chat_participant VALUES(33, 12, 17, null);
-- INSERT INTO chat_participant VALUES(34, 8, 17, null);

-- INSERT INTO chat_participant VALUES(35, 12, 18, null);
-- INSERT INTO chat_participant VALUES(36, 9, 18, null);

-- INSERT INTO chat_participant VALUES(37, 12, 19, null);
-- INSERT INTO chat_participant VALUES(38, 10, 19, null);

INSERT INTO chat_participant VALUES(39, 4, 20, null);
INSERT INTO chat_participant VALUES(40, 3, 20, null);

INSERT INTO chat_participant VALUES(41, 4, 21, null);
INSERT INTO chat_participant VALUES(42, 5, 21, null);

INSERT INTO chat_participant VALUES(43, 4, 22, null);
INSERT INTO chat_participant VALUES(44, 6, 22, null);

INSERT INTO chat_participant VALUES(45, 4, 23, null);
INSERT INTO chat_participant VALUES(46, 7, 23, null);

INSERT INTO chat_participant VALUES(47, 4, 24, null);
INSERT INTO chat_participant VALUES(48, 8, 24, null);

INSERT INTO chat_participant VALUES(49, 4, 25, null);
INSERT INTO chat_participant VALUES(50, 9, 25, null);

INSERT INTO chat_participant VALUES(51, 4, 26, null);
INSERT INTO chat_participant VALUES(52, 10, 26, null);

INSERT INTO chat_message VALUES(1, 1, 1, "Hello", "2021-01-01 00:00:00");
INSERT INTO chat_message VALUES(2, 1, 2, "Hi", "2021-01-01 00:00:01");
INSERT INTO chat_message VALUES(3, 1, 1, "How are you?", "2021-01-01 00:00:02");
INSERT INTO chat_message VALUES(4, 1, 2, "I'm fine", "2021-01-01 00:00:03");

INSERT INTO chat_message VALUES(5, 2, 3, "Hello", "2021-01-02 00:00:00");
INSERT INTO chat_message VALUES(6, 2, 4, "Hi", "2021-01-02 00:00:01");
INSERT INTO chat_message VALUES(7, 2, 3, "How are you?", "2021-01-02 00:00:02");
INSERT INTO chat_message VALUES(8, 2, 4, "I'm fine", "2021-01-02 00:00:03");

DELIMITER //
CREATE PROCEDURE insertMessage(IN chat_id int(11), IN sender_participant_id int(11), IN content varchar(500), IN created_at timestamp)
BEGIN
INSERT INTO chat_message (chat_id, sender_participant_id, content, created_at)
VALUES (chat_id, sender_participant_id, content, created_at);
END //
DELIMITER ;


INSERT INTO chat VALUES(27, "GROUP", "Group Chat 1");
INSERT INTO chat_participant VALUES(53, 4, 27, null);
INSERT INTO chat_participant VALUES(54, 11, 27, null);
INSERT INTO chat_participant VALUES(55, 12, 27, null);