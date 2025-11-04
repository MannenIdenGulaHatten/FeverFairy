const canvas = document.getElementById('kitchenCanvas');
const ctx = canvas.getContext('2d');

// Load the image
const img = new Image();
img.src = 'BollTEST3 mindre.png';

// Position and size of the image
let imgX = 800;
let imgY = 840;
let imgWidth = 200;
let imgHeight = 150;

//  to use later when color is certain colors
let imageVisible = true;

img.onload = function() {
  draw();
}

// Draw it function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas 
  if (imageVisible) {
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
  }
}

// when you click
canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // if click is inside the image 
  if (imageVisible &&
      mouseX >= imgX && mouseX <= imgX + imgWidth &&
      mouseY >= imgY && mouseY <= imgY + imgHeight) {
    imageVisible = false; // hide the image
    draw(); // redraw canvas
  }
});