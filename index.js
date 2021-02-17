const mysql = require("mysql")
const inquirer = require("inquirer");
const { createPromptModule } = require("inquirer");
require('dotenv').config();
// create a connection to the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "oldauth",
    password: process.env.DB_PASSWORD,
    database: "homework12",

})

function init() {
    inquirer.prompt([{
        name: "dbAction",
        type: "list",
        message: "what do you want to do",
        choices: [
            "create department",
            "create role",
            "create employees",
            "view departments",
            "view roles",
            "view employees",
            "update employee",




        ]

    }]).then((answer) => {
        console.log(answer)
        switch (answer.dbAction) {
            case "create department":
                createDepartment()
                break;
            case "create role":
                createRole()
                break;
            case "create employees":
                createEmployees()
                break;
            case "view departments":
                viewDepartments()
                break;
            case "view roles":
                viewRoles()
                break
            case "view employees":
                viewEmployees()
                break
            case "update employee":
                updateEmployee()
                break


        }
    })
}
connection.connect((err) => {
    if (err) throw err;
    console.log("connected")
    init()
})

function createDepartment() {
    inquirer.prompt([{
        name: "departmentParams",
        type: "input",
        message: "enter department name"
    }]).then((answer) => {
        console.log(answer)
        connection.query("insert into departments set ?", {
            name: answer.departmentParams
        })
        init()
    })
}

function createRole() {
    connection.query("select * from departments", function(err, data) {
        if (err) throw err
        console.log(data)
        inquirer.prompt([{
                name: "roleParams",
                type: "input",
                message: "enter role name"
            },
            {
                name: "salary",
                type: "input",
                message: "enter salary"
            }, {
                name: "ascDepartment",
                type: "list",
                message: "what department does the role belong in?",
                choices: function() {
                    return data.map(department => department.name)
                }
            }
        ]).then(function(answers) {
            console.log(answers)
            let chosenDepartment
            for (i = 0; i < data.length; i++) {
                if (data[i].name === answers.ascDepartment) {
                    chosenDepartment = data[i]
                }
            }
            connection.query("insert into roles set ?", {
                title: answers.roleParams,
                salary: answers.salary,
                department_id: chosenDepartment.id
            })
            init()
        })
    })

}

function createEmployees() {
    connection.query("select * from roles", function(err, data) {
        if (err) throw err
        console.log(data)
        inquirer.prompt([{
                name: "firstname",
                type: "input",
                message: "enter employees first name"
            },
            {
                name: "lastname",
                type: "input",
                message: "enter employees last name"
            }, {
                name: "ascRole",
                type: "list",
                message: "what is the employees job?",
                choices: function() {
                    return data.map(role => role.title)
                }
            }
        ]).then(function(answers) {
            console.log(answers)
            let chosenRole
            for (i = 0; i < data.length; i++) {
                if (data[i].title === answers.ascRole) {
                    chosenRole = data[i]
                }
            }
            connection.query("insert into employees set ?", {
                first_name: answers.firstname,
                last_name: answers.lastname,
                role_id: chosenRole.id,
                manager_id: 1


            })
            init()
        })
    })

}

function viewDepartments() {
    connection.query("select * from departments", (err, results) => {
        console.table(results)
        init()
    })
}

function viewRoles() {
    connection.query("select * from roles", (err, results) => {
        console.table(results)
        init()
    })
}

function viewEmployees() {
    connection.query("select * from employees", (err, results) => {
        console.table(results)
        init()
    })
}

function updateEmployee() {
    connection.query("select * from employees", (err, employees) => {
        connection.query("select * from roles", (err, roles) => {
            inquirer.prompt([{
                type: "list",
                name: "employeeId",
                message: "choose employee to update",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })
            }, {
                type: "list",
                name: "newRoleId",
                message: "choose new role",
                choices: roles.map((role) => {
                    return {
                        name: `${role.title}`,
                        value: role.id
                    }
                })
            }]).then((answers) => {
                connection.query(`update employees set role_id=${answers.newRoleId} where id=${answers.employeeId}`)
                init()
            })
        })

    })
}