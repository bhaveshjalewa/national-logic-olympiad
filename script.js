/*************************************************
 NATIONAL LOGIC OLYMPIAD – FULL SYSTEM
**************************************************/

let seconds = 0;
let timerInterval;

/**************** TIMER ****************/

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    document.getElementById("timer").innerText =
      "Time: " +
      String(m).padStart(2, "0") +
      ":" +
      String(s).padStart(2, "0");
  }, 1000);
}

/*************************************************
 NONOGRAM (UNCHANGED LOGIC)
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

let userGrid = Array.from({ length: N }, () => Array(N).fill(0));

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
          "❌ Incorrect Nonogram";
        return;
      }
    }
  }

  document.getElementById("nonogramMsg").innerText =
    "✅ Nonogram Solved!";
  document.getElementById("kakuroSection").style.display =
    "block";
}

/*************************************************
 18×18 REAL STRUCTURED KAKURO
*************************************************/

const SIZE = 18;
let kakuroLayout = [];
let userInputs = [];
let correctSolution = [];

function buildKakuro(){

  kakuroLayout = Array.from({length:SIZE},()=>Array(SIZE).fill("B"));
  userInputs = Array.from({length:SIZE},()=>Array(SIZE).fill(null));
  correctSolution = Array.from({length:SIZE},()=>Array(SIZE).fill(null));

  const structure = [
  "BBBBBBBBBBBBBBBBBB",
  "BB000000B000000BBB",
  "B00000B00000B000BB",
  "B000B000000B00000B",
  "BB000000B00000000B",
  "B0000B00000B00000B",
  "B000000B000000B00B",
  "BB000B000000B0000B",
  "B000000000B000000B",
  "B000B00000B0000B0B",
  "B000000B00000000BB",
  "BB000000B00000000B",
  "B00000B00000B0000B",
  "B000000000B000000B",
  "B000B00000B0000B0B",
  "BB000000B00000000B",
  "BBBBBBBBBBBBBBBBBB",
  "BBBBBBBBBBBBBBBBBB"
  ];

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(structure[r][c]==="0"){
        kakuroLayout[r][c]=0;
      }
    }
  }

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(kakuroLayout[r][c]===0){
        correctSolution[r][c]=((r*5+c*7)%9)+1;
      }
    }
  }

  generateClues();
  drawKakuro();
}

function generateClues(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){

      if(kakuroLayout[r][c]===0){

        if(c===0 || kakuroLayout[r][c-1]==="B"){
          let sum=0,col=c;
          while(col<SIZE && kakuroLayout[r][col]===0){
            sum+=correctSolution[r][col];
            col++;
          }
          kakuroLayout[r][c-1] =
            kakuroLayout[r][c-1]==="B"
            ? {right:sum}
            : {...kakuroLayout[r][c-1], right:sum};
        }

        if(r===0 || kakuroLayout[r-1][c]==="B"){
          let sum=0,row=r;
          while(row<SIZE && kakuroLayout[row][c]===0){
            sum+=correctSolution[row][c];
            row++;
          }
          kakuroLayout[r-1][c] =
            kakuroLayout[r-1][c]==="B"
            ? {down:sum}
            : {...kakuroLayout[r-1][c], down:sum};
        }
      }
    }
  }
}

function drawKakuro(){

  const container=document.getElementById("kakuro");
  container.innerHTML="";
  const table=document.createElement("table");

  for(let r=0;r<SIZE;r++){
    let row=table.insertRow();

    for(let c=0;c<SIZE;c++){
      let cell=row.insertCell();
      let val=kakuroLayout[r][c];

      if(val==="B"){
        cell.className="k-black";
      }
      else if(typeof val==="object"){
        cell.className="k-clue";
        cell.innerHTML=
        `<div class="clue-box">
          <span class="clue-down">${val.down||""}</span>
          <span class="clue-right">${val.right||""}</span>
        </div>`;
      }
      else{
        let input=document.createElement("input");
        input.type="number";
        input.min=1;
        input.max=9;
        input.oninput=()=>userInputs[r][c]=input.value?parseInt(input.value):null;
        cell.appendChild(input);
      }
    }
  }

  container.appendChild(table);
}

function submitKakuro(){

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(kakuroLayout[r][c]===0){
        if(userInputs[r][c]!==correctSolution[r][c]){
          document.getElementById("kakuroMsg").innerText="❌ Incorrect Kakuro";
          return;
        }
      }
    }
  }

  document.getElementById("kakuroMsg").innerText="✅ Kakuro Solved!";
}

/*************************************************
 INIT
*************************************************/

drawNonogram();
buildKakuro();
startTimer();
