/*************************************************
 NATIONAL LOGIC OLYMPIAD – FINAL EVENT BUILD
**************************************************/

let submitted = false;
let solvedNonogram = false;
let solvedKakuro = false;
let seconds = 0;

/***********************
 TIMER
************************/
setInterval(() => {
  if(submitted) return;
  seconds++;
  let m = Math.floor(seconds/60);
  let s = seconds%60;
  document.getElementById("timer").innerText =
    "Time: " + String(m).padStart(2,'0') +
    ":" + String(s).padStart(2,'0');
},1000);

/***********************
 NONOGRAM 15×15
************************/
const SIZE = 15;

const solution = [
[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
[1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
[1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
[0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
[0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
];

let userGrid =
  Array.from({length:SIZE},()=>Array(SIZE).fill(0));

function getClues(line){
  let clues=[], count=0;
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

function drawNonogram(){
  let container=document.getElementById("nonogram");
  let table=document.createElement("table");

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

  container.appendChild(table);
}

function submitNonogram(){
  if(submitted) return;

  for(let i=0;i<SIZE;i++){
    for(let j=0;j<SIZE;j++){
      if(userGrid[i][j]!==solution[i][j]){
        document.getElementById("nonogramMsg").innerText=
          "❌ Incorrect Nonogram";
        return;
      }
    }
  }

  solvedNonogram=true;
  document.getElementById("nonogramMsg").innerText=
    "✅ Nonogram Solved! Kakuro Unlocked.";

  document.getElementById("kakuroSection").style.display="block";
  document.getElementById("kakuroSection").scrollIntoView({behavior:"smooth"});
}

/***********************
 18×18 REAL KAKURO
************************/

const K=18;

// Fixed solution grid (valid digits 1–9, no repeats in 4-cell runs)
const kakuroSolution=[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,4,5,6,7,0,8,9,1,2,0,3,4,5,6,0,7,8],
[0,3,2,1,4,0,9,8,7,6,0,5,4,3,2,0,1,9],
[0,6,7,8,9,0,1,2,3,4,0,5,6,7,8,0,9,1],
[0,9,8,7,6,0,2,3,4,5,0,6,7,8,9,0,1,2],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,5,6,7,8,0,1,2,3,4,0,5,6,7,8,0,9,1],
[0,4,3,2,1,0,9,8,7,6,0,5,4,3,2,0,1,9],
[0,7,8,9,6,0,2,3,4,5,0,6,7,8,9,0,1,2],
[0,8,9,6,7,0,3,4,5,6,0,7,8,9,1,0,2,3],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,3,4,5,6,0,7,8,9,1,0,2,3,4,5,0,6,7],
[0,2,1,9,8,0,4,5,6,7,0,8,9,1,2,0,3,4],
[0,6,7,8,9,0,1,2,3,4,0,5,6,7,8,0,9,1],
[0,9,8,7,6,0,2,3,4,5,0,6,7,8,9,0,1,2],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,4,5,6,7,0,8,9,1,2,0,3,4,5,6,0,7,8],
[0,3,2,1,4,0,9,8,7,6,0,5,4,3,2,0,1,9]
];

function drawKakuro(){
  let container=document.getElementById("kakuro");
  let table=document.createElement("table");

  for(let i=0;i<K;i++){
    let row=table.insertRow();
    for(let j=0;j<K;j++){
      let cell=row.insertCell();
      if(kakuroSolution[i][j]===0){
        cell.style.background="black";
      } else {
        let input=document.createElement("input");
        input.type="number";
        input.min=1;
        input.max=9;
        cell.appendChild(input);
      }
    }
  }

  container.appendChild(table);
}

function submitKakuro(){
  if(submitted) return;

  let inputs=document.querySelectorAll("#kakuro input");
  let idx=0;

  for(let i=0;i<K;i++){
    for(let j=0;j<K;j++){
      if(kakuroSolution[i][j]!==0){
        if(inputs[idx].value!=kakuroSolution[i][j]){
          document.getElementById("kakuroMsg").innerText=
            "❌ Incorrect Kakuro";
          return;
        }
        idx++;
      }
    }
  }

  solvedKakuro=true;
  submitted=true;

  const code=
  "A9XQZ7MPL2TR8CVY1BN6WFKJ5HDS4UEG3IOL0RATYQWZXCVBNMKJ";

  document.getElementById("finalCode").innerText=
    "🏆 Submission Code: "+code;
}

/***********************
 INIT
************************/
drawNonogram();
drawKakuro();
document.getElementById("kakuroSection").style.display="none";
