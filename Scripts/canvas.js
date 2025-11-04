const canvas = document.getElementById('kitchenCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = 'Images/GameOnKitchen.png'; // backround ima ge

let mouseX = canvas.width / 2; // gör så att "ljuset" börjar i mitten av skärmen
let mouseY = canvas.height / 2;

// flashlight circle size
const radius = 80;
// how much the room "moves" when you move the cursor
const maxShiftX = 200;
const maxShiftY = 200;


// clamp and lerp functions stolen from samir aswell as some other stuff but what it does is make giveen max and minimum so that the mouse / light dosent go outside the screen)
function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
}
function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}

let currentX = mouseX; //circle at mouse position
let currentY = mouseY;
// takes mouse position when move mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // circle / lighft follows mouse
    currentX = lerp(currentX, clamp(mouseX, 0, canvas.width), 0.5);
    currentY = lerp(currentY, clamp(mouseY, 0, canvas.height), 0.5);
    //paralax effect
    const backgroundgOffsetX = (mouseX / canvas.width - 0.5) * maxShiftX;
    const backroundgOffsetY = (mouseY / canvas.height - 0.5) * maxShiftY;

    // dark background / who turned of the lights?
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // cuts out a circle that is the flashlight light with ctx.clip()
    ctx.save(); 
    ctx.beginPath();
    ctx.arc(currentX, currentY, radius, 0, Math.PI * 2); 
    ctx.clip();
    ctx.drawImage(img, -backgroundgOffsetX, -backroundgOffsetY, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)'; //  gives the light a red color light with 10 % oppacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.restore();

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

img.onload = draw;


