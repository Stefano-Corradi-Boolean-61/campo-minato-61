
const main = document.querySelector('.game-wrapper');
const BOMBS_NUMBER = 16;
document.getElementById('play').addEventListener('click', play);
let bombs = [];
let score = 0;

// inizializzo il gioco
function play(){

  // leggo l'indice del livello scelto dal value
  const level = document.getElementById('level').value;
  const gridLevels = [100,81,49];
  // in base all'indice ottengo il numero di celle
  const cellNumbers = gridLevels[level];
  
  reset(cellNumbers);
  
  console.log('bombs', bombs);
  
  //console.log('cellNumbers', cellNumbers);

  // delego a una funzione la generazione del piano di gioco
  // passo a questa funzione il nimero di celle da stampare
  generatePlayground(cellNumbers);

}

function generatePlayground(cellNumbers){

  const grid = document.createElement('div');
  grid.className = 'grid';

  for(let i = 1; i <= cellNumbers; i++){

    // delelgo a una funzione la grnerazione della cella passando numero di celle e indice
    const cell = generateCell(i, cellNumbers);
    grid.append(cell);
  }

  main.append(grid);

}

function generateCell(cellId, cellNumbers){
  
  const cell = document.createElement('div');
  cell.className = 'cell';

  // soluzione del calcolo dinamico della dimensione delle celle
  // const cellsPerRow = Math.sqrt(cellNumbers);
  // const cellSize = `calc(100% / ${cellsPerRow})`;
  // cell.style.width = cellSize;
  // cell.style.height = cellSize;

  // aggiungo la classe square concatenando il numero di celle
  cell.classList.add('square'+cellNumbers);
  cell.innerHTML = `<span>${cellId}</span>`;

  // creo la proprietà custom myNymber per andarla a leggere al click
  cell.cellId = cellId;

  // handleClickCell è la funzione scatenata dal click della cella
  cell.addEventListener('click', handleClickCell);

  return cell;
}

// funzione scatenata dal click della cella
function handleClickCell(){
  /*
    1. contare i click
    2. "leggere" il numero della cella
    3. verificare se il numero è presente nell'array delle bombe
    4. se NO aggiungere la classe clicked
    5. se SI attivare la procedura di fine gioco :-)
  */

  // punto 1 modalità meno evoluta:
  // const myNumber = parseInt(this.innerText);
  // console.log(myNumber);
  
  // punto 1 modalità più strutturata
  console.log(this.cellId);

  //console.log(this);
  
  // click non bomba (se l'ID della cella non è poresente nell'elenco delle bombe)
  if(!bombs.includes(this.cellId)){
    // se non è bomba ingremento il conteggio delle giocate
    score++;
    this.classList.add('clicked');
    console.log('OK', this.cellId);
    const cells = document.getElementsByClassName('cell');
    // se i click sono uguali a tutte le celle meno il numero di bombe ho vinto
    if(score === cells.length - BOMBS_NUMBER){
      printEndGame('Hai Vinto!!!');
    }
  }else{
    // bomba!
    endGame(this);
  }
}

function endGame(el){
  console.log('FINE')
  el.classList.add('bomb');
  const endMsg = `<h3 class="py-3">Gioco finito! Numero di tentativi: ${score} su ${BOMBS_NUMBER} bombe</h3>`;
  printEndGame(endMsg);
}

function printEndGame(endMsg){
  document.querySelector('.endMessage').innerHTML = endMsg;
  showBombs();
  const endGameHtmlLevel = document.createElement('div');
  endGameHtmlLevel.className = 'endGame';
  main.append(endGameHtmlLevel);
}

function showBombs(){
  // prendo tutte le celle
  const cells = document.getElementsByClassName('cell');
  // le ciclo per verificare se l'indice è presente nell'elenco delle bombe
  for(let i = 0; i < cells.length; i++){
    if(bombs.includes(i + 1)){
      cells[i].classList.add('bomb');
    }

  }
  console.log(cells);
}

function generateBombs(cellNumbers){
  const generatedBombs = [];

  // effettuo il ciclo fino a quando la lunghezza dell'array delle bombe non raggiunge in numero di bombe necessario
  while(generatedBombs.length < BOMBS_NUMBER){
    const bomb = generateRandomInt(1, cellNumbers);
    //console.log('bomb', bomb);
    // effettuo il push solo se la bomba estratta non è già presente
    if(!generatedBombs.includes(bomb)){
      generatedBombs.push(bomb);
    }
  }

  return generatedBombs;
}


function reset(cellNumbers){
  // sovrescrivo il contenuto del main con una stringa vuota
  bombs = generateBombs(cellNumbers);
  main.innerHTML = '';
  document.querySelector('.endMessage').innerHTML = '';
}

function generateRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
