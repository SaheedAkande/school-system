// main.js - the entry point: connects data, logic and the page

import { SUBJECTS, buildResults, classStats, validateStudent } from "./grading.js";
import { fetchStudents } from "./api.js";
import { loadAddedStudents, saveAddedStudents } from "./storage.js";
import { renderHeader, renderRows, renderStats } from "./render.js";

const headRow = document.getElementById("broadsheet-head");
const body = document.getElementById("broadsheet-body");
const statsBox = document.getElementById("stats");
const searchInput = document.getElementById("search");
const statusMessage = document.getElementById("status");
const form = document.getElementById("add-form");
const formError = document.getElementById("form-error");
const scoreFields = document.getElementById("score-fields");

let seedStudents = [];                    // from the JSON file
let addedStudents = loadAddedStudents();  // from this browser's storage

// Rank everyone, then show only the rows that match the search box
function refresh() {
  const results = buildResults([...seedStudents, ...addedStudents]);
  const term = searchInput.value.trim().toLowerCase();
  const visible = results.filter((r) => r.name.toLowerCase().includes(term));
  renderRows(body, visible, deleteStudent);
  renderStats(statsBox, classStats(results));
}

function deleteStudent(id) {
  addedStudents = addedStudents.filter((student) => student.id !== id);
  saveAddedStudents(addedStudents);
  refresh();
}

// Create one number box per subject, so the form always matches SUBJECTS
function buildScoreFields() {
  SUBJECTS.forEach((subject, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.htmlFor = "score-" + i;
    label.textContent = subject;

    const input = document.createElement("input");
    input.type = "number";
    input.id = "score-" + i;
    input.min = "0";
    input.max = "100";

    wrapper.append(label, input);
    scoreFields.appendChild(wrapper);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("new-name").value;
  const scores = SUBJECTS.map((_, i) => {
    const value = document.getElementById("score-" + i).value;
    return value === "" ? NaN : Number(value);
  });

  const problem = validateStudent(name, scores);
  if (problem) {
    formError.textContent = problem;
    return;
  }

  formError.textContent = "";
  addedStudents.push({ id: "u" + Date.now(), name: name.trim(), scores, added: true });
  saveAddedStudents(addedStudents);
  form.reset();
  refresh();
});

searchInput.addEventListener("input", refresh);

async function start() {
  renderHeader(headRow);
  buildScoreFields();

  try {
    const data = await fetchStudents();
    seedStudents = data.students;
    statusMessage.textContent = data.school + " - " + data.term;
  } catch (error) {
    console.error(error);
    statusMessage.textContent =
"Could not load the class list. Showing only students you added.";
  }

  refresh();
}

start();
