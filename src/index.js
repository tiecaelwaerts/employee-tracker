const inquirer = "inquirer";
import db from "./db";
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
    ]);

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
};

const viewDepartments = async () => {
    const [rows] = await db.getDepartments();
    console.table(rows);
    loadPrompts();
};

const viewRoles = async () => {
    const [rows] = await db.getRoles();
    console.table(rows);
    loadPrompts();
};

const viewEmployees = async () => {
    const [rows] = await db.getEmployees();
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
    const departments = await db.getDepartments();
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
            name: 'department_id',
            message: 'Select the department for the role:',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);

    await db.addRole(role.title, role.salary, role.department_id);
    console.log('Role added!');
    loadPrompts();
};

const addEmployee = async () => {
    const roles = await db.getRoles();
    const employees = await db.getEmployees();
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role for the employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager for the employee:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        }
    ]);

    await db.addEmployee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id);
    console.log('Employee added!');
    loadPrompts();
};

const updateEmployeeRole = async () => {
    const employees = await db.getEmployees();
    const roles = await db.getRoles();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to update:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    await db.updateEmployeeRole(employee.employee_id, employee.role_id);
    console.log('Employee role updated!');
    loadPrompts();
};

const deleteDepartment = async () => {
    const departments = await db.getDepartments();
    const department = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the department to delete:',
            choices: departments.map(department => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);

    await db.deleteDepartment(department.id);
    console.log('Department deleted!');
    loadPrompts();
};

const deleteRole = async () => {
    const roles = await db.getRoles();
    const role = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the role to delete:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    await db.deleteRole(role.id);
    console.log('Role deleted!');
    loadPrompts();
};

const deleteEmployee = async () => {
    const employees = await db.getEmployees();
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select the employee to delete:',
            choices: employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }))
        }
    ]);

    await db.deleteEmployee(employee.id);
    console.log('Employee deleted!');
    loadPrompts();
};



loadPrompts();