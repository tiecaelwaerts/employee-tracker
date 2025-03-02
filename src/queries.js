import { pool } from "./database.js";

const getDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

const getRoles = async () => {
    const result = await pool.query('SELECT * FROM role');
    return result.rows;
};

const getEmployees = async () => {
    const result = await pool.query('SELECT * FROM employee');
    return result.rows;
};

const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = async (title, salary, department_id) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = async (employee_id, role_id) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

const deleteDepartment = async (id) => {
    await pool.query('DELETE FROM department WHERE id = $1', [id]);
};

const deleteRole = async (id) => {
    await pool.query('DELETE FROM role WHERE id = $1', [id]);
};

const deleteEmployee = async (id) => {
    await pool.query('DELETE FROM employee WHERE id = $1', [id]);
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deleteDepartment,
    deleteRole,
    deleteEmployee
};
