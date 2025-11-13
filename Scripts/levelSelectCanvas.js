const canvas = document.getElementById("levelSelect");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'images/hardlevel.png';

const img2 = new Image();
img2.src = 'images/vansterselectpil.png'

const img3 = new Image();
img3.src = 'images/hogerselectpil.png'

const img4 = new Image();
img4.src = 'images/easylevel.png'

const img5 = new Image();
img5.src = 'images/gw_card.png'


let currentImg = img4; //default difficulty

const sound = new Audio('sounds/click3.ogg');//https://gamesounds.xyz/Kenney%27s%20Sound%20Pack/UI%20Audio/click3.ogg

function changeLevel(dir) {
  sound.play()
  .then(() => console.log('Ljudet spelas upp!'))
  .catch(err => console.error('Kunde inte spela upp ljudet:', err));
  if (currentImg == img) {
    currentImg = (dir == "ArrowLeft") && img4 || img5;
  } else if (currentImg == img4) {
    currentImg = (dir == "ArrowLeft") && img5 || img;
  } else if (currentImg == img5) {
    currentImg = (dir == "ArrowLeft") && img || img4;
  }
}

function startGame(event, start, dir) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (start) {
    if (currentImg == img4) {
      location.replace("/feverfairy/game.html")
    }
  }

  if (y >= 150 && y <= 425) {        
    if ((x >= 290 && x <= 400) || (x >= 840 && x <= 945)) {          
      changeLevel(dir || ((x >= 290 && x <= 400) && "ArrowLeft") ||"ArrowRight");
    } else if (x >= 420 && x <= 945) {
        if (currentImg == img4) {
          location.replace("/feverfairy/game.html")
        }
    }
  }
}

canvas.addEventListener('click', (event) => {
   startGame(event, false);
});

document.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    startGame(event, true);
  } 
  if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
    changeLevel(event.key);
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "50px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Choose who to help", 400, 80);

  ctx.drawImage(currentImg, 420, 165, 400, 250);
  ctx.drawImage(img2, 305, 250, 80, 80);
  ctx.drawImage(img3, 855, 250, 80, 80);

  requestAnimationFrame(draw);
}

img.onload = draw;
