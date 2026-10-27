// ---- 1. Variables: name boxes that hold values ----
const schoolName = "My School";  // const: cannot be reassigned
let studentCount = 120;         // let: can change later 
studentCount = studentCount + 5;
console.log(schoolName, studentCount);
// ---- 2. Data types ----
const classSize = 30;          // number
const motto = "Learn and lead";  // string (text)
const isOpen = true;            //boolean (true or false)
console.log(typeof classSize, typeof motto, typeof isOpen);

// ---- 3. Decisions with if / else ----
const score = 64;
if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}

// ---- 4. Loops: repeat something ----
for (let i = 1; i <= 5; i++) {
  console.log("student number" + i);
}

// ---- 6.Arrays: ordered lists ----
const subjects = ["Maths", "English", "Science"];
console.log(subjects[0]); // Maths (counting starts at 0)
console.log(subjects.length); // 3
subjects.push("Computer");    // add to the end
for (const subject of subjects) {
  console.log(subject);
}

// ---- 7. Objects: a thing with named properties ----
const student = { name: "Amina Khan", age: 12, className: "Grade 6" };
console.log(student.name);
student.age = 13;
console.log(student.age);

// ---- 8. Array of objects (how real data looks) ----
const students = [
  { name: "Amina Khan", score: 78 },
  {name: "Daniel Brown", score: 55 }
];
for (const s of students) {
  console.log(s.name + "scored" + s.score);
}

// ---- 9. filter and map ----
const scores = [78, 55, 91, 40];
const passed = scores.filter(function (s) {
  return s >= 50;
});
console.log(passed);   // ---- [78, 55, 91]

const labels = scores.map(function (s) {
  return s + "%";
});
console.log(labels);      // ["78%", "55%", "91%" "40%"]