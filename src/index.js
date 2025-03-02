import inquirer from "inquirer";
import db from "./db/queries.js";
import { connectToDb } from "./db/database.js";

await connectToDb();

const loadPrompts = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit'
            ]
        }
    ]).then(({ choice }) => {
        switch (choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Exit':
                process.exit(1);
        }
    });
};

const viewDepartments = async () => {
    const rows = await db.viewDepartments();
    console.table(rows);
    loadPrompts();
};

const viewRoles = async () => {
    const rows = await db.viewRoles();
    console.table(rows);
    loadPrompts();
};

const viewEmployees = async () => {
    const rows = await db.viewEmployees();
    console.table(rows);
    loadPrompts();
};

const addDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    await db.addDepartment(department.name);
    console.log('Department added!');
    loadPrompts();
};

const addRole = async () => {
    const departments = await db.findDepartments();
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select the department for the role:',
            choices: departments
        }
    ]);

    await db.addRole(role);
    console.log('Role added!');
    loadPrompts();
};

const addEmployee = async () => {
    const roles = await db.findRoles();
    const employees = await db.findEmployees();
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the role for the employee:',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the manager for the employee:',
            choices: employees
        }
    ]);

    await db.addEmployee(employee);
    console.log('Employee added!');
    loadPrompts();
};

const updateEmployeeRole = async () => {
    const employees = await db.findEmployees();
    const roles = await db.findRoles();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select the employee to update:',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new role for the employee:',
            choices: roles
        }
    ]);

    await db.updateEmployeeRole(employee);
    console.log('Employee role updated!');
    loadPrompts();
};

const deleteDepartment = async () => {
    const departments = await db.findDepartments();
    const department = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the department to delete:',
            choices: departments
        }
    ]);

    await db.deleteDepartment(department.id);
    console.log('Department deleted!');
    loadPrompts();
};

const deleteRole = async () => {
    const roles = await db.findRoles();
    const role = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the role to delete:',
            choices: roles
        }
    ]);

    await db.deleteRole(role.id);
    console.log('Role deleted!');
    loadPrompts();
};

const deleteEmployee = async () => {
    const employees = await db.findEmployees();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the employee to delete:',
            choices: employees
        }
    ]);

    await db.deleteEmployee(employee.id);
    console.log('Employee deleted!');
    loadPrompts();
};

loadPrompts();