function useScrolling(el, params){
    ScrollReveal().reveal(el, params);
}

useScrolling('nav', {
    delay: 100,
    distance: '5%',
    origin: 'top',
    easing: 'ease'
});

useScrolling('#my-profile', {
    delay: 300,
    distance: '5%',
    origin: 'top',
    easing: 'ease'
});

useScrolling('#intro', {
    delay: 100,
    distance: '5%',
    origin: 'right',
    easing: 'ease'
});

useScrolling('#specialize', {
    delay: 200,
    distance: '5%',
    origin: 'left',
    easing: 'ease'
});

// CAll TO ACTIONS
useScrolling('#btn-my-works', {
    delay: 300,
    distance: '15%',
    origin: 'left',
    easing: 'ease'
});

useScrolling('#btn-download-resume', {
    delay: 300,
    distance: '15%',
    origin: 'right',
    easing: 'ease'
});

useScrolling('#avatar', {
    delay: 100,
    duration: 900,
    distance: '10%',
    origin: 'top',
    easing: 'ease'
});
// ENDS HERE

// TITLE
useScrolling('.text-title', {
    delay: 200,
    distance: '10%',
    origin: 'top',
    easing: 'ease'
});

useScrolling('.h2', {
    delay: 300,
    distance: '10%',
    origin: 'top',
    easing: 'ease'
});
// ENDS HERE

// SERVICE CARDS
useScrolling('.card-deck #ui-ux-design', {
    delay: 200,
    distance: '15%',
    origin: 'bottom',
    easing: 'ease',
    mobile: false
});

useScrolling('.card-deck #prototypes-to-html', {
    delay: 300,
    distance: '15%',
    origin: 'bottom',
    easing: 'ease',
    mobile: false
});

useScrolling('.card-deck #web-app', {
    delay: 400,
    distance: '15%',
    origin: 'bottom',
    easing: 'ease',
    mobile: false
});

useScrolling('.card-deck .card .card-service-child', {
    delay: 300,
    duration: 1000,
    easing: 'linear',
});

// ENDS HERE

// WORKS
useScrolling('.work-order-left', {
    delay: 300,
    distance: '15%',
    origin: 'left',
    easing: 'ease'
});

useScrolling('.work-order-right', {
    delay: 300,
    distance: '15%',
    origin: 'right',
    easing: 'ease'
});
// ENDS HERE

// SKILLS
// useScrolling('.img-fluid-extension', {
//     delay: 300,
//     easing: 'ease'
// });
// ENDS HERE

// ABOUT ME
useScrolling('.my-name', {
    delay: 300,
    distance: '10%',
    origin: 'left',
    easing: 'ease'
});

useScrolling('.about-me', {
    delay: 400,
    distance: '10%',
    origin: 'left',
    easing: 'ease'
});

// useScrolling('#btn-download-resume', {
//     delay: 500,
//     distance: '10%',
//     origin: 'left',
//     easing: 'ease'
// });

useScrolling('#my-avatar', {
    delay: 500,
    distance: '10%',
    origin: 'right',
    easing: 'ease'
});
// ENDS HERE