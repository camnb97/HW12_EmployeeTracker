const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
// require('dotenv').config();


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "lollipop00",
    database: "employee_db"
});


inquirer
    .prompt(
        {
            type: "list",
            name: "choices",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"]

        }).then((answers) => {
            try {
                switch (answers.choices) {
                    case "View all departments":
                        viewDepts();
                        break;
                    case "View all roles":
                        viewRoles();
                        break;
                    case "View all employees":
                        viewEmployees();
                        break;
                    case "Add a department":
                        addDept();
                        break;
                    case "Add a role":
                        addRole();
                        break;
                    case "Add an employee":
                        addEmployee();
                        break;
                    case "Update an employee":
                        updateEmployee();
                        break;
                }
            }
            catch (err) {
                console.log("couldnt find answers")
            }
        })

function viewDepts() {
    //add the departments info from the schema table
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // startScreen();
    });
    console.log("hit")
    // console.table();
}

function viewRoles() {
    //add roles info
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function viewEmployees() {
    //add employees info
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    console.table()
}

function addDept() {
    inquirer
        .prompt(
            {
                type: "input",
                name: "addDept",
                message: "Enter new department name",
            }
        ).then((answers) => {
            let newDept = answers.addDept;
            let query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, newDept, function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        });
}

function addRole() {
    inquirer
        .prompt(
            {
                type: "input",
                name: "addRole",
                message: "Enter new role",
            },
            {
                type: "input",
                message: "Enter salary for this role",
                name: "salary"
            },
            {
                type: "input",
                message: "Enter department id number",
                name: "deptID"
            },
        ).then((answers) => {
            // let newRole = answers.addRole;
            let query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answers.addRole, answers.salary, answers.deptID], function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        });
}

function addEmployee() {
    inquirer
        .prompt(
            {
                type: "input",
                name: "id",
                message: "Enter new employee's id",
            },
            {
                type: "input",
                name: "firstName",
                message: "Enter new employee's first name",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter new employee's last name",
            },
            {
                type: "input",
                message: "Enter role id number",
                name: "roleID"
            },
            {
                type: "input",
                message: "Enter manager id number",
                name: "managerID"
            }
        ).then((answers) => {
            let newEmployee = answers.addEmployee;
            let query = "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?)";
            connection.query(query, newEmployee, function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "eeUpdate"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (answer) {
            // let query = `INSERT INTO employee (name) VALUES ("${answer.deptName}")`
            let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
            console.log(query);

            connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.eeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                startScreen();
            });
        });
}