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

const img6 = new Image();
img6.src = 'images/button_org.png'

const img7 = new Image();
img7.src = 'images/button_hover.png'

let currentImg = img4; //default difficulty
let currentButton = img6; 
const sound = new Audio('sounds/click3.ogg');//https://gamesounds.xyz/Kenney%27s%20Sound%20Pack/UI%20Audio/click3.ogg

function changeLevel(dir) {
  sound.play()
  .then(() => console.log('Ljudet spelas upp!'))
  .catch(err => console.error('Kunde inte spela upp ljudet:', err));
  if (currentImg == img) {
    currentImg = (dir == "ArrowRight") && img4 || img5;
  } else if (currentImg == img4) {
    currentImg = (dir == "ArrowRight") && img5 || img;
  } else if (currentImg == img5) {
    currentImg = (dir == "ArrowRight") && img || img4;
  }
     else if (x >= 420 && x <= 945) {
      if (currentImg == img) {
        location.replace("/feverfairy/hardgame.html")
      } else if (currentImg == img4) {
        location.replace("/feverfairy/game.html")
      }
 }
};

function startGame(event, start, dir) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Start game with Enter
  if (start) {
    if (currentImg == img4) {
      location.replace("/feverfairy/game.html");
    }
    return;
  }

  // back to home button
  if (x >= 20 && x <= 100 && y >= 20 && y <= 100) {
    location.replace("/feverfairy/index.html");
    return;
  }

  // arrow keys for changing difficulty
  if (y >= 265 && y <= 520) {
    if (x >= 290 && x <= 400) {
      changeLevel("ArrowLeft");
    } else if (x >= 840 && x <= 945) {
      changeLevel("ArrowRight");
    } 
  }


  if (x >= 420 && x <= 820 && y >= 265 && y <= 515) {
    if (currentImg == img4) {
      location.replace("/feverfairy/game.html");
    }
  }
}

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const hoverX = event.clientX - rect.left;
  const hoverY = event.clientY - rect.top;
  console.log(hoverX+' '+hoverY);

    if (hoverX >= 20 && hoverX <= 100 && hoverY >= 20 && hoverY <= 100) {
    currentButton = img7; // hover image
  } else {
    currentButton = img6; // normal image
  }
});
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

  ctx.font = "80px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Choose who to help", 280, 135);

  ctx.drawImage(currentImg, 420, 265, 400, 250);
  ctx.drawImage(img2, 305, 350, 80, 80);
  ctx.drawImage(img3, 855, 350, 80, 80);
  ctx.drawImage(currentButton, 20, 20, 80, 80);

  requestAnimationFrame(draw);
}

img.onload = draw;
