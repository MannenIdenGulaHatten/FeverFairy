const canvas = document.getElementById("titleScreen");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = 'Images/titleScreen.png';

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  alert(x + ' ' + y);

    if (x >= 360 && x <= 500) {
        if (y >= 210 && y <= 260)
            location.replace("http://localhost:8080/FeverFairy/levelSelect.html")
        if (y >= 265 && y <= 320)
            location.replace("http://localhost:8080/FeverFairy/credits.html")
    }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
 

  requestAnimationFrame(draw);
}

img.onload = draw;
