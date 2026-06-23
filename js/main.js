// Canonical navigation
// Keeps the desktop, mobile, and footer menus identical across every page without using an absolute domain.
// Footer layout v6: force mobile footer to one column and prevent horizontal overflow.
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

const siteItems = [
  ['about-us/', 'About'],
  ['get-started/', 'Get Started'],
  ['privacy-policy/', 'Privacy Policy'],
  ['terms/', 'Terms of Use']
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

function injectMobileOverflowFixes() {
  if (document.getElementById('se-mobile-overflow-fixes')) return;
  const style = document.createElement('style');
  style.id = 'se-mobile-overflow-fixes';
  style.textContent = `
    html, body { max-width: 100%; overflow-x: hidden; }
    .site-footer, .footer-inner, .footer-top, .footer-col, .footer-brand-col, .footer-section, .footer-bottom { min-width: 0; max-width: 100%; }
    .site-footer a, .site-footer p, .site-footer h4, .footer-brand-name { overflow-wrap: anywhere; }
    @media (max-width: 640px) {
      .site-footer { padding-left: 1.25rem !important; padding-right: 1.25rem !important; overflow-x: hidden !important; }
      .site-footer .footer-top { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 2rem !important; width: 100% !important; max-width: 100% !important; overflow-x: hidden !important; }
      .site-footer .footer-brand-col, .site-footer .footer-col { width: 100% !important; max-width: 100% !important; min-width: 0 !important; }
      .site-footer .footer-section-nested { margin-top: 1.75rem !important; }
      .site-footer .footer-bottom { display: flex !important; flex-direction: column !important; align-items: flex-start !important; gap: 0.65rem !important; width: 100% !important; }
    }
  `;
  document.head.appendChild(style);
}

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

function footerList(items) {
  return `<ul>${items.map(([path, label]) => `<li><a href="${hrefFor(path)}">${label}</a></li>`).join('')}</ul>`;
}

function footerSection(title, items, isNested = false) {
  const nestedStyle = isNested ? ' style="margin-top:2.25rem;"' : '';
  return `<div class="footer-section${isNested ? ' footer-section-nested' : ''}"${nestedStyle}><h4>${title}</h4>${footerList(items)}</div>`;
}

function setImportantStyle(el, property, value) {
  el.style.setProperty(property, value, 'important');
}

function applyFooterResponsiveLayout() {
  const width = window.innerWidth || document.documentElement.clientWidth;
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  document.querySelectorAll('.site-footer .footer-top').forEach(footerTop => {
    setImportantStyle(footerTop, 'display', 'grid');
    setImportantStyle(footerTop, 'width', '100%');
    setImportantStyle(footerTop, 'max-width', '100%');
    setImportantStyle(footerTop, 'overflow-x', 'hidden');

    if (width <= 640) {
      setImportantStyle(footerTop, 'grid-template-columns', 'minmax(0, 1fr)');
      setImportantStyle(footerTop, 'gap', '2rem');
    } else if (width <= 980) {
      setImportantStyle(footerTop, 'grid-template-columns', 'minmax(0, 1fr) minmax(0, 1fr)');
      setImportantStyle(footerTop, 'gap', '2.5rem');
    } else {
      setImportantStyle(footerTop, 'grid-template-columns', '1.8fr 1fr 1.05fr 1fr 1fr');
      setImportantStyle(footerTop, 'gap', '2.6rem');
    }
  });

  document.querySelectorAll('.site-footer .footer-brand-col, .site-footer .footer-col, .site-footer .footer-section').forEach(col => {
    setImportantStyle(col, 'min-width', '0');
    setImportantStyle(col, 'max-width', '100%');
  });
}

function renderFooter() {
  const learnGroup = navItems.find(group => group.label === 'Learn');
  const journeyGroup = navItems.find(group => group.label === 'Your Journey');
  const medicalGroup = navItems.find(group => group.label === 'Medical');
  const familyGroup = navItems.find(group => group.label === 'Your Family');

  const footerTopHtml = `
    <div class="footer-brand-col">
      <div class="footer-brand-name">Surrogacy<span>Expert</span></div>
      <p class="footer-tagline">Clear, judgment-free guidance for women considering becoming a gestational surrogate.</p>
    </div>
    <div class="footer-col">
      ${footerSection(learnGroup.label, learnGroup.items)}
    </div>
    <div class="footer-col">
      ${footerSection(journeyGroup.label, journeyGroup.items)}
    </div>
    <div class="footer-col">
      ${footerSection(medicalGroup.label, medicalGroup.items)}
    </div>
    <div class="footer-col footer-col-stacked">
      ${footerSection(familyGroup.label, familyGroup.items)}
      ${footerSection('Site', siteItems, true)}
    </div>
  `;

  document.querySelectorAll('.site-footer .footer-top').forEach(footerTop => {
    footerTop.innerHTML = footerTopHtml;
  });

  applyFooterResponsiveLayout();

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

injectMobileOverflowFixes();
renderDesktopNav();
renderMobileNav();
renderFooter();
window.addEventListener('resize', applyFooterResponsiveLayout);
window.addEventListener('orientationchange', () => setTimeout(applyFooterResponsiveLayout, 100));

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