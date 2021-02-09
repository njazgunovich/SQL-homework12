const mysql = require("mysql")
const inquirer = require("inquirer")
    // create a connection to the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "homework12"
})
connection.connect((err) => {
    if (err) throw err;
    console.log("connected")
})