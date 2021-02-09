DROP DATABASE IF EXISTS homework12;
CREATE DATABASE homework12;
USE homework12;
CREATE TABLE departments(
     id int AUTO_INCREMENT,
     name varchar(30) NOT NULL,
    PRIMARY KEY (id)
)
CREATE TABLE roles(
    id int AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal NOT NULL,
    department_id NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY ( department_id) REFERENCES departments(id)

    )
CREATE TABLE employees(
    id int AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name  varchar(30) NOT NULL,
    role_id    int NOT NULL,
    manager_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id)
)