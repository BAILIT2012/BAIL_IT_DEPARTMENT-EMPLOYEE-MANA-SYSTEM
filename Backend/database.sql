CREATE DATABASE employee_auth;

USE employee_auth;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    employee_name VARCHAR(50) NOT NULL,
    employee_department VARCHAR(50) NOT NULL,
    employee_designation VARCHAR(50) NOT NULL,
    employee_mobile VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_qr(
id INT AUTO_INCREMENT PRIMARY KEY,
employee_code VARCHAR(50),
employee_name VARCHAR(100),
employee_department VARCHAR(100),
employee_designation VARCHAR(100),
qrImage LONGTEXT,
FOREIGN KEY (employee_code) REFERENCES users(employee_code)
);

SELECT * FROM employee_qr;

CREATE TABLE canteen_system_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_code VARCHAR(50),
  employee_name VARCHAR(100),
  employee_department VARCHAR(100),
  employee_designation VARCHAR(100),
  meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
  quantity INT,
  amount_deducted INT,
  token_number INT,
  order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  order_date DATE GENERATED ALWAYS AS (DATE(order_time)) STORED,
  UNIQUE KEY unique_meal (employee_code, meal_type, order_date),
  FOREIGN KEY (employee_code) REFERENCES employee_qr(employee_code)
);

ALTER TABLE canteen_system_data ADD COLUMN amount_deducted DECIMAL(10,2) DEFAULT 0;

SELECT * FROM canteen_system_data;
DROP TABLE canteen_system_data;

-- IT Admin Table Schema
CREATE TABLE admin_users(
id INT AUTO_INCREMENT PRIMARY KEY,
adminName VARCHAR(50),
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM employee_qr;

DROP TABLE admin_users;
-- employee_wallet table schema

CREATE TABLE employee_wallet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_code VARCHAR(50) NOT NULL,
  employee_name VARCHAR(100) NOT NULL,
  breakfast_credits INT DEFAULT 0,
  lunch_dinner_credits INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_code) REFERENCES employee_qr(employee_code)
);


DROP TABLE employee_wallet;
-- wallet_transactions table schema
CREATE TABLE wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_code VARCHAR(50) NOT NULL,
  transaction_type ENUM('credit','debit') NOT NULL,
  amount INT NOT NULL,
  category ENUM('BreakfastSnacks','LunchDinner') NOT NULL,
  done_by VARCHAR(100), -- admin username
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);					

CREATE TABLE employee_transaction_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_code VARCHAR(50),
  employee_name VARCHAR(100),
  meal_type ENUM('Breakfast', 'Lunch', 'Snacks', 'Dinner'),
  amount_deducted DECIMAL(10,2),
  token_number INT,
  order_time DATETIME,
  FOREIGN KEY (employee_code) REFERENCES employee_qr(employee_code)
);


DROP TABLE transaction_history;
SELECT * FROM  employee_transaction_history;

DROP TABLES employee_wallet;
SELECT* FROM employee_wallet;


SHOW TABLES;
SHOW COLUMNS FROM users;
SHOW COLUMNS FROM meal_bookings;


DESCRIBE users;

SELECT * FROM canteen_system_data;
	
SELECT * FROM employee_wallet;

DELETE FROM users;

DELETE FROM canteen_system_data
WHERE employee_code= "BAIL1177";

DELETE FROM canteen_system_data
WHERE id= 9;

DROP TABLE users;
DROP TABLE employee_qr;

DESCRIBE users;

SELECT qrImage FROM employee_qr WHERE employee_code = 'BAIL0002';

SELECT employee_code, meal_type, token_number, order_time
FROM canteen_system_dataPRIMARYunique_mealunique_meal
ORDER BY id DESC
LIMIT 5;

ALTER TABLE wallet_transactions 
MODIFY category ENUM('BreakfastSnacks', 'LunchDinner', 'Wallet Update') NOT NULL;
