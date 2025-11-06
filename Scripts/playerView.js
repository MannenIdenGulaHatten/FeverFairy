window.addEventListener("DOMContentLoaded", (event) => {
    const follower = document.querySelector('.follower');
    const background = document.querySelector('.background');
    const jeffer = document.querySelector('.jeffer');

    let mouseX = 0;
    let mouseY = 0;
    let mouseChanged = false;

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
        let cLeft = parseFloat(circleStyle.left);
        let cTop = parseFloat(circleStyle.top);
        const leave = height / 6;

        const bgStyle = window.getComputedStyle(background);
        let bgLeft = parseFloat(bgStyle.left);
        let bgTop = parseFloat(bgStyle.top);
        const widthR = width * 0.5625;
        const rDiff = 0.5625 * (width / height);

        if (mouseChanged == false || mouseX > cLeft + leave || mouseX < cLeft - leave || mouseY > cTop + leave || mouseY < cTop - leave) {
            const radius = parseFloat(circleStyle.width) / 2; 

            cLeft = lerp(cLeft, clamp(mouseX, height / 4, width - height / 4), 0.05);
            cTop = lerp(cTop, clamp(mouseY, height / 4, height - height / 4), 0.05);

            follower.style.left = `${cLeft}px`;
            follower.style.top = `${cTop}px`;

            jeffer.style.setProperty('--x', `${cLeft}px`);
            jeffer.style.setProperty('--y', `${cTop}px`);
            jeffer.style.setProperty('--radius', `${radius}px`);

            bgLeft = lerp(bgLeft, clamp((width * 1.5 - mouseX * 1.5) - width / 0.75, -width * 1.25, 0), 0.05);
            bgTop = lerp(bgTop, clamp((-mouseY * rDiff * 1.75), -widthR * 2.5, -widthR * 0.5), 0.05);

            background.style.left = `${bgLeft}px`;
            background.style.top = `${bgTop}px`;

            mouseChanged = false;
        };
    };

    document.addEventListener('mousemove', function(event) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = event.clientX;
        const y = event.clientY;

        mouseX = clamp(x, 0, width);
        mouseY = clamp(y, 0, height);

        mouseChanged = true;
    });

    document.addEventListener('click', function(event) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = event.clientX;
        const y = event.clientY;

        console.log(x, y)
    });

    setInterval(updatePositions, 16);
});