// storage.js - remembers added students in the browser (localStorage)

const KEY = "school-added-students";

export function loadAddedStudents() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Could not read saved students:", error);
    return [];
  }
}

export function saveAddedStudents(students) {
  try {
    localStorage.setItem(KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Could not save students:", error);
  }
}
