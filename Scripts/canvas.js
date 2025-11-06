const canvas = document.getElementById('kitchenCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
let room = "Kitchen"
img.src = 'Images/GameOn' + room + '.png'; // backround ima ge

const door1 = new Image();
door1.src = 'Images/Door1.png'; // door image
const door2 = new Image();
door2.src = 'Images/Door1.png'; // door image

let mouseX = canvas.width / 2; // gör så att "ljuset" börjar i mitten av skärmen
let mouseY = canvas.height / 2;

// flashlight circle size
const radius = 80;
// how much the room "moves" when you move the cursor
const maxShiftX = 200;
const maxShiftY = 200;

// game variables (set when select difficulty)
let fever = 0;
let maxFever = 67;
let difficulty = "None";
let objectsFound = 0;
let colorFreq = 440; // red: 440, green: 565, blue: 645 THz


// clamp and lerp functions stolen from samir aswell as some other stuff but what it does is make giveen max and minimum so that the mouse / light dosent go outside the screen)
function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
}
function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}
function getImgScaled(x, y) {
    const scaleX = x * canvas.width / 2880;
    const scaleY = y * canvas.height / 1620;
    return {X: scaleX, Y: scaleY};
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

    let door1Size = getImgScaled(door1.naturalWidth, door1.naturalHeight);
    ctx.drawImage(door1, -backgroundgOffsetX, -backroundgOffsetY, door1Size.X, door1Size.Y)
    let door2Size = getImgScaled(door2.naturalWidth, door2.naturalHeight);
    ctx.drawImage(door2, -backgroundgOffsetX, -backroundgOffsetY, door2Size.X, door2Size.Y)
    
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)'; //  gives the light a red color light with 10 % oppacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.restore();

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('click', function(event) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = event.clientX;
    const y = event.clientY;

    if (room == "Kitchen" && context.isPointInPath(inBath, x, y)) {
        room = "Bathroom"
        img.src = 'Images/GameOn' + room + '.png';
    }
});

img.onload = draw;