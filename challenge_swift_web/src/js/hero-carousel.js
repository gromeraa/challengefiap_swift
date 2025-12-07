document.addEventListener('DOMContentLoaded', function () {
  const heroImages = document.querySelectorAll('.hero-image');
  const indicators = document.querySelectorAll('.hero-indicator');
  const prevBtn = document.querySelector('.hero-btn.prev');
  const nextBtn = document.querySelector('.hero-btn.next');
  let currentSlide = 0;
  let autoplayInterval;

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all images and indicators
    heroImages.forEach((img) => img.classList.remove('active'));
    indicators.forEach((indicator) => indicator.classList.remove('active'));

    // Add active class to current slide
    if (heroImages[index]) {
      heroImages[index].classList.add('active');
    }
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }

    currentSlide = index;
  }

  // Function to go to next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroImages.length;
    showSlide(nextIndex);
  }

  // Function to go to previous slide
  function prevSlide() {
    const prevIndex =
      (currentSlide - 1 + heroImages.length) % heroImages.length;
    showSlide(prevIndex);
  }

  // Function to start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000); // Change slide every 4 seconds
  }

  // Function to stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
    startAutoplay(); // Restart autoplay after manual interaction
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
    startAutoplay(); // Restart autoplay after manual interaction
  });

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopAutoplay();
      startAutoplay(); // Restart autoplay after manual interaction
    });
  });

  // Pause autoplay on hover
  const heroBanner = document.querySelector('.hero-banner');
  heroBanner.addEventListener('mouseenter', stopAutoplay);
  heroBanner.addEventListener('mouseleave', startAutoplay);

  // Start autoplay
  startAutoplay();
});
