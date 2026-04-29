/* ═══════════════════════════════════════════════════════════════
   HN Labs — Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

/* ── THEME TOGGLE ──────────────────────────────────────────── */
const html     = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeIcon= document.getElementById('themeIcon');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
});

/* ── MOBILE NAV ─────────────────────────────────────────────── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileNav');
ham.addEventListener('click', () => mob.classList.toggle('open'));
function closeMobile(){ mob.classList.remove('open'); }

/* ── TYPEWRITER HERO TITLE ──────────────────────────────────── */
const phrases = ['Digital Future.', 'Attack Surface.', 'Cloud Infrastructure.', 'API Security.'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typeTarget');

function type() {
  const word = phrases[pi];
  if (!deleting) {
    el.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
  } else {
    el.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

/* ── HERO TERMINAL ANIMATION ────────────────────────────────── */
const introLines = [
  {cls:'t-green',  text:'We are a team of security engineers'},
  {cls:'t-green',  text:'and penetration testers securing the world —'},
  {cls:'t-green',  text:'one implementation and test at a time.'},
  {cls:'t-out',    text:''},
  {cls:'t-out',    text:'› Penetration Testing   › Vulnerability Research'},
  {cls:'t-out',    text:'› Secure Code Review    › Cloud Security (GCP/AWS)'},
  {cls:'t-out',    text:'› AI-Powered Scanning   › Incident Response'},
  {cls:'t-out',    text:''},
  {cls:'t-warn',   text:'Mission: find your weaknesses before attackers do.'},
  {cls:'t-out',    text:''},
  {cls:'t-prompt', text:'root@hnlabs:~# '},
  {cls:'t-cmd',    text:'./hn_scanner --target demo.corp --full'},
  {cls:'t-blue',   text:'[AI]  Initialising HN-Scanner v3.1 (Claude-enhanced)...'},
  {cls:'t-out',    text:'[*]   Fingerprinting 254 hosts...'},
  {cls:'t-err',    text:'[!!!] SQLi confirmed  /api/login  (CVSS 9.8)'},
  {cls:'t-warn',   text:'[!!]  Stored XSS in /comments  (CVSS 7.2)'},
  {cls:'t-out',    text:'[*]   Report generated: report_demo.pdf'},
  {cls:'t-green',  text:'[✓]   Scan complete. Stay secure.'},
];

const termEl   = document.getElementById('heroTerminal');
const cursorEl = document.createElement('span');
cursorEl.className = 'cursor';
termEl.appendChild(cursorEl);

let li2 = 0;
function printIntroLine() {
  if (li2 >= introLines.length) {
    setTimeout(() => {
      while (termEl.firstChild !== cursorEl) termEl.removeChild(termEl.firstChild);
      li2 = 14;
      printIntroLine();
    }, 3500);
    return;
  }
  const {cls, text, instant} = introLines[li2++];
  const span = document.createElement('span');
  span.className = 'term-line ' + cls;
  termEl.insertBefore(span, cursorEl);

  if (instant || text === '') {
    span.textContent = text;
    setTimeout(printIntroLine, instant ? 18 : 30);
    return;
  }
  let ch = 0;
  const speed = cls === 't-green' || cls === 't-warn' ? 22 : cls === 't-cmd' ? 30 : 12;
  const iv = setInterval(() => {
    span.textContent += text[ch++];
    if (ch >= text.length) { clearInterval(iv); setTimeout(printIntroLine, 80); }
  }, speed);
}
setTimeout(printIntroLine, 400);

/* ── COUNTER ANIMATION ─────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target  = +el.dataset.target;
    let current   = 0;
    const step    = Math.ceil(target / 60);
    const iv      = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (target >= 99 ? '%' : '+');
      if (current >= target) clearInterval(iv);
    }, 25);
  });
}

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
let countersRan = false;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.progress-bar[data-width]').forEach(b => {
        setTimeout(() => b.style.width = b.dataset.width + '%', 200);
      });
      revealObserver.unobserve(e.target);
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── STATS COUNTER TRIGGER ─────────────────────────────────── */
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !countersRan) {
      countersRan = true;
      animateCounters();
    }
  });
}, {threshold: 0.3});
const statsEl = document.querySelector('.stats-strip');
if (statsEl) statsObserver.observe(statsEl);

/* ── TRAINING PROGRESS BARS ────────────────────────────────── */
const trainingCards = document.querySelectorAll('.training-card .progress-bar[data-width]');
const trainObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      trainObs.unobserve(e.target);
    }
  });
}, {threshold: 0.2});
trainingCards.forEach(b => trainObs.observe(b));

/* ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--green)' : '';
  });
}, {passive: true});

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  const scan = document.getElementById('cur-scan');
  const body = document.body;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let sx = -200, sy = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    scan.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '';
    scan.style.opacity = '';
  });

  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    sx += (mx - sx) * 0.08;
    sy += (my - sy) * 0.08;
    scan.style.left = sx + 'px';
    scan.style.top  = sy + 'px';

    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a,button,.btn,.service-card,.inhouse-card,.client-card,.portfolio-card,.training-card,.chain-step,.nav-links li,.theme-toggle';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) body.classList.add('cur-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) body.classList.remove('cur-hover');
  });
  document.addEventListener('mousedown', () => {
    body.classList.add('cur-click');
    setTimeout(() => body.classList.remove('cur-click'), 150);
  });
})();
