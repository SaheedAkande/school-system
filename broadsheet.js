// broadsheet.js - builds a ranked class broadsheet from data

const subjects = ["Maths", "English", "Science", "Social studies", "Computer"];

const students = [
  {name: "Amina Khan", scores: [78, 65, 82, 70, 90] },
  {name: "Daniel Brown", scores: [55, 60, 48, 62, 70] },
  {name: "Sofia Rossi", scores: [88, 92, 85, 79, 95] },
  {name: "Kwame Mensah", scores: [42, 38, 50, 45, 60] },
  {name: "Mei Lin", scores: [67, 72, 64, 58, 75] }
];

// Step 1: work out total, average and grade for each student

const results = students.map (function (student) {
  const total = sum (student.scores);
  const average = total / student.scores.length;
  return {
    name: student.name,
    scores: student.scores,
    total: total,
    average: average,
    grade: getGrade (average)
  };
});

// Step 2: rank from highest total to lowest

results.sort (function (a, b) {
  return b.total - a.total;
});

// Step 3: helper that adds one cell to a row

function addCell (row, text, tag) {
  const cell = document.createElement (tag || "td");
  cell.textContent = text;
  row.appendChild (cell);
}

// Step 4: build the header row

const headerRow = document.getElementById ("broadsheet-head");
addCell (headerRow, "position", "th");
addCell (headerRow, "Name", "th");
for (const subject of subjects) {
  addCell (headerRow, subject, "th");
}
addCell (headerRow, "Total", "th");
addCell (headerRow, "Average", "th");
addCell (headerRow, "Grade", "th");

// Step 5: build one row per student

const tableBody = document.getElementById ("broadsheet-body");
results.forEach (function (student, index) {
  const row = document.createElement ("tr");
  addCell (row, index + 1);
  addCell (row, student.name);
  for (const score of student.scores) {
    addCell (row, score);
  }
  addCell (row, student.total);
  addCell (row, student.average.toFixed (1) );
  addCell (row, student.grade);
  tableBody.appendChild (row);
});