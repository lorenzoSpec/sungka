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
  winner();
  highlightHouseP1();
  h1andBarP1();
  eventsForHouse('player-one');
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

/*==================================================================================
 
    PLAYER TWO TURN
 
 ==================================================================================*/


/* highlight the houses and bar of player one */
function playerTwoTurn(){
  winner();
  highlightHouseP2();
  h1andBarP2();
  eventsForHouse('player-two');
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

/*==================================================================================
 
    DECLARE THE WINNER
 
 ==================================================================================*/

/* Function for decalriing winner */
function winner(){
  let head1Total = PLAYER1HEAD.children.length - 1;
  let head2Total = PLAYER2HEAD.children.length - 1;
  let finish = [];

  for(let i = 0; i < PLAYER1SIDE.length; i++){
    if(PLAYER1SIDE[i].children.length > 1){
      finish.push(true);
    } else {
      finish.push(false);
    }
  }

  for(let i = 0; i < PLAYER2SIDE.length; i++){
    if(PLAYER2SIDE[i].children.length > 1){
      finish.push(true);
    } else {
      finish.push(false);
    }
  }

  let finalWinner = head1Total > head2Total ? ['Player 1', head1Total] : head1Total === head2Total  ? ['Draw', head1Total] : ['Player 2', head2Total] ;
  let finalLose = head1Total > head2Total ? ['Player 2', head2Total] : head1Total === head2Total  ? ['Draw', head2Total] : ['Player 1', head1Total] ;

  if(finish.indexOf(true) === - 1){
    winnerIndication(finalWinner, finalLose);
  }
}

/* text awarding the winner */
function winnerIndication(finalWinner, lose){
  const CONT = document.createElement('div');
  const DIV1 = document.createElement('div');
  const DIV2 = document.createElement('div');
  const DIV3 = document.createElement('div');
  const DIV4 = document.createElement('div');
  const WINNER = document.createElement('p');
  const LOSE = document.createElement('p');
  const IMG = document.createElement('img');
  const TOTALDIASW = document.createElement('p');
  const TOTALDIASL = document.createElement('p'); 
  const BUTTON = document.createElement('button');

  CONT.setAttribute('id', 'winner-cont');
  DIV1.setAttribute('id', 'div-one');
 
  DIV3.setAttribute('class', 'dias-win-lose');
  DIV4.setAttribute('class', 'dias-win-lose');
  WINNER.setAttribute('id', 'winner-p');
  LOSE.setAttribute('id', 'lose-p');
  IMG.setAttribute('class', 'winner-indication');
  IMG.setAttribute('src', 'img/diamond.svg');
  IMG.setAttribute('alt', 'diamond');
  TOTALDIASW.setAttribute('id', 'total-win');
  TOTALDIASL.setAttribute('id', 'total-lose');
  BUTTON.setAttribute('id', 'btn-new-game');

  let winnerTxt;
  let loseTxt;
  let totalWinTxt = document.createTextNode(finalWinner[1]);
  let totalLoseTxt = document.createTextNode(lose[1]);
  let btnTxt = document.createTextNode('New Game');
  let anotherImg = IMG.cloneNode(true);

  if(finalWinner[0] === 'Player 1' || finalWinner[0] === 'Player 2'){
    winnerTxt = document.createTextNode('Winner: ' + finalWinner[0]);
    loseTxt = document.createTextNode(lose[0]);
    DIV2.setAttribute('id', 'div-two');
  } else {
    winnerTxt = document.createTextNode('Draw: ' + 'Player 1');
    loseTxt = document.createTextNode('Player 2');
    DIV2.setAttribute('id', 'div-two-draw');
  }

  CONT.appendChild(DIV1);
  CONT.appendChild(DIV2);
  CONT.appendChild(BUTTON);
  DIV1.appendChild(WINNER);
  DIV1.appendChild(DIV3);
  DIV2.appendChild(LOSE);
  DIV2.appendChild(DIV4);
  DIV3.appendChild(IMG);
  DIV3.appendChild(TOTALDIASW);
  DIV4.appendChild(anotherImg);
  DIV4.appendChild(TOTALDIASL);
  WINNER.appendChild(winnerTxt);
  LOSE.appendChild(loseTxt);
  TOTALDIASW.appendChild(totalWinTxt);
  TOTALDIASL.appendChild(totalLoseTxt);
  BUTTON.appendChild(btnTxt);

  BUTTON.addEventListener('click', reloadPage);
  
  BODY.appendChild(CONT);
}

/* reload the page */
function reloadPage(){
  location.reload();
}

/*==================================================================================
 
    FUNCTIONALITIES
 
 ==================================================================================*/

/* put event listeners for houses on player one side */
function eventsForHouse(whichPlayer){
  let thisPlayer = whichFunc(whichPlayer);
  let isEmpty = [];

  for(let i = 0; i < thisPlayer.length; i++){
    if(thisPlayer[i].children.length > 1){
      isEmpty.push(true);
      thisPlayer[i].addEventListener('click', varNamesP1[i] = deleteDiamond.bind(thisPlayer[i], thisPlayer[i], whichPlayer));
      thisPlayer[i].style.cursor = 'grab';
    } else {
      isEmpty.push(false);
    }
  }

  if(isEmpty.indexOf(true) === -1){
    passIndication();
    passAndCallOtherFunction(whichPlayer);
  }
}

/* know who made the function called */
function passAndCallOtherFunction(whichPlayer){
  setTimeout(() => {
    if(whichPlayer === 'player-one'){
      playerTwoTurn();
    } else if (whichPlayer === 'player-two'){
      playerOneTurn();
    }
  }, 1500);
}

/* text for passing  */
function passIndication(){
  const CONT = document.createElement('div');
  const PASS = document.createElement('p');

  const PTEXT = document.createTextNode('PASS');

  CONT.setAttribute('id', 'diamond-count-on-hand');
  PASS.setAttribute('id', 'p-dcoh');

  CONT.appendChild(PASS);
  PASS.appendChild(PTEXT);

  BODY.appendChild(CONT);

  setTimeout(() => {
    BODY.removeChild(CONT);
  }, 1500);
}

/* know which player call this functions */
function whichFunc(whichPlayer){
  if(whichPlayer === 'player-one'){
    return PLAYER1SIDE;
  } else if (whichPlayer === 'player-two'){
    return PLAYER2SIDE;
  }
}

/* delete the diamonds on houses that are clicked */
function deleteDiamond(el, whichPlayer){
  
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
  clearUpP1(whichPlayer);
  distributeDiamonds(el, saveDiamonds, whichPlayer)
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

  setTimeout(() => {
    BODY.appendChild(CONT);
  }, 300);
}

/* clear highlights and event listeners after the user clicked one of his house */
function clearUpP1(whichPlayer){
  let thisPlayer2 = whichFunc(whichPlayer);

  for(let i = 0; i < thisPlayer2.length; i++){
    thisPlayer2[i].classList.remove('player-house-highlight');
    thisPlayer2[i].classList.add('player-house-non-highlight');
    thisPlayer2[i].removeEventListener('click', varNamesP1[i]);
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

 /* function for distributing diamonds */
function distributeDiamonds(el, saveDiamonds, whichPlayer){
  let reversedSide2 = [...PLAYER2SIDE].reverse();
  let toBeFilled = whichFunc2(whichPlayer, reversedSide2);

  addOneByOne(el, saveDiamonds, toBeFilled, whichPlayer);
}

/* know who made the function call 2 (thos have different results) */
function whichFunc2(whichPlayer, reversedSide2){
  if(whichPlayer === 'player-one'){
    return [...PLAYER1SIDE, PLAYER1HEAD, ...reversedSide2];
  } else if (whichPlayer === 'player-two'){
    return [...reversedSide2, PLAYER2HEAD, ...PLAYER1SIDE];
  }
}

/* add diamonds one by one */
function addOneByOne(el, saveDiamonds, toBeFilled, whichPlayer){
  for(let i = 0; i < toBeFilled.length; i++){
    if(el.id === toBeFilled[i].id){
      setTimeout(() => {
        let counterUntil = 1;
        function adding(){
          addHighlightRemove(toBeFilled, i, counterUntil, saveDiamonds, whichPlayer);
          counter();
          updatePDOCH(saveDiamonds, counterUntil);
          counterUntil = counterUntil + 1;
          iterateDist(counterUntil, saveDiamonds, adding);
        }
        adding();
      }, 900);
    }
  };
}  

/* add highlight while one by one distributing the diamonds then remove it after */
function addHighlightRemove(toBeFilled, i, counterUntil, saveDiamonds, whichPlayer){
  let wrapIndex = (arr, index) => index % arr.length;
  
  toBeFilled[wrapIndex(toBeFilled, i + counterUntil)].appendChild(saveDiamonds[counterUntil - 1]);

  toBeFilled[wrapIndex(toBeFilled, i + counterUntil)].appendChild(saveDiamonds[counterUntil - 1]);
  toBeFilled[wrapIndex(toBeFilled, i + counterUntil - 1)].classList.remove('player-house-distribute');
  if(!toBeFilled[wrapIndex(toBeFilled, i + counterUntil - 1)].classList.contains('heads')){
    toBeFilled[wrapIndex(toBeFilled, i + counterUntil - 1)].classList.add('player-house-non-highlight');
  }
  toBeFilled[wrapIndex(toBeFilled, i + counterUntil)].classList.remove('player-house-non-highlight');
  toBeFilled[wrapIndex(toBeFilled, i + counterUntil)].classList.add('player-house-distribute');

  if(saveDiamonds.length === counterUntil){
    continueOrNot(toBeFilled[wrapIndex(toBeFilled, i + counterUntil)], whichPlayer, toBeFilled, wrapIndex, i, counterUntil);
    setTimeout(() => {
      toBeFilled[wrapIndex(toBeFilled, i + counterUntil)].classList.remove('player-house-distribute');
    }, 500);
  }
}

/* updating the count on diamond on hand */
function updatePDOCH(saveDiamonds, counterUntil){
  const PDCOH = document.getElementById('p-dcoh');

  if(saveDiamonds.length === counterUntil){
    BODY.removeChild(PDCOH.parentNode);
  }

  PDCOH.textContent = [saveDiamonds.length - counterUntil];
}

/* function to call repeateadly the adding() */
function iterateDist(counterUntil, saveDiamonds, adding){
  if(counterUntil < saveDiamonds.length + 1){
    setTimeout(() => {
      adding();
    }, 500);
  }
}

/*==================================================================================
 
    DECIDE WHAT HAPPENS AFTER THE LAST DIAMOND WAS DISTRIBUTED
 
 ==================================================================================*/

 /* deciding what happens every last diamond was ditributed */
 function continueOrNot(lastEl, whichPlayer, toBeFilled, wrapIndex, i, counterUntil){
  
  if(whichPlayer === 'player-one'){
    if(lastEl.id === 'head2'){
      playerOneTurn();
    } else if (lastEl.classList.contains('player1-side')){
      if(lastEl.children.length > 2){
        deleteDiamond(lastEl, 'player-one');
      } else if (lastEl.children.length <= 2){
        bonusTurnOver(lastEl, toBeFilled, whichPlayer);
      }
    } else if (lastEl.classList.contains('player2-side')) {
      if(lastEl.children.length > 2){
        deleteDiamond(lastEl, 'player-one');
      } else if (lastEl.children.length <= 2){
        playerTwoTurn();
      }
    }

  } else if (whichPlayer === 'player-two'){
    if(lastEl.id === 'head1'){
      playerTwoTurn();
    } else if (lastEl.classList.contains('player1-side')){
      if(lastEl.children.length > 2){
        deleteDiamond(lastEl, 'player-two');
      } else if (lastEl.children.length <= 2){
        playerOneTurn();
      }
    } else if (lastEl.classList.contains('player2-side')) {
      if(lastEl.children.length > 2){
        deleteDiamond(lastEl, 'player-two');
      } else if (lastEl.children.length <= 2){
        bonusTurnOver(lastEl, toBeFilled, whichPlayer);
      }
    }
  } 
 }

 /* capturing the diamonds of opponent */
 function bonusTurnOver(lastEl, toBeFilled, whichPlayer){
  const DATAEXCHANGE = {
    0: 14,
    1: 13,
    2: 12,
    3: 11,
    4: 10,
    5: 9,
    6: 8,
    7: null,
    8: 6,
    9: 5,
    10: 4, 
    11: 3,
    12: 2,
    13: 1,
    14: 0
  }

  let saveBonus = [];
  let indexLastEl = toBeFilled.indexOf(lastEl);
  let oppositeIndex = toBeFilled[DATAEXCHANGE[indexLastEl]].id;
  let oppositeEl = document.getElementById(oppositeIndex);

  let lastElD = lastEl.children;
  let oppositeElD = oppositeEl.children;

  if(oppositeElD.length > 1){
    for(let i = 0; i < lastElD.length; i++){
      if(lastElD[i].classList.contains('diamond-class')){
        saveBonus.push(lastElD[i]);
      }
    }
  
    for(let i = 0; i < oppositeElD.length; i++){
      if(oppositeElD[i].classList.contains('diamond-class')){
        saveBonus.push(oppositeElD[i]);
      }
    }
  
    setTimeout(() => {
      let lastIlan = lastElD.length - 1;
      saveBonus.forEach((x, index) => {
        if(index < lastIlan){
          lastEl.removeChild(x);
        } else {
          oppositeEl.removeChild(x);
        }
        counter();
      });
  
      bonusIndication(saveBonus);
      bonusGoesHere(whichPlayer, saveBonus);
    }, 500);
  } else if (oppositeElD.length <= 1){
    if(whichPlayer === 'player-one'){
      playerTwoTurn();
    } else if (whichPlayer === 'player-two'){
      playerOneTurn();
    }
  }
  
}

/* decide where the bonus will drop depends on the player */
function bonusGoesHere(whichPlayer, saveBonus){
  setTimeout(() => {
    if(whichPlayer === 'player-one'){
      saveBonus.forEach((x) => {
        PLAYER1HEAD.appendChild(x);
      });
      counter();
      setTimeout(() => {
        playerTwoTurn();
      }, 1500);
    } else if (whichPlayer === 'player-two'){
      saveBonus.forEach((x) => {
        PLAYER2HEAD.appendChild(x);
      });
      counter();
      setTimeout(() => {
        playerOneTurn();
      }, 1500);
    }
  }, 1000);
}

/* text on cpaturing */
function bonusIndication(saveBonus){
  const CONT = document.createElement('div');
  const BIGP = document.createElement('p');
  const BONUS = document.createElement('p');
  const IMGONHAND = document.createElement('img');

  const BTXT = document.createTextNode('Capture ');
  const PTEXT = document.createTextNode(saveBonus.length);

  CONT.setAttribute('id', 'diamond-count-on-hand');
  BIGP.setAttribute('id', 'big-p');
  BONUS.setAttribute('id', 'p-dcoh');

  IMGONHAND.setAttribute('src', 'img/diamond.svg');
  IMGONHAND.setAttribute('alt', 'diamond on hand');
  IMGONHAND.setAttribute('id', 'img-dcoh');

  CONT.appendChild(BIGP);
  CONT.appendChild(IMGONHAND);
  CONT.appendChild(BONUS);
  BIGP.appendChild(BTXT);
  BONUS.appendChild(PTEXT);

  BODY.appendChild(CONT);

  setTimeout(() => {
    BODY.removeChild(CONT);
  }, 1000);
}

/* clear windows events */
function clearWindowEvents(){
  window.removeEventListener('load', putSevenDiamond);
  window.removeEventListener('load', counter);
}
window.addEventListener('beforeunload', clearWindowEvents);