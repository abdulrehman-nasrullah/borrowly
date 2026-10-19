/* ==========================================================================
   Shared Layout Injector & Navigation - Borrowly
   Injects shared header and footer, handles mobile menu & user dropdown
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  injectSiteHeader();
  injectSiteFooter();
  setupNavInteractions();
});

// Render the top navigation bar based on auth state and active page
function injectSiteHeader() {
  var headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  var currentPage = document.body.dataset.page || '';
  var authState = document.body.dataset.auth || 'guest';

  // Helper to test if a nav link is active
  function getActiveClass(pageKey) {
    return currentPage === pageKey ? 'is-active' : '';
  }

  // Right-hand header content (Guest vs Logged-in user)
  var authHtml = '';
  if (authState === 'user') {
    authHtml = `
      <div class="auth-user">
        <button type="button" class="user-avatar-btn" id="userMenuBtn" aria-label="Open user menu" aria-expanded="false">
          ZM
        </button>
        <div class="user-dropdown" id="userMenuDropdown">
          <div class="user-dropdown__header">
            <div class="user-dropdown__name">Zainab M.</div>
            <div class="user-dropdown__email">zainab.m@example.com</div>
          </div>
          <a href="profile.html" class="user-dropdown__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </a>
          <a href="dashboard.html" class="user-dropdown__item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>
          <a href="login.html" class="user-dropdown__item" id="logoutLink">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </a>
        </div>
      </div>
    `;
  } else {
    authHtml = `
      <div class="auth-guest">
        <a href="login.html" class="btn btn--outline-light btn--sm">Log In</a>
        <a href="register.html" class="btn btn--primary btn--sm">Register</a>
      </div>
    `;
  }

  // Header template
  headerContainer.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a href="index.html" class="brand-logo" aria-label="Borrowly Homepage">
          BORROWLY<span class="brand-logo__dot">.</span>
        </a>

        <button type="button" class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <nav class="site-nav" id="siteNav">
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link ${getActiveClass('home')}">Home</a></li>
            <li><a href="index.html#browse" class="nav-link ${getActiveClass('browse')}">Browse</a></li>
            <li><a href="index.html#how-it-works" class="nav-link ${getActiveClass('how-it-works')}">How It Works</a></li>
            <li><a href="add-item.html" class="nav-link ${getActiveClass('add-item')}">List an Item</a></li>
            <li><a href="dashboard.html" class="nav-link ${getActiveClass('dashboard')}">Dashboard</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          ${authHtml}
        </div>
      </div>
    </header>
  `;
}

// Render the shared site footer
function injectSiteFooter() {
  var footerContainer = document.getElementById('site-footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__main">
        <div class="site-footer__grid">
          <!-- Col 1: Brand & Tagline -->
          <div class="footer-col__brand">
            <a href="index.html" class="brand-logo" aria-label="Borrowly Homepage">
              BORROWLY<span class="brand-logo__dot">.</span>
            </a>
            <div class="footer-col__tagline">Borrow What You Need.</div>
            <p class="footer-col__desc">
              Pakistan's open peer-to-peer rental marketplace. Honest daily prices in PKR, direct handoffs, and zero intermediaries.
            </p>
          </div>

          <!-- Col 2: Explore -->
          <div>
            <h4 class="footer-col__title">Explore</h4>
            <ul class="footer-links">
              <li><a href="index.html" class="footer-link">Home</a></li>
              <li><a href="index.html#browse" class="footer-link">Browse Items</a></li>
              <li><a href="index.html#how-it-works" class="footer-link">How It Works</a></li>
            </ul>
          </div>

          <!-- Col 3: Account -->
          <div>
            <h4 class="footer-col__title">Account</h4>
            <ul class="footer-links">
              <li><a href="login.html" class="footer-link">Log In</a></li>
              <li><a href="register.html" class="footer-link">Register</a></li>
              <li><a href="add-item.html" class="footer-link">List an Item</a></li>
              <li><a href="dashboard.html" class="footer-link">Dashboard</a></li>
            </ul>
          </div>

          <!-- Col 4: Serving -->
          <div>
            <h4 class="footer-col__title">Serving</h4>
            <ul class="footer-plain-list">
              <li>Lahore</li>
              <li>Karachi</li>
              <li>Islamabad</li>
              <li>Multan</li>
              <li>Rawalpindi</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="site-footer__bottom">
        <div class="container site-footer__bottom-inner">
          <div>© 2026 Borrowly. Borrow What You Need.</div>
          <div>Payments are settled directly between users.</div>
        </div>
      </div>
    </footer>
  `;
}

// Bind mobile hamburger menu and avatar dropdown
function setupNavInteractions() {
  // Mobile menu toggle
  var navToggle = document.getElementById('mobileNavToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // User avatar dropdown toggle
  var userMenuBtn = document.getElementById('userMenuBtn');
  var userDropdown = document.getElementById('userMenuDropdown');

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = userDropdown.classList.toggle('is-open');
      userMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', function (e) {
      if (!userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
        userDropdown.classList.remove('is-open');
        userMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}
