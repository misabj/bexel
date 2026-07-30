-- BEXEL Growth Platform — local MySQL bootstrap
-- Creates the application database and a dedicated app user so the app
-- never needs your MySQL root password at runtime.
--
-- Run once (you will be prompted for your MySQL ROOT password):
--   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < scripts\db-setup.sql
-- (or paste the statements into MySQL Workbench while connected as root)

CREATE DATABASE IF NOT EXISTS bexel_growth
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'bexel'@'localhost' IDENTIFIED BY 'bexel_dev_pw_2026';
CREATE USER IF NOT EXISTS 'bexel'@'127.0.0.1' IDENTIFIED BY 'bexel_dev_pw_2026';

GRANT ALL PRIVILEGES ON bexel_growth.* TO 'bexel'@'localhost';
GRANT ALL PRIVILEGES ON bexel_growth.* TO 'bexel'@'127.0.0.1';

FLUSH PRIVILEGES;
