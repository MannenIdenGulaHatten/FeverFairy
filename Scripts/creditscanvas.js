const canvas = document.getElementById('creditscanvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'images/credits_org2.png';

const img2 = new Image();
img2.src = 'images/credits_hover2.png';




let currentImg = img;

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const hoverX = event.clientX - rect.left;
  const hoverY = event.clientY - rect.top;
  console.log(hoverX+' '+hoverY);
      if (hoverX >= 20 && hoverX <= 145 && hoverY >= 10 && hoverY <= 105) {
        currentImg = img2; 
        } else {
        currentImg = img; 
        }  
});

const sound = new Audio('click3.ogg');//https://gamesounds.xyz/Kenney%27s%20Sound%20Pack/UI%20Audio/click3.ogg
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
    if (x >= 20 && x <= 145 && y >= 10 && y <= 105) {
        location.replace("/feverfairy/index.html")
        currentImg = img2; 
        } else {
        currentImg = img; 
        }  
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
}

img.onload = draw;
