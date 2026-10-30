// api.js - gets the class list from a JSON file

export async function fetchStudents() {
  const response = await fetch("data/students.json");
  if (!response.ok) {
    throw new Error("Could not load students (status " + response.status + ")");
  }
  return response.json();
}
