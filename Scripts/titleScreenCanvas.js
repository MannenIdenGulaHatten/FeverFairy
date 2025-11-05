const canvas = document.getElementById("levelSelect");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'Images/hardLevel.png';

const img2 = new Image();
img2.src = 'Images/vansterSelectPil.png'
const img3 = new Image();
img3.src = 'Images/hogerSelectPil.png'
const img4 = new Image();
img4.src = 'Images/easyLevel.png'

let currentImg = img4; //default difficulty

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if ((x >= 215 && x <= 290) || (x >= 515 && x <= 580)) {
    if (currentImg == img) {
      currentImg = img4;
    } else if (currentImg == img4) {
      currentImg = img;
    }
  } else if (x >= 300 && x <= 500) {
    if (currentImg == img) {
      location.replace("http://localhost:8080/FeverFairy/hardGame.html")
    } else if (currentImg == img4) {
      location.replace("http://localhost:8080/FeverFairy/game.html")
    }
  }

});


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "50px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Select difficulty level", 175, 80);

  ctx.drawImage(currentImg, 300, 166, 200, 166);
  ctx.drawImage(img2, 220, 220, 55, 55);
  ctx.drawImage(img3, 525, 220, 55, 55);

  requestAnimationFrame(draw);
}

img.onload = draw;
