// render.js - turns data into HTML elements

import { SUBJECTS } from "./grading.js";

function makeCell(text, tag = "td", className = "") {
  const cell = document.createElement(tag);
  cell.textContent = text;
  if (className) cell.className = className;
  return cell;
}

export function renderHeader(headRow) {
  headRow.replaceChildren();
  const titles = ["Pos", "Name", ...SUBJECTS, "Total", "Average", "Grade", "Remark", ""];
  titles.forEach((title) => headRow.appendChild(makeCell(title, "th")));
}

export function renderRows(body, results, onDelete) {
  body.replaceChildren();

  if (results.length === 0) {
    const row = document.createElement("tr");
    const cell = makeCell("No students match.");
    cell.colSpan = SUBJECTS.length + 7;
    row.appendChild(cell);
    body.appendChild(row);
    return;
  }

  for (const student of results) {
    const row = document.createElement("tr");
    row.appendChild(makeCell(student.position));
    row.appendChild(makeCell(student.name));
    for (const score of student.scores) {
      row.appendChild(makeCell(score, "td", score < 40 ? "fail" : ""));
    }
    row.appendChild(makeCell(student.total));
    row.appendChild(makeCell(student.average.toFixed(1)));
    row.appendChild(makeCell(student.grade));
    row.appendChild(makeCell(student.remark));

    const actionCell = document.createElement("td");
    if (student.added) {
      const button = document.createElement("button");
      button.className = "link-button";
      button.textContent = "Delete";
      button.addEventListener("click", () => onDelete(student.id));
      actionCell.appendChild(button);
    }
    row.appendChild(actionCell);
    body.appendChild(row);
  }
}

export function renderStats(box, stats) {
  box.replaceChildren();
  if (!stats) {
    box.textContent = "No data yet.";
    return;
  }
  const items = [
    ["Students", stats.count],
    ["Highest total", stats.highest],
    ["Lowest total", stats.lowest],
    ["Class average", stats.classAverage.toFixed(1)]
  ];
  for (const [label, value] of items) {
    const card = document.createElement("div");
    card.className = "stat";
    const number = document.createElement("strong");
    number.textContent = value;
    const caption = document.createElement("span");
    caption.textContent = label;
    card.append(number, caption);
    box.appendChild(card);
  }
}
