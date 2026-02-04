/*************************************************
 NATIONAL LOGIC OLYMPIAD – FULL EVENT SYSTEM
**************************************************/

let submitted=false;
let solvedNonogram=false;
let solvedKakuro=false;
let seconds=0;

/**************** TIMER *****************/
let timer=setInterval(()=>{
  if(submitted) return;
  seconds++;
  let m=Math.floor(seconds/60);
  let s=seconds%60;
  document.getElementById("timer").innerText=
  "Time: "+String(m).padStart(2,'0')+":"+String(s).padStart(2,'0');
},1000);

/**************** NONOGRAM 15x15 *****************/

const SIZE=15;

const solution=[
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

let userGrid=Array.from({length:SIZE},()=>Array(SIZE).fill(0));

function getClues(line){
  let clues=[],count=0;
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
  for(let i=0;i<SIZE;i++){
    for(let j=0;j<SIZE;j++){
      if(userGrid[i][j]!==solution[i][j]){
        document.getElementById("nonogramMsg").innerText="❌ Incorrect";
        return;
      }
    }
  }
  solvedNonogram=true;
  document.getElementById("nonogramMsg").innerText="✅ Solved!";
  document.getElementById("kakuroSection").style.display="block";
}

/**************** REAL KAKURO (SMALL BUT AUTHENTIC) *****************/

const kakuroLayout=[
["B","B",{down:16},{down:24},"B","B"],
["B",{right:23},0,0,"B","B"],
[{right:30},0,0,0,"B","B"],
["B","B","B","B","B","B"]
];

function drawKakuro(){
  let container=document.getElementById("kakuro");
  let table=document.createElement("table");

  for(let r=0;r<kakuroLayout.length;r++){
    let row=table.insertRow();
    for(let c=0;c<kakuroLayout[r].length;c++){
      let cell=row.insertCell();
      let val=kakuroLayout[r][c];

      if(val==="B"){
        cell.className="black";
      }
      else if(typeof val==="object"){
        cell.className="clue";
        cell.innerHTML=
          (val.down?`<div class="bottom">${val.down}</div>`:"")+
          (val.right?`<div class="top">${val.right}</div>`:"");
      }
      else{
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
  if(!solvedNonogram){
    document.getElementById("kakuroMsg").innerText="Solve Nonogram first";
    return;
  }

  solvedKakuro=true;
  submitted=true;
  clearInterval(timer);

  const code=
  "A9XQZ7MPL2TR8CVY1BN6WFKJ5HDS4UEG3IOL0RATYQWZXCVBNMKJ";

  document.getElementById("finalCode").innerText=
  "🏆 Submission Code: "+code;

  updateLeaderboard(seconds);
}

/**************** LEADERBOARD *****************/

function updateLeaderboard(time){
  let list=document.getElementById("leaderboard");
  let li=document.createElement("li");
  li.innerText="Completion Time: "+time+" seconds";
  list.appendChild(li);
}

/**************** INIT *****************/

drawNonogram();
drawKakuro();
