/*************************************************
 NATIONAL LOGIC OLYMPIAD – FINAL EVENT SYSTEM
**************************************************/

let submitted = false;
let solvedNonogram = false;
let seconds = 0;

/**************** TIMER ****************/
let timer = setInterval(() => {
  if (submitted) return;
  seconds++;
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  document.getElementById("timer").innerText =
    "Time: " +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0");
}, 1000);

/*************************************************
 HARD NONOGRAM 15×15
*************************************************/

const N = 15;

const nonogramSolution = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
[1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
[0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,0,1,1,1,1,1,0,0,0],
[1,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
[0,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
[0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
[0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]
];

let userGrid = Array.from({ length: N }, () =>
  Array(N).fill(0)
);

function getClues(line) {
  let clues = [];
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 1) count++;
    else {
      if (count > 0) clues.push(count);
      count = 0;
    }
  }
  if (count > 0) clues.push(count);
  if (clues.length === 0) clues = [0];
  return clues;
}

function drawNonogram() {
  let container = document.getElementById("nonogram");
  container.innerHTML = "";
  let table = document.createElement("table");

  let topRow = document.createElement("tr");
  topRow.appendChild(document.createElement("td"));

  for (let col = 0; col < N; col++) {
    let column = nonogramSolution.map(row => row[col]);
    let clues = getClues(column);
    let cell = document.createElement("td");
    cell.innerHTML = clues.join("<br>");
    topRow.appendChild(cell);
  }

  table.appendChild(topRow);

  for (let i = 0; i < N; i++) {
    let row = document.createElement("tr");
    let clueCell = document.createElement("td");
    clueCell.innerText = getClues(nonogramSolution[i]).join(" ");
    row.appendChild(clueCell);

    for (let j = 0; j < N; j++) {
      let cell = document.createElement("td");
      cell.onclick = () => {
        if (submitted) return;
        cell.classList.toggle("black");
        userGrid[i][j] ^= 1;
      };
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

function submitNonogram() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (userGrid[i][j] !== nonogramSolution[i][j]) {
        document.getElementById("nonogramMsg").innerText =
          "❌ Incorrect";
        return;
      }
    }
  }

  solvedNonogram = true;
  document.getElementById("nonogramMsg").innerText =
    "✅ Nonogram Solved!";

  document.getElementById("kakuroSection").style.display =
    "block";
}

/*************************************************
 DENSE 18×18 KAKURO (Balanced)
*************************************************/

const SIZE = 18;
let kakuroLayout = [];
let userInputs = [];
let correctSolution = [];

function initKakuro() {
  kakuroLayout = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill("B")
  );
  userInputs = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(null)
  );
  correctSolution = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(null)
  );

  // Dense interior
  for (let r = 1; r < 17; r++) {
    for (let c = 1; c < 17; c++) {
      kakuroLayout[r][c] = 0;
      correctSolution[r][c] = ((r + c) % 9) + 1;
    }
  }

  // Structured black breaks
  for (let r = 2; r < 17; r += 4) {
    for (let c = 2; c < 17; c += 5) {
      kakuroLayout[r][c] = "B";
    }
  }

  generateClues();
}

function generateClues() {
  for (let r = 1; r < 17; r++) {
    for (let c = 1; c < 17; c++) {
      if (kakuroLayout[r][c] === 0) {

        if (kakuroLayout[r][c - 1] === "B") {
          let sum = 0, col = c;
          while (col < SIZE && kakuroLayout[r][col] === 0) {
            sum += correctSolution[r][col];
            col++;
          }
          kakuroLayout[r][c - 1] =
            { right: sum };
        }

        if (kakuroLayout[r - 1][c] === "B") {
          let sum = 0, row = r;
          while (row < SIZE && kakuroLayout[row][c] === 0) {
            sum += correctSolution[row][c];
            row++;
          }
          kakuroLayout[r - 1][c] =
            kakuroLayout[r - 1][c] === "B"
              ? { down: sum }
              : { ...kakuroLayout[r - 1][c], down: sum };
        }
      }
    }
  }
}

function drawKakuro() {
  let container = document.getElementById("kakuro");
  container.innerHTML = "";
  let table = document.createElement("table");

  for (let r = 0; r < SIZE; r++) {
    let row = table.insertRow();
    for (let c = 0; c < SIZE; c++) {
      let cell = row.insertCell();
      let val = kakuroLayout[r][c];

      if (val === "B") {
        cell.className = "black";
      }
      else if (typeof val === "object") {
        cell.className = "clue";
        cell.innerHTML =
          (val.down ? `<div class="bottom">${val.down}</div>` : "") +
          (val.right ? `<div class="top">${val.right}</div>` : "");
      }
      else {
        let input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;

        input.oninput = () => {
          userInputs[r][c] = input.value
            ? parseInt(input.value)
            : null;
        };

        cell.appendChild(input);
      }
    }
  }

  container.appendChild(table);
}

function submitKakuro() {
  if (!solvedNonogram) {
    document.getElementById("kakuroMsg").innerText =
      "Solve Nonogram first";
    return;
  }

  for (let r = 1; r < 17; r++) {
    for (let c = 1; c < 17; c++) {
      if (kakuroLayout[r][c] === 0) {
        if (userInputs[r][c] !== correctSolution[r][c]) {
          document.getElementById("kakuroMsg").innerText =
            "❌ Incorrect Kakuro";
          return;
        }
      }
    }
  }

  submitted = true;
  clearInterval(timer);

  document.getElementById("kakuroMsg").innerText =
    "✅ Kakuro Solved!";

  showFinalCode();
  updateLeaderboard();
}

function showFinalCode() {
  const code =
    "A9XQZ7MPL2TR8CVY1BN6WFKJ5HDS4UEG3IOL0RATYQWZXCVBNMKJ";

  document.getElementById("finalCode").innerText =
    "🏆 Submission Code: " + code;
}

/*************************************************
 LEADERBOARD
*************************************************/

function updateLeaderboard() {
  let list = document.getElementById("leaderboard");
  let li = document.createElement("li");
  li.innerText =
    "Completion Time: " + seconds + " seconds";
  list.appendChild(li);
}

/*************************************************
 INIT
*************************************************/

drawNonogram();
initKakuro();
drawKakuro();
document.getElementById("kakuroSection").style.display =
  "none";
