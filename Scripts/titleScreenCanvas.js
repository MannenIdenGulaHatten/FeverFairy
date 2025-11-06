const canvas = document.getElementById("titleScreen");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'Images/titleScreen.png';

const img2 = new Image();
img2.src = 'Images/titleScreenStartHover.png';

const img3 = new Image();
img3.src = 'Images/titleScreenCreditsHover.png';

const img4 = new Image();
img4.src = 'Images/titleScreenExitHover.png';



let currentImg = img;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const hoverX = event.clientX - rect.left;
  const hoverY = event.clientY - rect.top;
  console.log(hoverX+' '+hoverY);

  if (hoverX >= 530 && hoverX <= 730 && hoverY >= 230 && hoverY <= 290) {
      currentImg = img2; 
    } else if (hoverX >= 530 && hoverX <= 730 && hoverY >= 295 && hoverY <= 350) {
      currentImg = img3; 
    } else if (hoverX >= 530 && hoverX <= 730 && hoverY >= 355 && hoverY <= 400) {
      currentImg = img4; 
    } else {
      currentImg = img; 
    }
  });
const sound = new Audio('click3.ogg');
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
    
  if (x >= 530 && x <= 730) {
    sound.play()
    .then(() => console.log('Ljudet spelas upp!'))
    .catch(err => console.error('Kunde inte spela upp ljudet:', err));
    if (y >= 230 && y <= 290)
      location.replace("http://localhost:8080/FeverFairy/levelSelect.html");
    else if (y >= 295 && y <= 350)
      location.replace("http://localhost:8080/FeverFairy/credits.html");
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
}

img.onload = draw;
