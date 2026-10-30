// modern.js - run with: node modern.js

// 1. Template literals: build text with ${}

const name = "Amina";
const total = 385;
console.log(`${name} scored ${total} in total.`);
console.log(`Average: ${(total/5) .toFixed(1)}`);

// 2. Arrow functions: a shoerter way to write functions

const double = (n) => n * 2;
const greet = (person) => `Hello, ${person}!`;
console.log(double(21));
console.log(greet("class"));

// 3. Destructuring: unpack values into variables

const student = { name: "Daniel", age: 13, scores: [55, 60, 48] };
const { name: studentName, age } = student;
const [firstScore, secondScore] = student.scores;
console.log(studentName, age, firstScore, secondScore);

// 4. Spread: copy and combine without changing the original

const copy = { ...student, age: 14 };
const moreScores = [...student.scores, 70];
console.log(copy.age, student.age);
console.log(moreScores);

// 5. Optional chaining (?.) and nullish coalescing (??)

const noAddress = { name: "Mei" };
console.log(noAddress.address?.city);
console.log(noAddress.address?.city ?? "Not given");

// 6. Array methods

const scores = [78, 55, 91, 40, 67];
console.log(scores.filter((s) => s >= 50));
console.log(scores.map((s) => `${s}%`));
console.log(scores.reduce((sum, s) => sum + s, 0));
console.log(scores.find((s) => s < 50));
console.log(scores.some((s) => s < 50));
console.log(scores.every((s) => s >= 50));
console.log([...scores].sort((a, b) => b - a));
console.log(scores.includes(91));

// 7. JSON: turn data into text and back again

const text = JSON.stringify({ name: "Amina", scores: [78, 65] });
console.log(text);
const back = JSON.parse(text);
console.log(back.scores[1]);
