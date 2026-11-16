// surrogate.expert — canonical navigation, mobile menu, footer and UI helpers
const navItems=[
 {label:'Learn',dropdownLabel:'Understanding Surrogacy',items:[['what-is-surrogacy/','What Is Surrogacy?'],['medical-guide-for-surrogates/','Medical Guide'],['legal-considerations/','Legal Considerations'],['surrogacy-laws-by-state/','Laws by State'],['surrogacy-risks/','Surrogacy Risks'],['faq-glossary/','FAQ & Glossary']]},
 {label:'Your Journey',dropdownLabel:'The Surrogacy Process',items:[['becoming-a-surrogate/','Becoming a Surrogate'],['surrogate-requirements/','Requirements'],['the-surrogacy-process-timeline/','Process & Timeline'],['surrogate-compensation/','Compensation'],['how-agencies-pay-surrogates/','How Agencies Pay'],['matching-what-to-expect/','Matching'],['life-during-after-surrogacy/','Life During & After']]},
 {label:'Medical',dropdownLabel:'Medical Know-How',items:[['surrogacy-ivf/','Surrogacy & IVF'],['surrogate-pregnancy/','Surrogate Pregnancy'],['health-insurance-for-surrogates/','Health Insurance']]},
 {label:'Your Family',dropdownLabel:'Family & Support',items:[['your-surrogate-support-person/','Your Support Person'],['sharing-surrogacy-with-your-children/','Talking to Your Kids'],['being-a-single-surrogate/','Single Surrogates'],['choosing-a-surrogacy-agency/','Choosing an Agency']]}
];
const siteItems=[['about-us/','About'],['get-started/','Self-Check'],['privacy-policy/','Privacy Policy'],['terms/','Terms of Use']];
function getRelativePrefix(){let base='/';const s=document.currentScript||[...document.scripts].find(x=>x.src&&x.src.includes('/js/main.js'));if(s&&s.src){try{base=new URL(s.src).pathname.replace(/\/js\/main\.js.*$/,'/')}catch(e){}}if(!base.endsWith('/'))base+='/';let p=location.pathname;if(p===base||p===base.replace(/\/$/,''))return'';let r=p.startsWith(base)?p.slice(base.length):p.replace(/^\/+/, '');r=r.replace(/index\.html$/,'').replace(/\/$/,'');const d=r?r.split('/').filter(Boolean).length:0;return d?'../'.repeat(d):''}
const navPrefix=getRelativePrefix(),hrefFor=p=>`${navPrefix}${p}`,homeHref=navPrefix||'./',currentPath=location.pathname.replace(/\/$/,'');
const isActive=p=>currentPath.includes('/'+p.replace(/\/$/,''));
const chevron='<svg class="nav-chevron" viewBox="0 0 12 12" aria-hidden="true"><polyline points="2,4 6,8 10,4"/></svg>';
const hamburgerSvg='<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="6" x2="20" y2="6"/><line x1="2" y1="11" x2="20" y2="11"/><line x1="2" y1="16" x2="20" y2="16"/></svg>';
function ensureNavScaffold(){let nav=document.querySelector('.site-nav');if(!nav){nav=document.createElement('nav');nav.className='site-nav';nav.setAttribute('aria-label','Main navigation');document.body.insertBefore(nav,document.body.firstChild)}let inner=nav.querySelector('.nav-inner');if(!inner){inner=document.createElement('div');inner.className='nav-inner';nav.appendChild(inner)}let logo=inner.querySelector('.nav-logo');if(!logo){logo=document.createElement('a');logo.className='nav-logo';inner.prepend(logo)}logo.href=homeHref;logo.innerHTML='Surrogate<span>Expert</span>';let links=inner.querySelector('.nav-links');if(!links){links=document.createElement('ul');links.className='nav-links';links.setAttribute('role','list');const cta=inner.querySelector('.nav-cta');cta?inner.insertBefore(links,cta):inner.appendChild(links)}let cta=inner.querySelector('.nav-cta');if(!cta){cta=document.createElement('a');cta.className='nav-cta';inner.appendChild(cta)}if (!cta.getAttribute('href')){cta.href=hrefFor('get-started/');cta.textContent='Eligibility Self-Check';}let hb=inner.querySelector('#nav-hamburger');if(!hb){hb=document.createElement('button');hb.className='nav-hamburger';hb.id='nav-hamburger';hb.setAttribute('aria-label','Open menu');hb.setAttribute('aria-expanded','false');hb.innerHTML=hamburgerSvg;inner.appendChild(hb)}let mobile=document.getElementById('nav-mobile');if(!mobile){mobile=document.createElement('div');mobile.className='nav-mobile';mobile.id='nav-mobile';mobile.setAttribute('aria-hidden','true');nav.insertAdjacentElement('afterend',mobile)}}
function injectSafetyFixes(){if(document.getElementById('se-safety-fixes'))return;const st=document.createElement('style');st.id='se-safety-fixes';st.textContent='html,body{max-width:100%;overflow-x:hidden}.fade-up{opacity:1!important;transform:none!important}.site-nav .nav-inner{min-width:0}.nav-links{min-width:0}.site-footer,.footer-inner,.footer-top,.footer-col,.footer-brand-col,.footer-section,.footer-bottom{min-width:0;max-width:100%}.site-footer a,.site-footer p,.site-footer h4,.prose,.article-body,.page-hero-inner{overflow-wrap:anywhere}@media(max-width:640px){.site-footer{padding-left:1.25rem!important;padding-right:1.25rem!important}.site-footer .footer-top{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:2rem!important}.site-footer .footer-bottom{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:.65rem!important}}';document.head.appendChild(st);document.querySelectorAll('.fade-up').forEach(e=>e.classList.add('visible'))}
function renderDesktopNav(){const ul=document.querySelector('.nav-links');if(!ul)return;ul.innerHTML=navItems.map(g=>`<li><button aria-haspopup="true" aria-expanded="false">${g.label}${chevron}</button><div class="nav-dropdown" role="menu"><div class="nav-dropdown-label">${g.dropdownLabel}</div>${g.items.map(([p,l])=>`<a href="${hrefFor(p)}" role="menuitem"${isActive(p)?' class="active"':''}>${l}</a>`).join('')}</div></li>`).join('')+`<li><a href="${hrefFor('about-us/')}"${isActive('about-us/')?' class="active"':''}>About</a></li>`}
function renderMobileNav(){const m=document.getElementById('nav-mobile');if(!m)return;m.innerHTML=navItems.map(g=>`<div class="nav-mobile-section"><div class="nav-mobile-label">${g.label}</div>${g.items.map(([p,l])=>`<a href="${hrefFor(p)}"${isActive(p)?' class="active"':''}>${l}</a>`).join('')}</div>`).join('')+`<a href="${hrefFor('about-us/')}" style="display:block;padding:.55rem 0;border-bottom:1px solid var(--sand)">About</a><a href="${hrefFor('get-started/')}" class="nav-mobile-cta">Eligibility Self-Check</a><a href="https://expecting.ai/become-a-surrogate-wizard-em?utm_source=surrogate.expert&amp;utm_medium=referral&amp;utm_campaign=surrogate-expert" class="nav-mobile-cta">Apply to Be a Surrogate</a>`}
function footerList(a){return`<ul>${a.map(([p,l])=>`<li><a href="${hrefFor(p)}">${l}</a></li>`).join('')}</ul>`}function footerSection(t,a,n=false){return`<div class="footer-section${n?' footer-section-nested':''}"${n?' style="margin-top:2.25rem"':''}><h4>${t}</h4>${footerList(a)}</div>`}
function renderFooter(){const tops=document.querySelectorAll('.site-footer .footer-top');if(!tops.length)return;const learn=navItems[0],journey=navItems[1],medical=navItems[2],family=navItems[3];const html=`<div class="footer-brand-col"><div class="footer-brand-name">Surrogate<span>Expert</span></div><p class="footer-tagline">Practical educational guidance for women considering becoming a gestational surrogate.</p></div><div class="footer-col">${footerSection(learn.label,learn.items)}</div><div class="footer-col">${footerSection(journey.label,journey.items)}</div><div class="footer-col">${footerSection(medical.label,medical.items)}</div><div class="footer-col footer-col-stacked">${footerSection(family.label,family.items)}${footerSection('Site',siteItems,true)}<div class="footer-section footer-section-nested" style="margin-top:2.25rem"><h4>For Intended Parents</h4><ul><li><a href="https://surrogacy.expert/" rel="noopener">Surrogacy.Expert</a></li></ul></div></div>`;tops.forEach(e=>e.innerHTML=html);document.querySelectorAll('.footer-bottom').forEach(e=>e.innerHTML=`<span>© 2026 Surrogate Expert</span><span><a href="${hrefFor('privacy-policy/')}">Privacy Policy</a> · <a href="${hrefFor('terms/')}">Terms of Use</a></span>`)}
function bindNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  const dropdowns = [...document.querySelectorAll('.nav-links > li > button')];

  function setMobileMenu(open) {
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  hamburger.type = 'button';
  hamburger.setAttribute('aria-controls', mobileMenu.id);
  hamburger.innerHTML = hamburgerSvg + '<span>Menu</span>';
  setMobileMenu(false);
  hamburger.addEventListener('click', () => {
    setMobileMenu(hamburger.getAttribute('aria-expanded') !== 'true');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  function setDropdown(active) {
    dropdowns.forEach(button => {
      button.setAttribute('aria-expanded', String(button === active));
    });
  }

  dropdowns.forEach((button, index) => {
    const panel = button.nextElementSibling;
    panel.id = 'nav-dropdown-' + (index + 1);
    button.type = 'button';
    button.setAttribute('aria-controls', panel.id);
    button.removeAttribute('aria-haspopup');
    panel.removeAttribute('role');
    panel.querySelectorAll('[role="menuitem"]').forEach(link => link.removeAttribute('role'));
    button.addEventListener('click', () => {
      setDropdown(button.getAttribute('aria-expanded') === 'true' ? null : button);
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-links')) setDropdown(null);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (hamburger.getAttribute('aria-expanded') === 'true') {
      setMobileMenu(false);
      hamburger.focus();
      return;
    }
    const open = dropdowns.find(button => button.getAttribute('aria-expanded') === 'true');
    if (open) {
      setDropdown(null);
      open.focus();
    }
  });
}
ensureNavScaffold();injectSafetyFixes();renderDesktopNav();renderMobileNav();renderFooter();bindNav();
const faqButtons = [...document.querySelectorAll('.faq-q')];
faqButtons.forEach((button, index) => {
  const item = button.closest('.faq-item');
  const answer = item?.querySelector('.faq-a');
  if (!answer) return;
  answer.id ||= 'faq-answer-' + (index + 1);
  button.type = 'button';
  button.setAttribute('aria-controls', answer.id);
  button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    faqButtons.forEach(other => {
      const expanded = opening && other === button;
      const current = other.closest('.faq-item');
      other.setAttribute('aria-expanded', String(expanded));
      current.classList.toggle('open', expanded);
      current.querySelector('.faq-a')?.setAttribute('aria-hidden', String(!expanded));
    });
  });
});