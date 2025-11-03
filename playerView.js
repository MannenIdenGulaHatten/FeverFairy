window.addEventListener("DOMContentLoaded", (event) => {
    const follower = document.querySelector('.follower');

    function clamp(num, min, max) {
        return Math.max(Math.min(num, max), min)
    }

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;
        const width = window.innerWidth
        const height = window.innerHeight

        follower.style.left = `${clamp(x, height/4, width - height/4)}px`;
        follower.style.top = `${clamp(y, height/4, height - height/4)}px`;
    });
});