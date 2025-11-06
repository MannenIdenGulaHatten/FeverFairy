window.addEventListener("DOMContentLoaded", (event) => {
    const follower = document.querySelector('.follower');
    let mouseX = 0;
    let mouseY = 0;

    function clamp(num, min, max) {
        return Math.max(Math.min(num, max), min)
    }
    function lerp(x, y, a) {
        return x * (1 - a) + y * a;
    }

    function updateCirclePos() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const style = window.getComputedStyle(follower);
        const left = parseFloat(style.left);
        const top = parseFloat(style.top);
        const leave = height / 6;

        if (mouseX > left + leave || mouseX < left - leave || mouseY > top + leave || mouseY < top - leave) {
            follower.style.left = `${lerp(left, clamp(mouseX, height/4, width - height/4), 0.05)}px`;
            follower.style.top = `${lerp(top, clamp(mouseY, height/4, height - height/4), 0.05)}px`;
        }; 
    }

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        mouseX = x;
        mouseY = y;
    });

    setInterval(updateCirclePos, 16);
});