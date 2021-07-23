
/*==================================================================================
 
    GLOBAL VARIABLES
 
 ==================================================================================*/
 const BODY = document.getElementById('body');
 const PLAYER1SIDE = document.querySelectorAll('.player1-side');
 const PLAYER2SIDE = document.querySelectorAll('.player2-side');
 const PLAYER1HEAD = document.getElementById('head2');
 const PLAYER2HEAD = document.getElementById('head1');
 const PLAYER1BAR = document.getElementById('player1-bar');
 const PLAYER2BAR = document.getElementById('player2-bar');
 const H1 = document.getElementById('player-id');

 let varNamesP1 = [];
 for(let i = 0; i < PLAYER1SIDE.length; i++){
   varNamesP1.push('getDias'+i);
 }

/*==================================================================================
 
    ABOUT THE DIAMOND AND THE COUNT OF IT
 
 ==================================================================================*/

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
  IMG.setAttribute('class', 'diamond-class');
  IMG.setAttribute('alt', 'diamond');
  IMG.setAttribute('style', `top: ${randomized()}vw; left: ${randomized()}vw;`);

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
  const COUNTHEAD = document.querySelectorAll('.count-head');

  for(let i = 0; i < COUNTDIV.length; i++){
    COUNTDIV[i].textContent = COUNTDIV[i].parentNode.children.length - 1;
  }

  for(let i = 0; i < COUNTHEAD.length; i++){
    COUNTHEAD[i].textContent = COUNTHEAD[i].parentNode.children.length - 1;
  }
}

window.addEventListener('load', putSevenDiamond);
window.addEventListener('load', counter);

/*==================================================================================
 
    PLAYER ONE TURN
 
 ==================================================================================*/


/* highlight the houses and bar of player one */
function playerOneTurn(){
  highlightHouseP1();
  h1andBarP1();
  eventsForHouseP1();
}

/* highlight the houses of player one */
function highlightHouseP1(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].classList.remove('player-house-non-highlight');
    PLAYER1SIDE[i].classList.add('player-house-highlight');

    PLAYER2SIDE[i].classList.remove('player-house-highlight');
    PLAYER2SIDE[i].classList.add('player-house-non-highlight');
  }
}

/* highlight the player one h1 and bar */
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

/* put event listeners for houses on player one side */
function eventsForHouseP1(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].addEventListener('click', varNamesP1[i] = deleteDiamond.bind(PLAYER1SIDE[i], PLAYER1SIDE[i]));
  }
}

/* delete the diamonds on houses that are clicked */
function deleteDiamond(el){
  
  let saveDiamonds = [];

  for(let i = 0; i < el.children.length; i++){
    if(el.children[i].classList[0] === 'diamond-class'){
      saveDiamonds.push(el.children[i]);
    }
  }

  if(saveDiamonds.length > 0){
    saveDiamonds.forEach(x => {
      x.classList.add('diamond-class-hide');
    });

    setTimeout(()=> {
      saveDiamonds.forEach(x => {
        el.removeChild(x);
        x.classList.remove('diamond-class-hide');
        counter();
      });
    }, 99);
  }
  
  diamondOnHand(saveDiamonds);
  clearUpP1();
  distributeDiamonds(el, saveDiamonds)
}

/* append the diamond on hand in the center of screen */
function diamondOnHand(saveDiamonds){
  const CONT = document.createElement('div');
  const IMGONHAND = document.createElement('img');
  const PONHAND = document.createElement('p');

  const PTEXT = document.createTextNode(saveDiamonds.length);

  CONT.setAttribute('id', 'diamond-count-on-hand');

  IMGONHAND.setAttribute('src', 'img/diamond.svg');
  IMGONHAND.setAttribute('alt', 'diamond on hand');
  IMGONHAND.setAttribute('id', 'img-dcoh');

  PONHAND.setAttribute('id', 'p-dcoh');

  CONT.appendChild(IMGONHAND);
  CONT.appendChild(PONHAND);
  PONHAND.appendChild(PTEXT);

  BODY.appendChild(CONT);
}

function clearUpP1(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].classList.remove('player-house-highlight');
    PLAYER1SIDE[i].classList.add('player-house-non-highlight');
    PLAYER1SIDE[i].removeEventListener('click', varNamesP1[i]);
  }
}

window.addEventListener('load', function(){
  this.setTimeout(function(){
    playerOneTurn();
  }, 1000);
});

/*==================================================================================
 
    DISTRIBUTE THE DIAMONDS
 
 ==================================================================================*/

function distributeDiamonds(el, saveDiamonds){
  const PDCOH = document.getElementById('p-dcoh');
  let reversedSide2 = [...PLAYER2SIDE].reverse();
  let toBeFilled = [...PLAYER1SIDE, PLAYER1HEAD, ...reversedSide2];
  

  for(let i = 0; i < toBeFilled.length; i++){
    if(el.id === toBeFilled[i].id){

      setTimeout(() => {
        let counterUntil = 1;

        function adding(){
          
          toBeFilled[i + counterUntil].appendChild(saveDiamonds[counterUntil - 1]);
          counterUntil = counterUntil + 1;
          PDCOH.textContent = [saveDiamonds.length - counterUntil + 1];

          counter();
          

          if(counterUntil < saveDiamonds.length + 1){
            setTimeout(() => {
              adding();
              //console.log(counterUntil);
            }, 500);
          }
        }
        adding();
      }, 1000);

    }
  };
}

/*==================================================================================
 
    PLAYER TWO TURN
 
 ==================================================================================*/


/* highlight the houses and bar of player one */
function playerTwoTurn(){
  highlightHouseP2();
  h1andBarP2();
}


/* highlight the houses of player two side */
function highlightHouseP2(){
  for(let i = 0; i < PLAYER1SIDE.length; i++){
    PLAYER1SIDE[i].classList.remove('player-house-highlight');
    PLAYER1SIDE[i].classList.add('player-house-non-highlight');

    PLAYER2SIDE[i].classList.remove('player-house-non-highlight');
    PLAYER2SIDE[i].classList.add('player-house-highlight');
  }
}

/* highlight the player two h1 and bar */
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