document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initLanguageToggle();
  initRevealAnimations();
});

/**
 * Hero Slider Logic
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const bgBlurs = document.querySelectorAll('.hero-blur-bg');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  const slideCount = slides.length;
  let interval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    bgBlurs.forEach(b => b.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));

    slides[index].classList.add('active');
    bgBlurs[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slideCount;
    showSlide(next);
  }

  function startTimer() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 8000);
  }

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.dataset.index);
      showSlide(index);
      startTimer();
    });
  });

  startTimer();
}

/**
 * Language Toggle (Simple switch simulation)
 */
function initLanguageToggle() {
  const toggle = document.getElementById('LangToggle');
  if (!toggle) return;
  
  let lang = 'EN';
  
  toggle.addEventListener('click', () => {
    lang = lang === 'EN' ? 'FR' : 'EN';
    toggle.textContent = lang;
  });
}

/**
 * Reveal Animations
 */
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .section-header, .hero-slide').forEach(el => {
    el.classList.add('reveal-element');
    observer.observe(el);
  });
}
