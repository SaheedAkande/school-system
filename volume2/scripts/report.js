// report.js - prints the broadsheet in the terminal using Node
// Run from the volume2 folder with:  node scripts/report.js

import { readFileSync } from "node:fs";
import { buildResults, classStats } from "../js/grading.js";

const fileUrl = new URL("../data/students.json", import.meta.url);
const data = JSON.parse(readFileSync(fileUrl, "utf-8"));

const results = buildResults(data.students);
const stats = classStats(results);

console.log(data.school + " - " + data.term);
console.table(
  results.map((r) => ({
    Pos: r.position,
    Name: r.name,
    Total: r.total,
    Average: r.average.toFixed(1),
    Grade: r.grade
  }))
);
console.log("Students:", stats.count);
console.log("Class average:", stats.classAverage.toFixed(1));
