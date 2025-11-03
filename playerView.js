const parallax = document.querySelector('.parallax');

        parallax.addEventListener('mousemove', function(event) {
            const x = (event.clientX / window.innerWidth) - 0.5;
            const y = (event.clientY / window.innerHeight) - 0.5;

            const backLayer = document.querySelector('.layer.back');
            const frontLayer = document.querySelector('.layer.front');

            backLayer.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`;
            frontLayer.style.transform = `translateX(${x * 40}px) translateY(${y * 40}px)`;
        });