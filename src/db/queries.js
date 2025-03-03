import inquirer from "inquirer";
import { pool } from "./database.js";

class Db {
    
    async query(text) {
        try {
            let response = await pool.query(text);
            let array = await response.rows;
            return array;
        } catch (error) {
            console.error("There was a problem querying the database:", error);
            process.exit(1);
        }
    }

    findDepartments() {
        return this.query('SELECT name, id AS value FROM department ORDER BY name;')
    }

    viewDepartments() {
        return this.query('SELECT * FROM department ORDER BY name;');
    }

    findRoles() {
        return this.query('SELECT title AS name, id AS value FROM role;');
    }

    viewRoles() {
        return this.query('SELECT r.id, title, name AS department, salary FROM role r INNER JOIN department d on d.id = r.department_id ORDER BY id;');
    }

    findEmployees() {
        return this.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee;`);
    }

    viewEmployees() {
        return this.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r on e.role_id = r.id
            LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m on e.manager_id = m.id ORDER BY e.id;`);
    }

    addDepartment(name) {
        return this.query(`INSERT INTO department (name) VALUES ('${name}');`);
    }

    addRole(answers) {
        return this.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.department});`);
    }

    addEmployee(answers) {
        return this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
            ('${answers.firstName}', '${answers.lastName}', ${answers.role}, ${answers.manager})`);
    }

    updateEmployeeRole(answers) {
        return this.query(`UPDATE employee SET role_id = '${answers.role}' where id = ${answers.employee}`);
    }

    deleteDepartment(id) {
        return this.query(`DELETE FROM department WHERE id = ${id};`);
    }

    deleteRole(id) {
        return this.query(`DELETE FROM role WHERE id = ${id};`);
    }

    deleteEmployee(id) {
        return this.query(`DELETE FROM employee WHERE id = ${id};`);
    }
}

export default new Db();