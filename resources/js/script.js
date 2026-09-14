feather.replace();
// window.scrollTo(0,0);

function navSelected(id){
    let navbar = document.getElementsByClassName('navbar');
    for (let i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove('active');
    }

    let el = document.getElementById(id);
    if (id == 'hero') {
        document.getElementById('nav-hero').classList.add('active');
        window.scrollTo(0,0);
    }else{
        document.getElementById(`nav-${id}`).classList.add('active');
        el.scrollIntoView();
    }

    document.getElementById('mobileMenu').style.display = 'none';
    document.body.style.overflow = '';
}

// BOOKING CTA
// report which "Book a Consultation" button was clicked (navbar, mobile-menu, hero, footer);
// the link opens in a new tab, so this page stays alive to send the event
document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-cta]');
    if (cta && typeof gtag === 'function') {
        gtag('event', 'book_consultation', { cta_location: cta.dataset.cta });
    }
});

const navbar = document.querySelector('#navbar');
const mouseScroll = document.querySelector('.mouse-scroll');
function toggleNavbarClass() {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 0);
    if (mouseScroll) mouseScroll.classList.toggle('d-none', window.scrollY > 0);
}

window.addEventListener('scroll', toggleNavbarClass);

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose  = document.getElementById('mobileMenuClose');
const mobileMenu       = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    document.body.style.overflow = '';
});

const introEl = document.querySelector('#intro');
if (introEl) {
    introEl.dataset.text = introEl.textContent.trim();
    introEl.addEventListener('mousemove', (e) => {
        const rect = introEl.getBoundingClientRect();
        introEl.style.setProperty('--cursor-x', `${e.clientX - rect.left}px`);
        introEl.style.setProperty('--cursor-y', `${e.clientY - rect.top}px`);
    });
}

const glitchEls = document.querySelectorAll('.glitch-effect');
glitchEls.forEach((el, i) => {
    const offset = (7000 / glitchEls.length) * i;
    setTimeout(() => {
        const trigger = () => {
            el.classList.add('glitch-active');
            setTimeout(() => el.classList.remove('glitch-active'), 600);
        };
        trigger();
        setInterval(trigger, 7000);
    }, offset);
});

// THEME TOGGLE
// initial data-theme is set by the inline <head> script before CSS loads
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'dark' ? '#131114' : '#fafafa');
    if (themeToggle) {
        themeToggle.innerHTML = `<em data-feather="${theme === 'dark' ? 'sun' : 'moon'}"></em>`;
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        themeToggle.setAttribute('aria-pressed', theme === 'dark');
        feather.replace();
    }
}

// const mode = document.documentElement.getAttribute('data-theme') || 'light';
const mode = 'light';
applyTheme(mode);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}

// follow the OS live while the visitor hasn't made an explicit choice
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

const preloader = document.getElementById('preloader');
if (preloader) {
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
    }, 2000);
}