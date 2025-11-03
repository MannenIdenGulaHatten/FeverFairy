const testCanvas = document.getElementById("testCanvas");
const ctx = canvas.getContext("2d");

const image = new image();
img.src="testbanan-removebg-preview.png"
img.onload = function() {
    ctx.drawImage(img, 50, 50);
};