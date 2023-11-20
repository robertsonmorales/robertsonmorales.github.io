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
}

const navbar = document.querySelector('#navbar');
const mouseScroll = document.querySelector('.mouse-scroll');
function toggleNavbarClass() {
    navbar.classList.toggle('border-bottom', window.scrollY > navbar.offsetHeight);
    navbar.classList.toggle('glassmorphism', window.scrollY > navbar.offsetHeight);
    mouseScroll.classList.toggle('d-none', window.scrollY > 0);
}

window.addEventListener('scroll', toggleNavbarClass);