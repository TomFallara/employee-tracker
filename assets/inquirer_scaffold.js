
class questionList {

    employeeList(role, manager) {
        return [
           
        ]
    }
    updateList(employee, role) {
        return [
            {
                type: "list",
                name: "name",
                message: "Which employee would you like to update?",
                choices: employee
            },
            {
                type: "list",
                name: "role",
                message: "What role would you like to assign the selected employee?",
                choices: role
            }
        ]
    }
    departmentList() {
        return [{
            type: "input",
            name: "name",
            message: "Name you department.",
            validate: function (input) {
                return !!input || "Can't Log Nothing. Please Enter Something";
            }
        },
        {
            type: "input",
            name: "name",
            message: "Enter Role Name?",
            validate: function (input) {
                return !!input || "Please enter the name of the role!";
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            validate: function (input) {
                return isNaN(parseInt(input)) ? "enter the salary as a number!" : true;
            }
        },
        {
            type: "list",
            name: "department",
            message: "Which department does this role belong to?",
            choices: department
        }]
    }

    departmentListAll(department, option) {
        return [
            {
                type: "list",
                name: "name",
                message: 'Which department would you like to ${option}?',
                choices: department
            }]
    }
}

const answers = new questionList;

module.exports = answers