
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const figlet = require('figlet');
const util = require('util');
const db = require('./assets/db_connection');
const { title } = require('process');


//uses figlet to make a fun header
const printHeader = async () => {
  const figletPromise = util.promisify(figlet.text)
  const data = await figletPromise('Employee Tracker: Remeber, Big brother is always watching', {
    font: 'soft',
    horizontalLayout: 'default',
    width: 100,
    whitespaceBreak: true
  })
  console.log(data)
}

async function startTracker() {
  inquirer
  .prompt([{
    type: 'list',
    message: `What would you like to do? (use arrow keys)`,
    choices: [`View All Employees`, `Add Employee`, `Update Employee Role`, `View all Roles`, `Add Role`, `View All Departments`, `Add Department`, `Exit`],
    name: 'mainList',
  }])
    .then(async function (choice) {
      switch (choice.mainList) {
        case `View All Employees`: viewEmployees();;
          break;
        case `Add Employee`: addEmployee();
          break;
        case `Update Employee Role`: updateEmployee();
          break;
        case `View all Roles`: viewRoles();
          break;
        case `Add Role`: addRole();
          break;
        case `View All Departments`: viewDepartments();
          break;
        case `Add Department`: addDepartment();
          break;
        default:
          console.log(`Best of Luck, Don't mess this up`);
          break;
      }});
}

function addEmployee()  {
  inquirer.prompt([{
  type: "input",
  name: "first_name",
  message: "What's the employee's first name?",
  validate: function (input) {
      return !!input || "Can't enter nothing. Please enter their name.";
  }
},
{
  type: "input",
  name: "last_name",
  message: "What's the employee's last name?",
  validate: function (input) {
      return !!input || "Last name is not optional either.";
  }
},
{
  type: "list",
  name: "role_id",
  message: `What's the employee's role id? \nMechanical Engineer = 1 Driver = 2, Machinist = 3, Chemical Engineer= 4, Lawyer= 5, Manager= 6`,
  choices: ['1', '2', '3', '4', '5', '6']
},
{
  type: "list",
  name: "manager_id",
  message: `Who is the employee's manager? \nGuy and Kathy are id: 2, Rodger is id: 1`,
  choices: ['1', '2']
}])
  .then((input) => { 
    const first_name = input.first_name
    const last_name = input.last_name
    const role_id = input.role_id
    const manager_id = input.manager_id

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VAlUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`, async (err, results) => { restart();}); 
});
}

function addRole () {
  inquirer.prompt([{
    type: "input",
    name: "title",
    message: "What's the role's title?",
    validate: function (input) {
        return !!input || "Can't enter nothing. Try again.";
    }
  },
  {
    type: "input",
    name: "salary",
    message: `What's the roles's salary? \nThis must be put in as numerals, with no symbols`,
  }, 
  {
    type: "list",
    name: "department_id",
    message: `What's the department's id? \nR&D = 1 Sales = 2, Production = 3, Distribution= 4, Engineering= 5`,
    choices: ['1', '2', '3', '4', '5',]
  },])
  .then( function(input) {
    const title = input.title
    const salary = input.salary
    const department_id = input.department_id
    db.query(`INSERT INTO role (title, salary, department_id) VALUES('${title}', '${salary}', '${department_id}')`, async(err, results) => {
    console.log(`${input.title} added!`)
    restart();
    });
  })
}

function addDepartment () {
  inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What's the department's name?",
    validate: function (input) {
        return !!input || "Can't enter nothing. Please enter a name.";
    }
  }])
  .then( function(input) {
    const name = input.name
    db.query(`INSERT INTO department (name) VALUES('${name}')`, async(err, results) => {
    console.log(`${input.name} added!`)
    restart();
    });
  })
}

function viewEmployees() {
  db.query('SELECT * FROM EMPLOYEE', async (err, results) => {
      console.table(results)
      restart()
  })};

function viewRoles() {
    db.query('SELECT * FROM ROLE', async (err, results) => {
        console.table(results)
        restart()
  });
}

function viewDepartments() {
  db.query('SELECT * FROM DEPARTMENT', async (err, results) => {
      console.table(results);
      restart();
  });
}

function restart(){
  inquirer.prompt([{
    type:"list",
    name: "restart",
    message: "Would you like to return to the tracker?",
    choices: [`Yes!`, `No`]
  }])
  .then(async function (choice) {
    switch (choice.restart) {
      case `Yes!`: startTracker();
          break;
      default:
          console.log(`Best of Luck, Don't mess this up`);
          break;
}});
}

const begin = async () => {
  await printHeader();
  startTracker();
}

begin()