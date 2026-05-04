document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initLanguageToggle();
  initRevealAnimations();
  initMobileMenu();
  initVariantSelector();
  updateCartCount();
});

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const bgBlurs = document.querySelectorAll('.hero-blur-bg');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
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
    showSlide((currentSlide + 1) % slides.length);
  }

  function startTimer() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 8000);
  }

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      showSlide(parseInt(indicator.dataset.index));
      startTimer();
    });
  });

  startTimer();
}

function initLanguageToggle() {
  const toggle = document.getElementById('LangToggle');
  if (!toggle) return;
  let lang = 'EN';
  toggle.addEventListener('click', () => {
    lang = lang === 'EN' ? 'FR' : 'EN';
    toggle.textContent = lang;
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-active'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal-element').forEach(el => observer.observe(el));
}

function initMobileMenu() {
  const btn = document.getElementById('MobileMenuToggle');
  const menu = document.getElementById('MobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });
}

/* ============================================================
   VARIANT SELECTOR (product page)
   ============================================================ */
function initVariantSelector() {
  const jsonEl = document.getElementById('ProductVariantsJSON');
  if (!jsonEl) return;

  const variants = JSON.parse(jsonEl.textContent);
  const selectedInput = document.getElementById('SelectedVariantId');
  const priceEl = document.getElementById('ProductPrice');
  const imgEl = document.getElementById('ProductImage');

  document.querySelectorAll('.variant-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const pos = this.dataset.optionPosition;
      document.querySelectorAll(`.variant-btn[data-option-position="${pos}"]`).forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');

      const selected = {};
      document.querySelectorAll('.variant-btn.selected').forEach(b => {
        selected[parseInt(b.dataset.optionPosition) - 1] = b.dataset.value;
      });

      const match = variants.find(v => v.options.every((opt, i) => selected[i] === opt));
      if (!match) return;

      if (selectedInput) selectedInput.value = match.id;
      if (priceEl) priceEl.textContent = formatMoney(match.price);
      if (imgEl && match.featured_image) imgEl.src = match.featured_image.src;
    });
  });
}

/* ============================================================
   AJAX CART
   ============================================================ */
async function addToCart(variantId, button) {
  const label = button.textContent;
  button.textContent = 'ADDING...';
  button.disabled = true;

  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    });

    if (!res.ok) throw new Error(res.statusText);

    button.textContent = 'ADDED!';
    showToast('Added to your protocol.');
    updateCartCount();
  } catch {
    button.textContent = 'ERROR';
    showToast('Could not add to cart. Please try again.');
  }

  setTimeout(() => {
    button.textContent = label;
    button.disabled = false;
  }, 2200);
}

async function updateCartItem(key, quantity) {
  await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: key, quantity })
  });
  window.location.reload();
}

async function updateCartCount() {
  try {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });
  } catch { /* silent */ }
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById('CartToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ============================================================
   MONEY FORMATTER (used for variant price updates)
   ============================================================ */
function formatMoney(cents) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
