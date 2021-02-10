const mysql = require("mysql")
const inquirer = require("inquirer")
require('dotenv').config();
// create a connection to the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "oldauth",
    password: process.env.DB_PASSWORD,
    database: "homework12",

})
connection.connect((err) => {
    if (err) throw err;
    console.log("connected")
    inquirer.prompt([{
        name: "dbAction",
        type: "list",
        message: "what do you want to do",
        choices: [
            "create department",
            "create role",
            "create employees",
        ]

    }]).then((answer) => {
        console.log(answer)
        switch (answer.dbAction) {
            case "create department":
                createDepartment()
                break;

        }
    })
})

function createDepartment() {
    inquirer.prompt([{
        name: "departmentParams",
        type: "input",
        message: "enter department name"
    }]).then((answer) => {
        console.log(answer)
    })
}