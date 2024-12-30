CREATE TABLE items (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       item VARCHAR(10) NOT NULL
);

CREATE TABLE combinations (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              combination VARCHAR(255) NOT NULL
);

CREATE TABLE responses (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           request_body TEXT NOT NULL,
                           response_body TEXT NOT NULL
);
