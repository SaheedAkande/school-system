// async.js - run with:  node async.js

// A promise that finishes after some milliseconds (pretend network delay)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadStudents() {
  console.log("2. Asking the server...");
  await wait(500);
  return [{ name: "Amina" }, { name: "Daniel" }];
}

async function failingRequest() {
  await wait(200);
  throw new Error("Server not reachable");
}

async function main() {
  console.log("1. Start");
  const students = await loadStudents();
  console.log("3. Got data:", students);

  try {
    await failingRequest();
  } catch (error) {
    console.log("4. Caught:", error.message);
  } finally {
    console.log("5. Finished (runs either way)");
  }
}

main();
console.log("Not blocked: this prints before step 3");
