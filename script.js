// TIMER
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


// =====================
// 25x25 NONOGRAM ENGINE
// =====================

const size = 25;
const nonogramContainer = document.getElementById("nonogram-container");
let nonogramSolution = [];
let nonogramGrid = [];

function generateNonogram() {
  let table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    let row = document.createElement("tr");
    nonogramSolution[i] = [];
    nonogramGrid[i] = [];

    for (let j = 0; j < size; j++) {
      let cell = document.createElement("td");

      // Random competition pattern (structured density)
      let value = Math.random() > 0.6 ? 1 : 0;
      nonogramSolution[i][j] = value;
      nonogramGrid[i][j] = 0;

      cell.onclick = function () {
        if (cell.classList.contains("black-cell")) {
          cell.classList.remove("black-cell");
          nonogramGrid[i][j] = 0;
        } else {
          cell.classList.add("black-cell");
          nonogramGrid[i][j] = 1;
        }
      };

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  nonogramContainer.appendChild(table);
}

function checkNonogram() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (nonogramGrid[i][j] !== nonogramSolution[i][j]) {
        document.getElementById("nonogram-result").innerText =
          "Incorrect Nonogram.";
        return;
      }
    }
  }
  document.getElementById("nonogram-result").innerText =
    "Nonogram Correct!";
}



// =====================
// 20x20 KAKURO ENGINE
// =====================

const kakuroSize = 20;
const kakuroContainer = document.getElementById("kakuro-container");

function generateKakuro() {
  let table = document.createElement("table");

  for (let i = 0; i < kakuroSize; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < kakuroSize; j++) {
      let cell = document.createElement("td");

      if ((i + j) % 5 === 0) {
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

  kakuroContainer.appendChild(table);
}

function checkKakuro() {
  document.getElementById("kakuro-result").innerText =
    "Manual evaluation required (competition mode).";
}

generateNonogram();
generateKakuro();
