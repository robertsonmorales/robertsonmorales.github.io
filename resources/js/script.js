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

const preloader = document.getElementById('preloader');
if (preloader) {
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
    }, 2000);
}