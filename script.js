/*********************
 EVENT NONOGRAM SYSTEM
**********************/

let submitted = false;
let seconds = 0;

/*********************
 TIMER
**********************/
setInterval(() => {
  if(submitted) return;
  seconds++;
  let m = Math.floor(seconds/60);
  let s = seconds%60;
  document.getElementById("timer").innerText =
    "Time: " + String(m).padStart(2,'0') +
    ":" + String(s).padStart(2,'0');
},1000);

/*********************
 FIXED 15x15 IMAGE
**********************/
const SIZE = 15;

const solution = [
[0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
[0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],
[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
[1,0,0,1,1,0,1,0,1,1,0,0,0,1,0],
[1,0,0,1,1,0,1,0,1,1,0,0,0,1,0],
[1,0,0,0,0,0,1,0,0,0,0,0,0,1,0],
[0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],
[0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
[0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],
[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
[1,0,0,1,1,0,1,0,1,1,0,0,0,1,0],
[1,0,0,1,1,0,1,0,1,1,0,0,0,1,0],
[1,0,0,0,0,0,1,0,0,0,0,0,0,1,0],
[0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],
[0,0,1,1,1,0,0,0,1,1,1,0,0,0,0]
];

let userGrid =
  Array.from({length:SIZE},()=>Array(SIZE).fill(0));

/*********************
 CALCULATE CLUES
**********************/
function getClues(line){
  let clues=[];
  let count=0;
  for(let i=0;i<line.length;i++){
    if(line[i]===1) count++;
    else{
      if(count>0) clues.push(count);
      count=0;
    }
  }
  if(count>0) clues.push(count);
  if(clues.length===0) clues=[0];
  return clues;
}

/*********************
 DRAW BOARD
**********************/
function drawBoard(){
  let container=document.getElementById("nonogram");
  let table=document.createElement("table");

  // Top row (column clues)
  let topRow=document.createElement("tr");
  topRow.appendChild(document.createElement("td"));

  for(let col=0;col<SIZE;col++){
    let column=solution.map(row=>row[col]);
    let clues=getClues(column);
    let cell=document.createElement("td");
    cell.innerHTML=clues.join("<br>");
    topRow.appendChild(cell);
  }

  table.appendChild(topRow);

  // Grid rows
  for(let i=0;i<SIZE;i++){
    let row=document.createElement("tr");

    let clueCell=document.createElement("td");
    clueCell.innerText=getClues(solution[i]).join(" ");
    row.appendChild(clueCell);

    for(let j=0;j<SIZE;j++){
      let cell=document.createElement("td");

      cell.onclick=()=>{
        if(submitted) return;
        cell.classList.toggle("black");
        userGrid[i][j]^=1;
      };

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  container.innerHTML="";
  container.appendChild(table);
}

/*********************
 SUBMIT
**********************/
function submitNonogram(){
  if(submitted) return;

  for(let i=0;i<SIZE;i++){
    for(let j=0;j<SIZE;j++){
      if(userGrid[i][j]!==solution[i][j]){
        document.getElementById("nonogramMsg").innerText=
          "❌ Incorrect Solution";
        return;
      }
    }
  }

  submitted=true;

  const code =
  "A9XQZ7MPL2TR8CVY1BN6WFKJ5HDS4UEG3IOL0RATYQWZXCVBNMKJ";

  document.getElementById("nonogramMsg").innerText=
    "✅ Correct!";

  document.getElementById("finalCode").innerText=
    "🏆 Submission Code: "+code;
}

/*********************
 INIT
**********************/
drawBoard();
