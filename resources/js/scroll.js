$(document).ready(function(){
    function useScrolling(el, params){
        ScrollReveal().reveal(el, params);
    }
    
    useScrolling('nav', {
        delay: 200,
        distance: '5%',
        origin: 'top',
        easing: 'ease',
        mobile: false,
    });
    
    useScrolling('#intro', {
        // delay: 100,
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
        origin: 'right',
        easing: 'ease'
    });
    
    useScrolling('#btn-my-services', {
        delay: 300,
        distance: '15%',
        origin: 'left',
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
    useScrolling('.text-section', {
        delay: 200,
        distance: '10%',
        origin: 'top',
        easing: 'ease'
    });
    
    useScrolling('.text-highlight', {
        delay: 300,
        distance: '10%',
        origin: 'top',
        easing: 'ease'
    });
    // ENDS HERE
    
    // SERVICE CARDS
    useScrolling('.card-deck .card-service', {
        delay: 300,
        distance: '15%',
        origin: 'bottom',
        easing: 'ease',
        interval: 100
    });
    // ENDS HERE
    
    // WORKS
    useScrolling('.placeholder', {
        delay: 300,
        distance: '15%',
        origin: 'bottom',
        easing: 'ease'
    });
    
    useScrolling('.work-title', {
        delay: 300,
        distance: '5%',
        origin: 'left',
        easing: 'ease-out',
    });
    
    useScrolling('.badge', {
        delay: 300,
        distance: '5%',
        origin: 'right',
        easing: 'ease',
        interval: 100
    });
    
    useScrolling('.work-description', {
        delay: 300,
        distance: '5%',
        origin: 'right',
        easing: 'ease',
    });
    
    useScrolling('.work-action a', {
        delay: 300,
        distance: '10%',
        origin: 'bottom',
        easing: 'ease',
    });
    
    useScrolling('.work-img-wrapper', { // a img
        delay: 300,
        distance: '5%',
        origin: 'bottom',
        easing: 'ease',
    });
    // ENDS HERE
    
    // SKILLS
    useScrolling('.skill-gallery img', {
        delay: 300,
        distance: '5%',
        origin: 'top',
        easing: 'ease',
        interval: 50
    });
    // ENDS HERE
    
    // ABOUT ME
    useScrolling('.a-bit-about-me', {
        delay: 300,
        distance: '5%',
        origin: 'right',
        easing: 'ease'
    });
    
    useScrolling('.btn-download-resume', {
        delay: 300,
        distance: '15%',
        origin: 'bottom',
        easing: 'ease'
    });
    
    useScrolling('.img-drop-shadow', {
        delay: 300,
        distance: '25%',
        origin: 'right',
        easing: 'ease'
    });
    // ENDS HERE
});