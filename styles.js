document.addEventListener('DOMContentLoaded', function() {
    const pageContentWrapper = document.querySelector('.page-content-wrapper');
    const butterflyContainer = document.getElementById('butterfly-container');
    const navButtons = document.querySelectorAll('.section-nav-buttons button');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-target');
            let translateXValue = '0';
            let backgroundPositionValue = 'center 0'; // Posición inicial

            switch (targetSection) {
                case 'main-section':
                    translateXValue = '-100vw';
                    backgroundPositionValue = '-100vw'; // Desplazar el fondo
                    break;
                case 'location2-section':
                    translateXValue = '-200vw';
                    backgroundPositionValue = '-200vw'; // Desplazar el fondo
                    break;
                case 'form-section':
                case 'form-link-section':
                    translateXValue = '-300vw';
                    backgroundPositionValue = '-300vw'; // Desplazar el fondo
                    break;
                case 'location1-section':
                    translateXValue = '0';
                    backgroundPositionValue = '0'; // Posición inicial
                    break;
            }

            pageContentWrapper.style.transform = `translateX(${translateXValue})`;
            butterflyContainer.style.backgroundPosition = backgroundPositionValue;
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const butterflyContainer = document.getElementById('butterfly-container');
    const butterflyContent = document.getElementById('butterfly-content');
    const butterflyFragments = document.querySelectorAll('.butterfly-fragment');
    const pageContentWrapper = document.querySelector('.page-content-wrapper');
    const invitationSections = document.querySelectorAll('.invitation-section');
    const mainImg = document.querySelector('.section-text #main-img');
    const countdownDiv = document.getElementById('countdown');

    // Ocultar inicialmente...
    butterflyContent.style.opacity = '0';
    butterflyContent.style.display = 'none';
    pageContentWrapper.style.opacity = '0';
    pageContentWrapper.style.display = 'none';
    pageContentWrapper.style.setProperty('--before-opacity', '0');
    pageContentWrapper.style.setProperty('align-items', 'flex-start');
    if (mainImg) {
        mainImg.style.opacity = '0';
    }
    invitationSections.forEach(section => section.style.display = 'none');

    const animationDuration = 2;
    const fadeInDuration = 0.5;
    const eventDate = new Date('2025-05-31T20:30:00-03:00'); // Fecha y hora del evento (Sábado 31 de Mayo a las 20:30 PYT)

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function updateCountdown() {
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdownDiv.innerHTML = `¡SE ACERCA MI NOCHE SOÑADA! Faltan:</br>${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
        } else {
            countdownDiv.innerHTML = `¡LA NOCHE SOÑADA YA LLEGÓ!`;
            clearInterval(countdownInterval); // Detener el intervalo cuando la fecha haya pasado
        }
    }

    let countdownInterval;

    function animateButterflyScatter(callback) {
        butterflyContent.style.display = 'block';
        butterflyContent.offsetHeight;
        butterflyContent.style.opacity = '1';

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        butterflyFragments.forEach(fragment => {
            const angle = getRandom(0, 360);
            const minDistance = Math.max(viewportWidth, viewportHeight) / 2;
            const maxDistance = Math.max(viewportWidth, viewportHeight) * 1.2;
            const distance = getRandom(minDistance, maxDistance);
            const rotation = getRandom(-720, 720);
            const translateX = distance * Math.cos(angle * Math.PI / 180);
            const translateY = distance * Math.sin(angle * Math.PI / 180);
            const scale = getRandom(0.5, 1.5);
            const opacity = getRandom(0, 0.5);

            fragment.style.transition = `transform ${animationDuration}s ease-out, opacity ${animationDuration}s ease-out`;
            fragment.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`;
            fragment.style.opacity = opacity;
        });

        setTimeout(() => {
            butterflyContent.style.opacity = '0';
            setTimeout(() => {
                butterflyContent.style.display = 'none';
                callback();
            }, fadeInDuration * 1000);
        }, animationDuration * 1000);
    }

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        butterflyContainer.style.backgroundColor = 'transparent';

        setTimeout(() => {
            butterflyContent.style.display = 'block';
            butterflyContent.offsetHeight;
            butterflyContent.style.opacity = '1';

            setTimeout(() => {
                animateButterflyScatter(() => {
                    pageContentWrapper.style.display = 'flex';
                    pageContentWrapper.offsetHeight;
                    pageContentWrapper.style.opacity = '1';
                    pageContentWrapper.style.setProperty('--before-opacity', '1');
                    pageContentWrapper.style.setProperty('align-items', 'flex-start');

                    if (mainImg) {
                        setTimeout(() => {
                            mainImg.style.display = 'block';
                            mainImg.offsetHeight;
                            mainImg.style.opacity = '1';
                        }, fadeInDuration * 500);
                    }

                    invitationSections.forEach(section => section.style.display = 'flex');

                    // Iniciar el contador después de mostrar el contenido principal
                    updateCountdown();
                    countdownInterval = setInterval(updateCountdown, 1000); // Actualizar cada segundo
                });
            }, 5000);
        }, 3000);
    }, 2000);
});
