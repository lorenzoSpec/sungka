
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
  IMG.setAttribute('style', `position: absolute; top: ${randomized()}vw; left: ${randomized()}vw;`);

  return IMG;
}

/* randomized: minimum of 0.22 and maximum of 1.9 */
function randomized(){
  const MIN = 0.22;
  const MAX = 1.9;
  
  return Math.random() * (MAX - MIN) + MIN;
}

window.addEventListener('load', putSevenDiamond);