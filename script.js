/*********************
 GLOBAL STATE
**********************/
let submitted = false;
let solvedNonogram = false;
let solvedKakuro = false;

/*********************
 TIMER
**********************/
let seconds = 0;
setInterval(() => {
  if(submitted) return;
  seconds++;
  let m = Math.floor(seconds/60);
  let s = seconds%60;
  document.getElementById("timer").innerText =
    "Time: " + String(m).padStart(2,'0') + ":" +
    String(s).padStart(2,'0');
},1000);

/*********************
 NONOGRAM 15x15
**********************/
const N = 15;
const nonogramSolution = Array.from({length:N}, (_,i)=>
  Array.from({length:N}, (_,j)=> (i+j)%4===0?1:0)
);

let nonogramUser =
  Array.from({length:N},()=>Array(N).fill(0));

function drawNonogram(){
  let table = document.createElement("table");
  for(let i=0;i<N;i++){
    let row = table.insertRow();
    for(let j=0;j<N;j++){
      let cell = row.insertCell();
      cell.onclick = ()=>{
        if(submitted) return;
        cell.classList.toggle("black");
        nonogramUser[i][j]^=1;
      };
    }
  }
  document.getElementById("nonogram").appendChild(table);
}

function submitNonogram(){
  if(submitted) return;
  for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
      if(nonogramUser[i][j]!==nonogramSolution[i][j]){
        document.getElementById("nonogramMsg").innerText =
          "❌ Incorrect Nonogram";
        return;
      }
    }
  }
  solvedNonogram = true;
  document.getElementById("nonogramMsg").innerText =
    "✅ Nonogram Solved";
}

/*********************
 KAKURO 18x18
**********************/
const K = 18;
const kakuroAnswer = [];
for(let i=0;i<K;i++){
  kakuroAnswer[i]=[];
  for(let j=0;j<K;j++){
    kakuroAnswer[i][j]=(i*j)%9+1;
  }
}

function drawKakuro(){
  let table=document.createElement("table");
  for(let i=0;i<K;i++){
    let row=table.insertRow();
    for(let j=0;j<K;j++){
      let cell=row.insertCell();
      let input=document.createElement("input");
      input.type="number";
      input.min=1;
      input.max=9;
      cell.appendChild(input);
    }
  }
  document.getElementById("kakuro").appendChild(table);
}

/*********************
 FINAL SUBMIT
**********************/
function submitFinal(){
  if(submitted) return;

  if(!solvedNonogram){
    document.getElementById("kakuroMsg").innerText =
      "Solve Nonogram first";
    return;
  }

  let inputs=document.querySelectorAll("#kakuro input");
  let idx=0;
  for(let i=0;i<K;i++){
    for(let j=0;j<K;j++){
      if(inputs[idx].value!=kakuroAnswer[i][j]){
        document.getElementById("kakuroMsg").innerText =
          "❌ Incorrect Kakuro";
        return;
      }
      idx++;
    }
  }

  solvedKakuro = true;
  submitted = true;

  showCode();
}

/*********************
 FIXED 52-CHAR CODE
**********************/
function showCode(){
  const code =
  "A9XQZ7MPL2TR8CVY1BN6WFKJ5HDS4UEG3IOL0RATYQWZXCVBNMKJ";

  document.getElementById("finalCode").innerText =
    "🏆 Submission Code: " + code;
}

/*********************
 INIT
**********************/
drawNonogram();
drawKakuro();
