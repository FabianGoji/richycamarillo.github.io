/* ================================================================
   main.js — Shared JavaScript for all portfolio pages
   Referenced by: index.html, mountainseed.html, kiwi.html,
                  fyr.html, ladle.html

   BEHAVIORS
   ---------
   1. Nav scroll effect     — adds .scrolled to <nav> after 40px
   2. Scroll reveal         — adds .visible to .reveal elements
                              as they enter the viewport
   3. Skill bar animation   — animates .skill-fill width using
                              data-width attribute (index.html only)
   4. Lean UX accordion     — one-open-at-a-time accordion
                              (kiwi.html only, safe on other pages)
================================================================ */


/* ================================================================
   1. NAV SCROLL EFFECT
   Adds .scrolled to <nav> when page is scrolled > 40px.
   CSS in styles.css applies the frosted glass background.
================================================================ */
const nav = document.getElementById('main-nav');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}


/* ================================================================
   2. SCROLL REVEAL
   Uses IntersectionObserver to add .visible to each .reveal
   element as it enters the viewport. Siblings are staggered
   slightly for a cascade effect.
================================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 65);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ================================================================
   3. SKILL BAR ANIMATION — index.html only
   When a .skill-fill bar enters the viewport, its width expands
   to the percentage set in its data-width attribute (0–100).

   ✏️ To change a bar's fill level, update data-width in index.html.
================================================================ */
const skillBars = document.querySelectorAll('.skill-fill');

if (skillBars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = (fill.dataset.width || 0) + '%';
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => barObserver.observe(bar));
}


/* ================================================================
   4. LEAN UX CANVAS ACCORDION — kiwi.html only
   One item can be open at a time.
   — Clicking a closed item: closes any open one, opens clicked.
   — Clicking an open item: closes it (toggle off).
   The accordion container must have id="lux-accordion".
================================================================ */
const accordion = document.getElementById('lux-accordion');

if (accordion) {
  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      // If the clicked item was closed, open it
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
