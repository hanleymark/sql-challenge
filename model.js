const db = require("./database/db.js");

const select_cohorts_in_finsbo = db.prepare(/*sql*/ `
  SELECT name
  FROM cohorts
  WHERE location = 'Finsbury Park'
`);

function listCohortsInFinsbo() {
  return select_cohorts_in_finsbo.all();
}

const select_students_in_finsbo = db.prepare(/*sql*/ `
SELECT username
FROM students
JOIN cohorts
ON cohorts.name = students.cohort_name
WHERE location = 'Finsbury Park'
`);

function listStudentsInFinsbo() {
  return select_students_in_finsbo.all();
}

const select_students_with_location = db.prepare(/*sql*/ `
SELECT s.username, c.location
FROM students AS s
JOIN cohorts AS c
ON c.name = s.cohort_name
`);

function listStudentsWithLocation() {
  return select_students_with_location.all();
}

const select_students_with_projects = db.prepare(/*sql*/ `
SELECT p.name, sp.student_username AS username
FROM students_projects AS sp
JOIN projects AS p
ON sp.project_id = p.id
`);

function listStudentsWithProjects() {
  return select_students_with_projects.all();
}

const select_students_with_projects_in_finsbo = db.prepare(/*sql*/ `
SELECT p.name, sp.student_username AS username
FROM students_projects AS sp
JOIN projects AS p
ON sp.project_id = p.id
JOIN cohorts AS c
ON c.name = s.cohort_name
JOIN students AS s
ON s.username = sp.student_username
WHERE c.location = 'Finsbury Park'
ORDER BY sp.student_username
`);

function listStudentsWithProjectsInFinsbo() {
  return select_students_with_projects_in_finsbo.all();
}

module.exports = {
  listCohortsInFinsbo,
  listStudentsInFinsbo,
  listStudentsWithLocation,
  listStudentsWithProjects,
  listStudentsWithProjectsInFinsbo,
};
