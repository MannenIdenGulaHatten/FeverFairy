window.addEventListener("DOMContentLoaded", (event) => {
    const follower = document.querySelector('.follower');
    const background = document.querySelector('.background');
    let mouseX = 0;
    let mouseY = 0;

    function clamp(num, min, max) {
        return Math.max(Math.min(num, max), min)
    }
    function lerp(x, y, a) {
        return x * (1 - a) + y * a;
    }

    function updatePositions() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const circleStyle = window.getComputedStyle(follower);
        const cLeft = parseFloat(circleStyle.left);
        const cTop = parseFloat(circleStyle.top);
        const leave = height / 5;
        const bgStyle = window.getComputedStyle(background);
        const bgLeft = parseFloat(bgStyle.left);
        const bgTop = parseFloat(bgStyle.top);

        if (mouseX > cLeft + leave || mouseX < cLeft - leave || mouseY > cTop + leave || mouseY < cTop - leave) {
            follower.style.left = `${lerp(cLeft, clamp(mouseX, height/4, width - height/4), 0.05)}px`;
            follower.style.top = `${lerp(cTop, clamp(mouseY, height/4, height - height/4), 0.05)}px`;

            background.style.left = `${lerp(bgLeft, clamp((width - mouseX * 1.5) - width/0.75, -width*1, width*1), 0.05)}px`;
            background.style.top = `${lerp(bgTop, clamp((height - mouseY * 1.5) - height/0.75, -height*1.5, height*1), 0.05)}px`;
        }; 
    };

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        mouseX = x;
        mouseY = y;
    });

    setInterval(updatePositions, 16);
});