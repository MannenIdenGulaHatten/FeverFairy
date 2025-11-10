const canvas = document.getElementById('kitchenCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const menu = new Image();
menu.src = 'Images/Menu.png'

const img = new Image();
let room = "Kitchen"
img.src = 'Images/GameOn' + room + '.png'; // backround image

const temp = new Image();
temp.src = 'Images/Thermo.png'; // temp gauge image

const flash = new Image();
flash.src = 'Images/Flashlight.png'; // temp gauge image


let mouseX = canvas.width / 2;
let mouseY = canvas.width / 2; // makes the light start position at the center of the screen
// flashlight circle size
const radius = 80;
// how much the room "moves" when you move the cursor
const maxShiftX = 200;
const maxShiftY = 200;

const gameInfo = {
    ["Easy"]: {
        difficulty: "Easy",
        startFever: 38,
        maxFever: 43,
    },
    ["Hard"]: {
        difficulty: "Hard",
        startFever: 39,
        maxFever: 42,
    }
}

const imagePopups = {
    ["Menu"]: {
        Enabled: 0,
        ImageSrc: "Images/Menu.png",
        Exit: {x1: 0, y1: 0, x2: 0, y2: 0}, // relative positions for exit button
    },
    ["Info"]: {
        Enabled: Date.now() + 1e9,
        ImageSrc: "Images/Tutorial.png",
        Exit: {x1: 0, y1: 0, x2: 0, y2: 0}, // relative positions for exit button
    }
}

// game variables (set wh
// en select difficulty)
let fever = 0;
let maxFever = 0;
let difficulty = "None";
let objectsFound = 0;
let colorFreq = 0; // red: 440, green: 565, blue: 645 THz
let feverHeight = 0;
let dead = false;
let flashCooldown = Date.now();

// sounds my freind
const sound = new Audio('Sounds/background.mp3');//https://freesound.org/people/DRFX/sounds/341807/
const sound2 = new Audio('Sounds/ambulance.mp3');//https://freesound.org/people/DRFX/sounds/341807/
const sound3 = new Audio('Sounds/click3.ogg')
const sound5 = new Audio('Sounds/doorOpen.wav')





class imageMonsters {           // this class makes it possible to easily make and place images on the canvas and the setting same paralaxx function as the backround. /can increase it)
  constructor(src, x, y, width, height, paralaxx = 1, z = 1, room, colorFreq) { //paralax = 1 makes it so that it has same paralax as backround .5 would be haalf and 2 would be doubble
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.paralaxx = paralaxx;
    this.z = z;
    this.room = room
    this.colorFreq = colorFreq
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
    //new imageMonsters('Images/BollTest3 mindre.png', 800, 310, 50, 50, 1, 2), //x pos, y pos, width, height, paralax effekt, z pos 1=furniture and then + for layers example
    new imageMonsters ('Images/kitchenBlack/Banana b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565 ),
    new imageMonsters ('Images/kitchenBlack/Basket b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/Bird b.png', 800, 310, 50, 50, 1, 2,'Kitchen',645),
    new imageMonsters ('Images/kitchenBlack/Chainsaw b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Chili b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Coathanger b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/cuttingBoard b.png', 800, 310, 50, 50, 1, 2,'Kitchen',645),
    new imageMonsters ('Images/kitchenBlack/Dishes b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/door 1 b.png', 800, 310, 50, 50, 1, 2,'Kitchen',1),
    new imageMonsters ('Images/kitchenBlack/door 2 b.png', 800, 310, 50, 50, 1, 2,'Kitchen',1),
    new imageMonsters ('Images/kitchenBlack/Flaska b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/FryingPan b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/KnifeHolder b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Monkey b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/Slide b.png', 800, 310, 50, 50, 1, 2,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Snake b.png', 800, 310, 50, 50, 1, 2,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/Tenticle b.png', 800, 310, 50, 50, 1, 2,'Kitchen',645),
    new imageMonsters ('Images/kitchenBlack/Tophat b.png', 800, 310, 50, 50, 1, 2,'Kitchen',645),
];

const furniture = [ // place furnitures here or else they dissapear when clicked on :P
    new imageMonsters ('Images/kitchenBlack/Carpet b.png', 400, 450, 530, 270, 1, 1,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Table b.png', 528, 405, 254, 149, 1, 2,'Kitchen',645),
    new imageMonsters ('Images/kitchenBlack/Counter b.png', 800, 310, 50, 50, 1, 1,'Kitchen',565),
    new imageMonsters ('Images/kitchenBlack/Fridge b.png', 750, 290, 130, 200, 1, 1,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Oven b.png', 800, 310, 50, 50, 1, 1,'Kitchen',440),
    new imageMonsters ('Images/kitchenBlack/Ovenfan b.png', 800, 310, 50, 50, 1, 1,'Kitchen',645),
    new imageMonsters ('Images/kitchenBlack/Sink b.png', 600, 355, 84, 100, 1, 1,'Kitchen',645),
];

function newGame(selectedDiff) {
    info = gameInfo[selectedDiff];

    difficulty = selectedDiff;
    fever = info.startFever;
    maxFever = info.maxFever;
    objectsFound = 0
    feverHeight = 0
    colorFreq = 440
    dead = false
}

function playMusic() {
    sound.play()
    sound.volume = 0.3
    sound.loop = true;
}

function displayPopup(popupName) {
    const popupInfo = imagePopups[popupName];

    if (popupInfo.Enabled >= Date.now()) {
        let img = new Image();
        img.src = popupInfo.ImageSrc;

        const popupWidth = canvas.width * 0.6;
        const popupHeight = (img.naturalHeight / img.naturalWidth) * popupWidth;

        const popupX = (canvas.width - popupWidth) / 2;
        const popupY = (canvas.height - popupHeight) / 2;

        popupInfo.Exit = {
            x1: popupX + popupWidth*0.75,
            y1: popupY + popupHeight*0.25,
            x2: popupX + popupWidth*0.85,
            y2: popupY + popupHeight*0.35,
        }
        ctx.drawImage(img, popupX, popupY, popupWidth, popupHeight);
    }
}


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
function scalePos(pos, type) {
    if (type == "X") {
        return pos * canvas.width / 1280;
    } else if (type == "Y") {
        return pos * canvas.height / 551;
    }
}
function increaseFever() {
    fever += 1 / 180; // increase fever by 1 every 90 seconds
}

console.log(canvas.width, canvas.height)
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
    if (fever < maxFever && !dead) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // cuts out a circle that is the flashlight light with ctx.clip()
        ctx.save(); 
        ctx.beginPath();
        ctx.arc(currentX, currentY, radius, 0, Math.PI * 2); 
        ctx.clip();

        ctx.drawImage(img, -backgroundgOffsetX, -backroundgOffsetY, canvas.width, canvas.height); //  loop that draws all the images in the monster list

        monster
        .slice() // dosent change the array permanently
        .sort((a, b) => a.z - b.z) // sorts based on Z value to create Z index
        .forEach(m => {
            if (colorFreq == m.colorFreq) { 
                m.draw(ctx)
            }
        });
    
        furniture //draws out furniture seperatley
        .slice() 
        .sort((a, b) => a.z - b.z) 
        .forEach(m => {
            if ((colorFreq == m.colorFreq || m.colorFreq == 1) && room == m.room) {
                m.draw(ctx)
            }
        });

        if (colorFreq == 440) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'; //  gives the light a  color light with 10 % oppacity (red, green, blue, oppacity)
        } else if (colorFreq == 565) {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        } else if (colorFreq == 645) {
            ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    } else {
        dead = true;
        // bro died 🤣🤣🤣
        ctx.font = "100px Cursive";
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fillText("ur dead my friend", 250, 300);
        sound.volume = 0
        sound2.play()
        sound2.volume = 0.1;    
        //startFever = 0;
        //fever = lerp(fever, 0, 0.01);
    }

    for (const index in imagePopups) {  
        displayPopup(index);
    }

    // fever gauge thermometer
    let tempSize = getImgScaled(temp.naturalWidth, temp.naturalHeight);
    let flashSize = getImgScaled(flash.naturalWidth, flash.naturalHeight);

    ctx.fillStyle = "rgb(255, 22, 0)";
    let nextHeight = clamp(lerp(feverHeight, (fever - info.startFever) / (info.maxFever - info.startFever) * 360, 0.1), 0, 360);
    ctx.fillRect(scalePos(80,"X"), 465 - nextHeight, 70, nextHeight);
    feverHeight = nextHeight

    ctx.drawImage(temp, 50, 100, tempSize.X, tempSize.Y);
    ctx.drawImage(flash, mouseX + 40, mouseY/5 + scalePos(360,"Y"), flashSize.X, flashSize.Y);

    ctx.font = "50px Cursive";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(Math.floor(fever) + "°", scalePos(75,"X"), (530));



    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('keydown', (event) => {
    nextFreq = 1; 

    if (event.key == "1") {
        nextFreq = 440; // red
    } else if (event.key == "2") {
        nextFreq = 565; // green
    } else if (event.key == "3") {
        nextFreq = 645; // blue
    }

    if (Date.now() >= flashCooldown && nextFreq != 1 && nextFreq != colorFreq) { 
        flashCooldown = Date.now() + 2000; // 200 ms cooldown

        colorFreq = 1;

        setTimeout(() => {
            colorFreq = nextFreq;
        }, 1500)
    }
});

window.addEventListener('click', function(event) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = event.clientX;
    const y = event.clientY;


    if (y >= height * 0.4 && y <= height * 0.8) {
        if (x >= width * 0.75 && x <= width * 0.9) { // if you click the menu button
            sound5.play()
            
            if (room == "Kitchen") {
                room = "Bedroom"
                img.src = 'Images/GameOn' + room + '.png';
            } else if (room == "Bathroom") {
                room = "Kitchen"
                img.src = 'Images/GameOn' + room + '.png';
            }
        } else if (x >= width * 0.1 && x <= width * 0.25) { // if you click the menu button
            sound5.play()
            
            if (room == "Kitchen") {
                room = "Bathroom"
                img.src = 'Images/GameOn' + room + '.png';
            } else if (room == "Bedroom") {
                room = "Kitchen"
                img.src = 'Images/GameOn' + room + '.png';
            }
        }
    }

    for (const index in imagePopups) {  
        let popupInfo = imagePopups[index];
        
        if (popupInfo.Enabled >= Date.now()) {
            const exit = popupInfo.Exit;

            if (x >= exit.x1 && x <= exit.x2 && y >= exit.y1 && y <= exit.y2) {
                popupInfo.Enabled = 0;
                console.log("clicked exit")
            }
        }
    }

    for (let i = furniture.length - 1; i >= 0; i-=1) { // checks if what you click is an object in the list or / furniture 
        const f = furniture[i];
    }

    let monsterHit = false;
    if (!dead) {
        let monsterHit = false;

    for (let i = monster.length - 1; i >= 0; i-=1) { // checks if what you click is an object in the list or
        const m = monster[i];
        if (m.visible && m.ifMonsterClicked(x, y)) {
          m.visible = false; //makes it invisible
          monsterHit = true;
          break
        }
    }
    if (!monsterHit) console.log("Wrong"); fever += 1;
     const sound4 = new Audio('Sounds/incorrect.mp3')
        sound4.play()
      if (y >= height * 0.4 && y <= height * 0.8) {
        if (x >= width * 0.75 && x <= width * 0.9) { // mutes incorrect sound when clicking on a door
            sound4.volume = 0
        } else if (x >= width * 0.1 && x <= width * 0.25) { // mutes incorrect sound if clicking on the bathroom door
            sound4.volume = 0
            
    
        }
      }
    }
});

setInterval(increaseFever, 500)

img.onload = draw;


