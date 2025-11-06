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

const sound = new Audio('click3.ogg');

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
 

  if (y >= 150 && y <= 425) {        
    sound.play()
    .then(() => console.log('Ljudet spelas upp!'))
    .catch(err => console.error('Kunde inte spela upp ljudet:', err));
    if ((x >= 290 && x <= 400) || (x >= 840 && x <= 945)) {
        if (currentImg == img) {
        currentImg = img4;

        } else if (currentImg == img4) {
        currentImg = img;
        }
    } else if (x >= 420 && x <= 945) {
        if (currentImg == img) {
        location.replace("http://localhost:8080/FeverFairy/hardGame.html")
        } else if (currentImg == img4) {
        location.replace("http://localhost:8080/FeverFairy/game.html")
        }
    }
  }

});


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "50px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Select difficulty level", 400, 80);

  ctx.drawImage(currentImg, 420, 165, 400, 250);
  ctx.drawImage(img2, 305, 250, 80, 80);
  ctx.drawImage(img3, 855, 250, 80, 80);

  requestAnimationFrame(draw);
}

img.onload = draw;
