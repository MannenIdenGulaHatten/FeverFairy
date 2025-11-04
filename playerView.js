window.addEventListener("DOMContentLoaded", (event) => {
    const follower = document.querySelector('.follower');

    function clamp(num, min, max) {
        return Math.max(Math.min(num, max), min)
    }
    function lerp(x, y, a) {
        return x * (1 - a) + y * a;
    }

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const style = window.getComputedStyle(follower);
        const left = parseFloat(style.left);
        const top = parseFloat(style.top);

        if (x > left + 80 || x < left - 80 || y > top + 80 || y < top - 80) {
            follower.style.left = `${lerp(left, clamp(x, height/4, width - height/4), 0.1)}px`;
            follower.style.top = `${lerp(top, clamp(y, height/4, height - height/4), 0.1)}px`;
        }; 
    });
});