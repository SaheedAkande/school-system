// grading.js - pure functions (no page code), so they work in the
// browser AND in Node.

export const SUBJECTS = ["Maths", "English", "Science", "Social Studies", "Computer"];

export function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function average(numbers) {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

export function getGrade(avg) {
  if (avg >= 70) return "A";
  if (avg >= 60) return "B";
  if (avg >= 50) return "C";
  if (avg >= 40) return "D";
  return "F";
}

export function getRemark(grade) {
  const remarks = {
    A: "Excellent",
    B: "Very good",
    C: "Good",
    D: "Fair",
    F: "Needs improvement"
  };
  return remarks[grade];
}

// Takes a list of students, returns them ranked with totals and grades
export function buildResults(students) {
  return students
    .map((student) => {
      const total = sum(student.scores);
      const avg = average(student.scores);
      const grade = getGrade(avg);
      return { ...student, total, average: avg, grade, remark: getRemark(grade) };
    })
    .sort((a, b) => b.total - a.total)
    .map((student, index, list) => ({
      ...student,
      // equal totals share a position
      position: list.findIndex((s) => s.total === student.total) + 1
    }));
}

export function classStats(results) {
  if (results.length === 0) return null;
  const totals = results.map((r) => r.total);
  return {
    count: results.length,
    highest: Math.max(...totals),
    lowest: Math.min(...totals),
    classAverage: average(results.map((r) => r.average))
  };
}

// Returns an error message, or "" when everything is fine
export function validateStudent(name, scores) {
  if (name.trim() === "") return "Please enter the student's name.";
  if (scores.length !== SUBJECTS.length) {
    return "Enter all " + SUBJECTS.length + " scores.";
  }
  for (const score of scores) {
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      return "Scores must be numbers from 0 to 100.";
    }
  }
  return "";
}
