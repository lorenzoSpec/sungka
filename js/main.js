
/*==================================================================================
 
    GLOBAL VARIABLES
 
 ==================================================================================*/
 const PLAYER1SIDE = document.querySelectorAll('.player1-side');
 const PLAYER2SIDE = document.querySelectorAll('.player2-side');
 const PLAYER1BAR = document.getElementById('player1-bar');
 const PLAYER2BAR = document.getElementById('player2-bar');
 const H1 = document.getElementById('player-id');


/* add diamond on certain house */
function putSevenDiamond(){
  const HOUSES = document.querySelectorAll('.houses');

  for(let i = 0; i < HOUSES.length; i++){
    for(let j = 0; j < 7; j++){
      HOUSES[i].appendChild(diamond());
    }
  }
}

/* Make diamond shape */
function diamond(){
  const IMG = document.createElement('img');
  IMG.setAttribute('src', 'img/diamond.svg');
  IMG.setAttribute('style', `width: 1.5vw; position: absolute; top: ${randomized()}vw; left: ${randomized()}vw;`);

  return IMG;
}

/* randomized: minimum of 0.22 and maximum of 1.9 */
function randomized(){
  const MIN = 0.22;
  const MAX = 1.9;
  
  return Math.random() * (MAX - MIN) + MIN;
}

/* count the diamond inside */
function counter(){
  const COUNTDIV = document.querySelectorAll('.count-house');

  for(let i = 0; i < COUNTDIV.length; i++){
    COUNTDIV[i].textContent = COUNTDIV[i].parentNode.children.length - 1;
  }
}

/*==================================================================================
 
    PLAYER ONE TURN
 
 ==================================================================================*/


/* highlight the houses and bar of player one */
function playerOneTurn(){
  highlightHouseP1();
  h1andBarP1();
}

function highlightHouseP1(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].classList.remove('player-house-non-highlight');
    PLAYER1SIDE[i].classList.add('player-house-highlight');

    PLAYER2SIDE[i].classList.remove('player-house-highlight');
    PLAYER2SIDE[i].classList.add('player-house-non-highlight');
  }
}

function h1andBarP1(){
  PLAYER2BAR.classList.remove('player-turn');
  PLAYER1BAR.classList.add('player-turn');

  H1.classList.remove('big-h1');
  H1.classList.add('small-h1');

  setTimeout(() => {
    H1.classList.remove('small-h1');
    H1.classList.add('big-h1');
    H1.textContent = 'Player 1';
  }, 500);
}

/*==================================================================================
 
    PLAYER TWO TURN
 
 ==================================================================================*/


/* highlight the houses and bar of player one */
function playerTwoTurn(){
  highlightHouseP2();
  h1andBarP2();
}

function highlightHouseP2(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].classList.remove('player-house-highlight');
    PLAYER1SIDE[i].classList.add('player-house-non-highlight');

    PLAYER2SIDE[i].classList.remove('player-house-non-highlight');
    PLAYER2SIDE[i].classList.add('player-house-highlight');
  }
}

function h1andBarP2(){
  PLAYER1BAR.classList.remove('player-turn');
  PLAYER2BAR.classList.add('player-turn');
 
  H1.classList.remove('big-h1');
  H1.classList.add('small-h1');

  setTimeout(() => {
    H1.classList.remove('small-h1');
    H1.classList.add('big-h1');
    H1.textContent = 'Player 2';
  }, 500);
}

window.addEventListener('load', putSevenDiamond);
window.addEventListener('load', counter);
window.addEventListener('load', function(){
  this.setTimeout(function(){
    playerOneTurn();
  }, 1000);
});