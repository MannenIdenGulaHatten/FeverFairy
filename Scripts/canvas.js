const canvas = document.getElementById('kitchenCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
let room = "Kitchen"
img.src = 'Images/GameOn' + room + '.png'; // backround ima ge


/*const door1 = new Image();
door1.src = 'Images/Door1.png'; // door image
const door2 = new Image();
door2.src = 'Images/Door1.png'; // door image */

let mouseX = canvas.width / 2;
let mouseY = canvas.width / 2; // makes the light start position at the center of the screen
// flashlight circle size
const radius = 800;
// how much the room "moves" when you move the cursor
const maxShiftX = 200;
const maxShiftY = 200;

// game variables (set when select difficulty)
let fever = 0;
let maxFever = 67;
let difficulty = "None";
let objectsFound = 0;
let colorFreq = 440; // red: 440, green: 565, blue: 645 THz

class imageMonsters {           // this class makes it possible to easily make and place images on the canvas and the setting same paralaxx function as the backround. /can increase it)
  constructor(src, x, y, width, height, paralaxx = 1) { //paralax = 1 makes it so that it has same paralax as backround .5 would be haalf and 2 would be doubble
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.paralaxx = paralaxx;
    this.image = new Image();
    this.image.src = src;
    this.loaded = false;
    this.visible = true;
    this.image.onload = () => (this.loaded = true); // makes it wait for the images to load
  }

  draw(ctx) {
    if (this.loaded && this.visible) {
      const offsetX = (mouseX / canvas.width - 0.5) * maxShiftX;
      const offsetY = (mouseY / canvas.height - 0.5) * maxShiftY;

      ctx.drawImage( // gör paralaxx för bilderna
        this.image,
        this.x - offsetX * this.paralaxx, 
        this.y - offsetY * this.paralaxx,
        this.width,
        this.height
      ); 
    }
  }

    ifMonsterClicked(x, y){
        const offsetX = (mouseX / canvas.width - 0.5) * maxShiftX * this.paralaxx;
        const offsetY = (mouseY / canvas.height - 0.5) * maxShiftY * this.paralaxx;

        const paralaxY = this.y - offsetY;
        const paralaxX = this.x - offsetX;

        return (
            x >= paralaxX &&
            x <= paralaxX + this.width &&

            y >= paralaxY &&
            y <= paralaxY + this.height
        );
    }
}


const monster = [ // this is where you decide the cordinates you place the images and their height and width // aswell as how much paralaxx you want
    new imageMonsters('Images/BollTEST3 mindre.png', 600, 300, 50, 50, 1), //x pos, y pos, width, height, paralax effekt
    new imageMonsters('Images/BollTEST3 mindre.png', 300, 200, 50, 50, 1),
    new imageMonsters('Images/BollTEST3 mindre.png', 100, 500, 50, 50, 1),
];



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
    console.log (mouseX + ' ' + mouseY)
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // circle / lighft follows mouse
    currentX = lerp(currentX, clamp(mouseX, 0, canvas.width), 0.5);
    currentY = lerp(currentY, clamp(mouseY, 0, canvas.height), 0.5);
    //paralax effect
    const backgroundgOffsetX = (mouseX / canvas.width - 0.5) * maxShiftX; 
    const backroundgOffsetY = (mouseY / canvas.height - 0.5) * maxShiftY;

    /*const stenX =600;
    const stenY =300;
    const stenOffsetX = (mouseX / canvas.width - 0.5) * maxShiftX; // paralax effect for testrock
    const stenOffsetY = (mouseY / canvas.height - 0.5) * maxShiftY; */

    // dark background / who turned of the lights?
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // cuts out a circle that is the flashlight light with ctx.clip()
    ctx.save(); 
    ctx.beginPath();
    ctx.arc(currentX, currentY, radius, 0, Math.PI * 2); 
    ctx.clip();

    ctx.drawImage(img, -backgroundgOffsetX, -backroundgOffsetY, canvas.width, canvas.height); //  loop that draws all the images in the monster list
    monster.forEach(m => {m.draw(ctx)});

    //ctx.drawImage(sten, stenX - stenOffsetX, stenY - stenOffsetY, 50, 50);


    /*let door1Size = getImgScaled(door1.naturalWidth, door1.naturalHeight);
    ctx.drawImage(door1, -backgroundgOffsetX, -backroundgOffsetY, door1Size.X, door1Size.Y)
    let door2Size = getImgScaled(door2.naturalWidth, door2.naturalHeight);
    ctx.drawImage(door2, -backgroundgOffsetX, -backroundgOffsetY, door2Size.X, door2Size.Y)
    */
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)'; //  gives the light a  color light with 10 % oppacity (red, green, blue, oppacity)
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

    


    /*
    if (room == "Kitchen" && ctx.isPointInPath(inBath, x, y)) {
        room = "Bathroom"
        img.src = 'Images/GameOn' + room + '.png';
    } */

    let monsterHit = false;

    for (let i = monster.length - 1; i >= 0; i-=1) { // checks if what you click is an object in the list or
        const m = monster[i];
        if (m.visible && m.ifMonsterClicked(x, y)) {
          m.visible = false; //makes it invisible
          monsterHit = true;
          break
        }
    }
    if (!monsterHit) console.log("Wrong")
});

img.onload = draw;


