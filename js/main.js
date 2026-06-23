// Canonical navigation
// Keeps the desktop, mobile, and footer menus identical across every page without using an absolute domain.
const navItems = [
  {
    label: 'Learn',
    dropdownLabel: 'Understanding Surrogacy',
    items: [
      ['what-is-surrogacy/', 'What Is Surrogacy?'],
      ['medical-guide-for-surrogates/', 'Medical Guide'],
      ['legal-considerations/', 'Legal Considerations'],
      ['surrogacy-laws-by-state/', 'Laws by State'],
      ['surrogacy-risks/', 'Surrogacy Risks'],
      ['faq-glossary/', 'FAQ & Glossary']
    ]
  },
  {
    label: 'Your Journey',
    dropdownLabel: 'The Surrogacy Process',
    items: [
      ['becoming-a-surrogate/', 'Becoming a Surrogate'],
      ['surrogate-requirements/', 'Requirements'],
      ['the-surrogacy-process-timeline/', 'Process & Timeline'],
      ['surrogate-compensation/', 'Compensation'],
      ['how-agencies-pay-surrogates/', 'How Agencies Pay'],
      ['matching-what-to-expect/', 'Matching'],
      ['life-during-after-surrogacy/', 'Life During & After']
    ]
  },
  {
    label: 'Medical',
    dropdownLabel: 'Medical Know-How',
    items: [
      ['surrogacy-ivf/', 'Surrogacy & IVF'],
      ['surrogate-pregnancy/', 'Surrogate Pregnancy'],
      ['health-insurance-for-surrogates/', 'Health Insurance']
    ]
  },
  {
    label: 'Your Family',
    dropdownLabel: 'Family & Support',
    items: [
      ['your-surrogate-support-person/', 'Your Support Person'],
      ['sharing-surrogacy-with-your-children/', 'Talking to Your Kids'],
      ['being-a-single-surrogate/', 'Single Surrogates'],
      ['choosing-a-surrogacy-agency/', 'Choosing an Agency']
    ]
  }
];

function getRelativePrefix() {
  let basePath = '/';
  const script = document.currentScript || Array.from(document.scripts).find(s => s.src && s.src.includes('/js/main.js'));

  if (script && script.src) {
    try {
      const scriptUrl = new URL(script.src);
      basePath = scriptUrl.pathname.replace(/\/js\/main\.js.*$/, '/');
    } catch (_) {
      basePath = '/';
    }
  }

  if (!basePath.endsWith('/')) basePath += '/';

  const path = window.location.pathname;
  if (path === basePath || path === basePath.replace(/\/$/, '')) return '';

  let relativePath = path.startsWith(basePath)
    ? path.slice(basePath.length)
    : path.replace(/^\/+/, '');

  relativePath = relativePath.replace(/index\.html$/, '').replace(/\/$/, '');
  const depth = relativePath ? relativePath.split('/').filter(Boolean).length : 0;
  return depth > 0 ? '../'.repeat(depth) : '';
}

const navPrefix = getRelativePrefix();
const hrefFor = path => `${navPrefix}${path}`;
const currentPath = window.location.pathname.replace(/\/$/, '');
const isActive = path => currentPath.includes(`/${path.replace(/\/$/, '')}`);
const chevronSvg = '<svg class="nav-chevron" viewBox="0 0 12 12" aria-hidden="true"><polyline points="2,4 6,8 10,4"/></svg>';

function renderDesktopNav() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  navLinks.innerHTML = navItems.map(group => `
    <li>
      <button aria-haspopup="true" aria-expanded="false">
        ${group.label}
        ${chevronSvg}
      </button>
      <div class="nav-dropdown" role="menu">
        <div class="nav-dropdown-label">${group.dropdownLabel}</div>
        ${group.items.map(([path, label]) => `<a href="${hrefFor(path)}" role="menuitem"${isActive(path) ? ' class="active"' : ''}>${label}</a>`).join('')}
      </div>
    </li>
  `).join('') + `<li><a href="${hrefFor('about-us/')}"${isActive('about-us/') ? ' class="active"' : ''}>About</a></li>`;

  const navCta = document.querySelector('.nav-cta');
  if (navCta) navCta.setAttribute('href', hrefFor('get-started/'));
}

function renderMobileNav() {
  const mobileNav = document.getElementById('nav-mobile');
  if (!mobileNav) return;

  mobileNav.innerHTML = navItems.map(group => `
    <div class="nav-mobile-section">
      <div class="nav-mobile-label">${group.label}</div>
      ${group.items.map(([path, label]) => `<a href="${hrefFor(path)}"${isActive(path) ? ' class="active"' : ''}>${label}</a>`).join('')}
    </div>
  `).join('') + `
    <a href="${hrefFor('about-us/')}" class="nav-mobile-section" style="display:block;padding:0.55rem 0;border-bottom:1px solid var(--sand);">About</a>
    <a href="${hrefFor('get-started/')}" class="nav-mobile-cta">Get Started</a>
  `;
}

function renderFooter() {
  const footerTopHtml = `
    <div>
      <div class="footer-brand-name">Surrogacy<span>Expert</span></div>
      <p class="footer-tagline">Clear, judgment-free guidance for women considering becoming a gestational surrogate.</p>
    </div>
    ${navItems.map(group => `
      <div class="footer-col">
        <h4>${group.label}</h4>
        <ul>
          ${group.items.map(([path, label]) => `<li><a href="${hrefFor(path)}">${label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('')}
    <div class="footer-col">
      <h4>Site</h4>
      <ul>
        <li><a href="${hrefFor('about-us/')}">About</a></li>
        <li><a href="${hrefFor('get-started/')}">Get Started</a></li>
        <li><a href="${hrefFor('privacy-policy/')}">Privacy Policy</a></li>
        <li><a href="${hrefFor('terms/')}">Terms of Use</a></li>
      </ul>
    </div>
  `;

  document.querySelectorAll('.site-footer .footer-top').forEach(footerTop => {
    footerTop.innerHTML = footerTopHtml;
  });

  const footerBottomHtml = `
    <span>© 2026 Surrogacy Expert</span>
    <span><a href="${hrefFor('privacy-policy/')}">Privacy Policy</a> · <a href="${hrefFor('terms/')}">Terms of Use</a></span>
  `;

  document.querySelectorAll('.footer-bottom').forEach(footer => {
    footer.innerHTML = footerBottomHtml;
  });

  document.querySelectorAll('.site-footer a[href^="mailto:"]').forEach(link => {
    link.setAttribute('href', hrefFor('get-started/'));
    link.textContent = 'Contact';
  });
}

renderDesktopNav();
renderMobileNav();
renderFooter();

// Mobile nav
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Scroll fade-up
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));