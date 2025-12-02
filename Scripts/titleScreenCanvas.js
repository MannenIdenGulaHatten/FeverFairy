const canvas = document.getElementById("titleScreen");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'images/title_screen.png';

const img2 = new Image();
img2.src = 'images/title_screen_start.png';

const img3 = new Image();
img3.src = 'images/title_screen_credits.png';

const img4 = new Image();
img4.src = 'images/title_screen_exit.png';



let currentImg = img;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const hoverX = event.clientX - rect.left;
  const hoverY = event.clientY - rect.top;
  console.log(hoverX+' '+hoverY);

  if (hoverX >= 530 && hoverX <= 730 && hoverY >= 300 && hoverY <= 365) {
      currentImg = img2; 
    } else if (hoverX >= 530 && hoverX <= 730 && hoverY >= 370 && hoverY <= 440) {
      currentImg = img3; 
    } else if (hoverX >= 530 && hoverX <= 730 && hoverY >= 445 && hoverY <= 515) {
      currentImg = img4; 
    } else {
      currentImg = img; 
    }
  });

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
    
  if (x >= 530 && x <= 730) {
    if (y >= 300 && y <= 365)
      location.replace("/feverfairy/levelselect.html");
    else if (y >= 370 && y <= 440)
      location.replace("/feverfairy/credits.html");
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
}

img.onload = draw;
