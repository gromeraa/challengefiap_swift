const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel(currentIndex);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
}

indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// Auto play
setInterval(() => {
    goToSlide(currentIndex + 1);
}, 5000);

// Inicializa
updateCarousel(currentIndex);
