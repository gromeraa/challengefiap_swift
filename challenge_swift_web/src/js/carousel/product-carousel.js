const productTrack = document.querySelector('.product-carousel-track');
const productSlides = Array.from(document.querySelectorAll('.product-card'));
const productIndicators = Array.from(document.querySelectorAll('.product-carousel-indicator'));
let productCurrentIndex = 0;
const visibleCards = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 4;

function updateProductCarousel(index) {
    const maxIndex = productSlides.length - visibleCards;
    productCurrentIndex = Math.max(0, Math.min(index, maxIndex));
    productTrack.style.transform = `translateX(-${productCurrentIndex * (productSlides[0].offsetWidth + 20)}px)`;
    productIndicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === productCurrentIndex);
    });
}

productIndicators.forEach((dot, i) => {
    dot.addEventListener('click', () => updateProductCarousel(i));
});

// Drag/swipe support
let startX = 0;
let isDragging = false;
let animationFrame;
let currentTranslate = 0;
let prevTranslate = 0;

function setProductTranslate(x) {
    productTrack.style.transform = `translateX(${x}px)`;
}

function onProductDragStart(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    prevTranslate = -productCurrentIndex * (productSlides[0].offsetWidth + 20);
    animationFrame = requestAnimationFrame(productAnimation);
    productTrack.classList.add('dragging');
}

function onProductDragMove(e) {
    if (!isDragging) return;
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentTranslate = prevTranslate + (x - startX);
}

function onProductDragEnd() {
    cancelAnimationFrame(animationFrame);
    isDragging = false;
    productTrack.classList.remove('dragging');
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50 && productCurrentIndex < productSlides.length - visibleCards) {
        updateProductCarousel(productCurrentIndex + 1);
    } else if (movedBy > 50 && productCurrentIndex > 0) {
        updateProductCarousel(productCurrentIndex - 1);
    } else {
        updateProductCarousel(productCurrentIndex);
    }
}

function productAnimation() {
    setProductTranslate(currentTranslate);
    if (isDragging) requestAnimationFrame(productAnimation);
}

productTrack.addEventListener('mousedown', onProductDragStart);
productTrack.addEventListener('touchstart', onProductDragStart);
window.addEventListener('mousemove', onProductDragMove);
window.addEventListener('touchmove', onProductDragMove);
window.addEventListener('mouseup', onProductDragEnd);
window.addEventListener('touchend', onProductDragEnd);

// Inicializa
updateProductCarousel(productCurrentIndex);
