const smallStoneImage = new Image();
smallStoneImage.src = "Images/BollTEST3 mindre.png";

//använd senare när samir har placerat stenen




let color = "red"
const button = document.getElementById("removeButton");

if (color === "red") {
    button.style.display = "inline-block"
} else { 
    button.style.display = "none"
}

function removeMonster(button) {
    button.style.display = "none"; // hides the button but with inline style
}

function wiggle() {

}