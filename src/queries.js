const db = require('./database');

const getDepartments = () => {
    return db.promise().query("SELECT * FROM department");
};

const getRoles = () => {
    return db.promise().query(
        `SELECT role.id, role.title, role.salary, department.name AS department
         FROM role
         JOIN department ON role.department_id = department.id`
    );
};

const getEmployees = () => {
    return db.promise().query(
        `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id`
    );
};

const addDepartment = (name) => {
    return db.promise().query("INSERT INTO department (name) VALUES (?)", [name]);
};

const addRole = (title, salary, department_id) => {
    return db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [title, salary, department_id]);
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
    [first_name, last_name, role_id, manager_id || null]);
};

const updateEmployeeRole = (employee_id, role_id) => {
    return db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [role_id, employee_id]);
};

module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };