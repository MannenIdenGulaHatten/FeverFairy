const testCanvas = document.getElementById("testCanvas");
const ctx = testCanvas.getContext("2d");

const imgBanana = new Image();
imgBanana.src="testbanan-removebg-preview.png"
imgBanana.onload = function() {
    ctx.drawImage(imgBanana, 250, 250);
};

imgBanana.addEventListener("mouseover", () => {
    imgBanana.src="testbananBorder.png"
})