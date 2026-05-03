document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initCart();
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
 * Cart Logic (Local Storage Mock for conversion)
 */
function initCart() {
  const cartDrawer = document.getElementById('CartDrawer');
  const cartToggle = document.getElementById('CartToggle');
  const closeCart = document.getElementById('CloseCart');
  const cartOverlay = document.getElementById('CartOverlay');
  const cartContent = document.getElementById('CartContent');
  const cartFooter = document.getElementById('CartFooter');
  const cartCountElem = document.getElementById('CartCount');
  
  let cart = JSON.parse(localStorage.getItem('ironfuel_cart') || '[]');

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.textContent = totalItems;
    cartCountElem.style.display = totalItems > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
      cartContent.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <p class="cart-empty-text">Your protocol is empty.</p>
        </div>
      `;
      cartFooter.style.display = 'none';
    } else {
      let html = '<div class="cart-items">';
      cart.forEach(item => {
        html += `
          <div class="cart-item">
            <div class="cart-item-img-wrapper">
              <img src="${item.image}" class="cart-item-img" alt="${item.name}">
            </div>
            <div class="cart-item-info">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
            </div>
          </div>
        `;
      });
      html += '</div>';
      cartContent.innerHTML = html;
      cartFooter.style.display = 'block';
    }
    
    localStorage.setItem('ironfuel_cart', JSON.stringify(cart));
  }

  function openCart() {
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openCart();
  }

  cartToggle.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.dataset.productId,
        name: btn.dataset.productName,
        price: btn.dataset.productPrice,
        image: btn.dataset.productImage
      };
      addToCart(product);
    });
  });

  updateCartUI();
}

/**
 * Language Toggle (Simple switch simulation)
 */
function initLanguageToggle() {
  const toggle = document.getElementById('LangToggle');
  let lang = 'EN';
  
  toggle.addEventListener('click', () => {
    lang = lang === 'EN' ? 'FR' : 'EN';
    toggle.textContent = lang;
    // In a real Shopify store, this would redirect to a different locale path or set a cookie
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

  document.querySelectorAll('.product-card, .section-header').forEach(el => {
    el.classList.add('reveal-element');
    observer.observe(el);
  });
}
