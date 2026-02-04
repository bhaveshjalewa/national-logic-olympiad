// =======================
// TIMER (NO LIMIT)
// =======================

let seconds = 0;
setInterval(() => {
  seconds++;
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  document.getElementById("timer").innerText =
    "Time Elapsed: " +
    String(min).padStart(2, '0') + ":" +
    String(sec).padStart(2, '0');
}, 1000);


// =======================
// 15x15 NONOGRAM (WITH CLUES)
// =======================

const nonogramSize = 15;
const nonogramContainer = document.getElementById("nonogram-container");

// Fixed competition pattern (symmetrical style)
const nonogramSolution = [
[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
[0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
[0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
[1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
[0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
[0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
[0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
[0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
[1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
[0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
[0,0,1,0,0,0,1,0,1,0,0,0,1,0,0],
[0,0,0,1,1,1,0,0,0,1,1,1,0,0,0]
];

let nonogramGrid = [];

function calculateClues(line) {
  let clues = [];
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 1) {
      count++;
    } else if (count > 0) {
      clues.push(count);
      count = 0;
    }
  }
  if (count > 0) clues.push(count);
  return clues.length ? clues : [0];
}

function generateNonogram() {
  let table = document.createElement("table");

  // Column clues row
  let clueRow = document.createElement("tr");
  clueRow.appendChild(document.createElement("td"));

  for (let col = 0; col < nonogramSize; col++) {
    let column = nonogramSolution.map(row => row[col]);
    let clues = calculateClues(column);
    let cell = document.createElement("td");
    cell.innerHTML = clues.join("<br>");
    clueRow.appendChild(cell);
  }

  table.appendChild(clueRow);

  for (let i = 0; i < nonogramSize; i++) {
    let row = document.createElement("tr");

    let clueCell = document.createElement("td");
    clueCell.innerText = calculateClues(nonogramSolution[i]).join(" ");
    row.appendChild(clueCell);

    nonogramGrid[i] = [];

    for (let j = 0; j < nonogramSize; j++) {
      let cell = document.createElement("td");
      nonogramGrid[i][j] = 0;

      cell.onclick = function () {
        cell.classList.toggle("black-cell");
        nonogramGrid[i][j] = nonogramGrid[i][j] === 0 ? 1 : 0;
      };

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  nonogramContainer.innerHTML = "";
  nonogramContainer.appendChild(table);
}

function checkNonogram() {
  for (let i = 0; i < nonogramSize; i++) {
    for (let j = 0; j < nonogramSize; j++) {
      if (nonogramGrid[i][j] !== nonogramSolution[i][j]) {
        document.getElementById("nonogram-result").innerText = "Incorrect.";
        return;
      }
    }
  }
  document.getElementById("nonogram-result").innerText = "Correct!";
}


// =======================
// 18x18 KAKURO (STRUCTURE)
// =======================

const kakuroSize = 18;
const kakuroContainer = document.getElementById("kakuro-container");

function generateKakuro() {
  let table = document.createElement("table");

  for (let i = 0; i < kakuroSize; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < kakuroSize; j++) {
      let cell = document.createElement("td");

      if ((i + j) % 4 === 0) {
        cell.classList.add("kakuro-black");
      } else {
        let input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        cell.appendChild(input);
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  kakuroContainer.innerHTML = "";
  kakuroContainer.appendChild(table);
}

generateNonogram();
generateKakuro();
