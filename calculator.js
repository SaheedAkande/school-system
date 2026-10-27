// calculator.js- reads scores from the form and shows the result

const calculateButton = document.getElementById("calculate-btn");
const errorMessage = document.getElementById("error-message");
const resultBox = document.getElementById("result");

function calculate()  {
  // Clear anything left from the last click
  errorMessage.textContent = "";
  resultBox.classList.add("hidden");

  const studentName = document.getElementById("student-name") .value.trim();
  const scoreInputs = document.querySelectorAll(".score");
  const scores = [];

  // Read and check every score box
  for (const input of scoreInputs) {
    const score = Number(input.value);
    if (input.value === "" || score < 0 || score > 100)  {
      errorMessage.textContent = "Enter a score (0-100) for every subject.";
      return;
    }
    scores.push(score);
  }

  // Do the maths
  const total = sum(scores);
  const average = total / scores.length;
  const grade = getGrade(average);

  // Show the result
  document.getElementById("result-name").textContent = studentName || "Student";
  document.getElementById("result-total").textContent = total + " out of " + scores.length * 100;
  document.getElementById("result-average").textContent = average.toFixed(1);
  document.getElementById("result-grade").textContent = grade;
  resultBox.classList.remove("hidden");
}

// Run calculate() whenever the button is clicked
calculateButton.addEventListener("click", calculate);