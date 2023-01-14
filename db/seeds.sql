
INSERT INTO department (name)
VALUES ("R&D"),
       ("Sales"),
       ("Production"),
       ("Distribution"),
       ("Engineering");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Mechanical Engineer", 70000, 5),
       ("Driver", 50000, 4),
       ("Machinist", 90000, 3),
       ("Chemical Eningeer", 80000, 1),
       ("Lawyer", 60000, 2),
       ("Manager", 75000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Grahm", 1, 2),
       ("Guy", "Fawkes", 6, 1),
       ("Pete", "Wells", 5, 2),
       ("Kathy", "Perkins", 6, 1),
       ("Doug", "Finn", 2, 2);
       