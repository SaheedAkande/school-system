// grading.js - helper functions shared by several pages

// Adds up all the numbers in a list 
function sum (numbers) {
  let  total = 0;
  for (const number of numbers) {
    total = total + number;
  }
  return total;
}

//Turns an average score into a letter grade
function getGrade(average) {
  if (average >= 70) {
    return "A";
  } else if (average >= 60) {
    return "B";
  } else if (average >= 50) {
    return "C";
  } else if (average >=40) {
    return "D";
  } else  {  
    return "F";
  }
}