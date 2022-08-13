USE employee_db

INSERT INTO department (id, name)
VALUES (23, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES (56, "manager", 50, 23);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (87, "Ida", "Jones", 56, 10);