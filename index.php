<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A Freelance Web Developer & Designer mainly creating information management systems and have extensive knowledge of both Front-end and Back-end Development.">
    <meta name="keywords" content="Web Developer | Web Designer | UI/UX Design | HTML5, CSS3 (Sass, Bootstrap), JavaScript (jQuery, Vue.js), PHP (Laravel), and SQL">
    <meta name="author" content="Robertson Morales">
    <meta name="robots" content="index, follow">
    <!-- <meta name="google-site-verification" content="2Et3XLvckUFiFi6rMhGa-lAHdTVqtpq0FRBf19-3QD8" /> -->
    <!-- * OG section -->
    <meta name="site_name" property="og:site_name" content>
    <meta name="title" property="og:title" content="Looking for a freelancer to help with your website? HIRE ME!" />
    <meta name="image" property="og:image" content="https://robertsonmorales.netlify.app/resources/images/og-cover.png" />
    <meta name="description" property="og:description" content="Let's build and customize your business process on a website and help you with your project journey in digital transformation." />
    <meta name="url" property="og:url" content="https://robertsonmorales.netlify.app" />
    <meta name="type" property="og:type" content="website" />

    <!--
        * meta for image
        <meta name="image:alt" property="og:image:alt" content="https://robertsonmorales.netlify.app/resources/images/og-image.png" /> 
        <meta name="image:width" property="og:image:width" content="1200" />
        <meta name="image:height" property="og:image:height" content="630" />
    -->
    <!-- * Ends here -->

    <title>Freelance Web Developer & Designer | UI/UX Design | Laravel</title>
    <!-- preloads -->

    <!-- styles -->
    <link rel="preload" href="plugins/bootstrap/dist/css/bootstrap.min.css" as="style">
    <link rel="preload" href="resources/sass/style.css" as="style">
    <!-- ends here -->

    <!-- javascripts -->
    <link rel="preload" href="plugins/jquery/dist/jquery.min.js" as="script">
    <link rel="preload" href="plugins/bootstrap/dist/js/bootstrap.min.js" as="script">
    <link rel="preload" href="resources/js/script.js" as="script">
    <!-- ends here -->

    <!-- images -->
    <link rel="preload" href="resources/images/me/profile.webp" as="image">
    <link rel="preload" href="resources/images/projects/portfolio/portfolio.webp" as="image">
    <link rel="preload" href="resources/images/projects/eCommerce/eCommerce.webp" as="image">
    <link rel="preload" href="resources/images/projects/pos/pos.webp" as="image">
    <!-- ends here -->
    <!-- preloads ends here -->

    <link rel="stylesheet" href="plugins/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/sass/style.css">

    <link rel="canonical" href="robertsonmorales.netlify.app">
    <link rel="shortcut icon" href="resources/images/me/profile.webp">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NCR2QZVRF6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-NCR2QZVRF6');
    </script>
</head>
<body>

    <!-- Messenger Chat plugin Code -->
    <div id="fb-root"></div>

    <!-- Your Chat plugin code -->
    <div id="fb-customer-chat" class="fb-customerchat">
    </div>

    <script>
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "105844545345201");
    chatbox.setAttribute("attribution", "biz_inbox");
    </script>

    <!-- Your SDK code -->
    <script>
    window.fbAsyncInit = function() {
        FB.init({
        xfbml            : true,
        version          : 'v14.0'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>

    <header>
        <nav class="navbar navbar-expand-md navbar-light mobile-bg-white fixed-top" id="navbar">
            <div class="container from-nav">
                <button class="navbar-brand border-0 bg-transparent outline-none"
                    onclick="navSelected('hero')">
                    <div class="font-stack-1 font-weight-600">RM<span class="text-primary">.</span></div>
                </button>
                
                <button class="navbar-toggler border-0 outline-none"
                    type="button" 
                    data-toggle="collapse"
                    data-target="#toggleNavbar" 
                    aria-controls="toggleNavbar" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <em data-feather="menu"></em>
                </button>
            
                <div class="collapse navbar-collapse" id="toggleNavbar">    
                    <ul class="navbar-nav mr-auto"></ul>
                    
                    <div class="navbar-text">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <button class="nav-link navbar font-weight-500 active"
                                id="nav-hero" 
                                onclick="navSelected('hero')">Home</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link navbar font-weight-500"
                                id="nav-services"
                                onclick="navSelected('services')">Services</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link navbar font-weight-500"
                                id="nav-works"
                                onclick="navSelected('works')">Works</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link navbar font-weight-500"
                                id="nav-skills"
                                onclick="navSelected('skills')">Skills</button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link navbar font-weight-500"
                                id="nav-about" 
                                onclick="navSelected('about')">About</button>
                            </li>
                            <li class="nav-item"> <!-- mr-md-5 -->
                                <button class="nav-link navbar font-weight-500"
                                id="nav-contact"
                                onclick="navSelected('contact')">Contact Me</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section id="hero" class="screen-height">
            <div class="container">
                <div class="d-flex align-items-center flex-column justify-content-center">
                    <img src="resources/images/me/profile.webp" 
                        class="my-avatar mb-4 bg-light" 
                        alt="Avatar"
                        height="150"
                        width="150"
                        id="my-profile">
    
                    <div class="text-left text-md-center">
                        <h1 class="h1" id="intro">Hi! I'm Robertson,
                            <br>Web <span class="text-primary font-weight-600">Developer</span> and <span class="text-primary font-stack-1 font-weight-600">Designer <em data-feather="pen-tool"></em></span>
                        </h1>
    
                        <div class="mb-3"></div>
    
                        <p class="text-muted" id="specialize">Specializes in User Interface Design, Responsive Web Design, and Web Applications.</p>
    
                        <div class="mb-4"></div>
    
                        <div class="call-to-actions">
                            <button class="btn btn-primary mb-1 mb-md-0 mr-1 mobile-w-100"
                                onclick="navSelected('works')"
                                id="btn-my-works">View Works</button>
    
                            <div class="d-block d-md-none w-100"></div>
    
                            <a class="btn btn-outline-primary mobile-w-100 btn-download-resume"
                                href="resources/attachment/resume.pdf"
                                download="Resume"
                                id="btn-download-resume">Download Resume</a>
                        </div>
                        <div class="mb-4 mb-md-0"></div>
                    </div>
                </div>
            </div>
        </section>

        <section id="services">
            <div class="container">
                <div class="text-center">
                    <div class="text-section">SERVICES</div>
                    <h2 class="text-highlight">Specializing In</h2>
                </div>
        
                <div class="card-group my-5">
                    <div class="card-service" 
                        id="ui-ux-design">
                        <div class="card-header">
                            <em data-feather="layout"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">UI/UX Design</h4>
                            <p class="card-text">Build user interfaces that are user-friendly and responsive to all media devices that users will find easy to use and pleasurable.</p>
                        </div>
                    </div>
    
                    <div class="card-service" 
                        id="wireframing-and-prototyping">
                        <div class="card-header">
                            <em data-feather="pen-tool"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Wireframing & Prototyping</h4>
                            <p class="card-text">Create wireframes and prototypes for your product design. Here we can preview and provide constructive feedback in real-time on your product  before going to website development.</p>
                        </div>                    
                    </div>
                    
                    <div class="card-service" 
                        id="prototypes-to-webpages">
                        <div class="card-header">
                            <em data-feather="code"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Prototypes to Web pages</h4>
                            <p class="card-text">Convert prototypes from (Figma, Adobe XD, Sketch, PSD, etc..) into new functional and user-interactive website pages.</p>
                        </div>
                    </div>
    
                    <div class="d-none d-md-block w-100"></div>
    
                    <div class="card-service" 
                        id="responsive-web-design">
                        <div class="card-header">
                            <em data-feather="smartphone"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Responsive Web Design</h4>
                            <p class="card-text">Let's build and design your website that is responsive and user-friendly to all media devices.</p>
                        </div>
                    </div>
    
                    <div class="card-service" 
                        id="website-revamps">
                        <div class="card-header">
                            <em data-feather="trending-up"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Website Redesign or Revamp</h4>
                            <p class="card-text">Let's make some tweaks to improve your website performance, optimization, and Google visibility that will take an edge on your competitors by modifying the layout, design, brand, and products or services you provide.</p>
                        </div>                    
                    </div>
    
                    <div class="card-service" 
                        id="web-application">
                        <div class="card-header">
                            <em data-feather="monitor"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Website Application</h4>
                            <p class="card-text">Build Single page application to manage your business operations, increase efficiency, and reduce costs.</p>
                        </div>
                    </div>
    
                    <div class="d-none d-md-block w-100"></div>
    
                    <div class="card-service" 
                        id="seo-performance">
                        <div class="card-header">
                            <em data-feather="search"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">SEO Performance</h4>
                            <p class="card-text">Let's optimize your web page's quality content and technical configuration to make it easy to find or appear on the search engine results page.</p>
                        </div>
                    </div>
    
                    <div class="card-service" 
                        id="database-design">
                        <div class="card-header">
                            <em data-feather="database"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Database Design</h4>
                            <p class="card-text">Let's organize your data by designing its flow. We will determine what data and its data type must be stored and how we can secure all of the information when it comes to the transactional process, and therefore we can prevent data duplication.</p>
                        </div>
                    </div>
                    
                    <div class="card-service" 
                        id="prototypes-to-html">
                        <div class="card-header">
                            <em data-feather="settings"></em>
                        </div>
                        <div class="card-body">
                            <h4 class="mb-4 card-title">Website Troubleshooting</h4>
                            <p class="card-text">Having errors in web pages is very common. Let's help your website with what it needs or what bugs are displaying that need to be fixed.</p>
                        </div>
                    </div>
    
                </div>
            </div>
        </section>
    
        <section id="works" class="py-5">
            <div class="container">
                <div class="text-center">
                    <div class="text-section">WORKS</div>
                    <h2 class="text-highlight">Recent Projects</h2>
                </div>
    
                <div class="row no-gutters flexbox-works flex-md-row-reverse">
                    <div class="col-md-4">
                        <div class="d-none d-md-block placeholder placeholder-1"></div>
                        <h3 class="work-title">E-Commerce Design</h3>

                        <div class="built-with">
                            <div class="built-with-using">
                                <div class="badge p-2">Wireframing</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Prototyping</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Figma</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">HTML</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">CSS3</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Sass</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Vue.js</div>
                            </div>
                        </div>
                        
                        <br>

                        <p class="work-description">A redesign website that users find a more E-Commerce-like user interface focuses on sportswear, apparel, and equipment products. In choosing a color, a vibrant and energetic one would be a good option, and it is user-friendly.</p>
                
                        <div class="work-action">
                            <a href="https://robertsonmorales.github.io/ecommerce-nike" 
                                target="_blank"
                                title="View More" 
                                rel="noopener" 
                                class="btn btn-outline-primary mobile-w-100">
                                <span>View More</span>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-7">
                        <div class="work-img-wrapper">
                            <a href="resources/images/projects/eCommerce/eCommerce.webp"
                                target="_blank" 
                                rel="noopener">
                                <img src="resources/images/projects/eCommerce/eCommerce.webp" 
                                    class="img-fluid rounded img-fluid-hovered"
                                    loading="lazy" 
                                    alt="Nike Ecommerce Redesign"
                                    width="500"
                                    height="380">
                            </a>
                        </div>
                    </div>
                </div>
    
                <div class="row no-gutters flexbox-works flex-md-row">
                    <div class="col-md-4">
                        <div class="d-none d-md-block placeholder placeholder-2"></div>
                        <h3 class="work-title">Food Ordering System</h3>
        
                        <div class="built-with">
                            <div class="built-with-using">
                                <div class="badge p-2">Figma</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">HTML</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">CSS</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">JavaScript</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">JQuery</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">PHP</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Laravel</div>
                            </div>
                        </div>
                        
                        <br>

                        <p class="work-description">A simple restaurant POS UI/UX Design and a light-themed user interface. A POS where you can search, select a category of the menu then add it to the order list. It has the option for "pay later" and "pay now" via payment gateways.</p>
        
                        <div class="work-action">
                            <a href="http://working-food-ordering-system.herokuapp.com/" 
                                target="_blank"
                                title="View More" 
                                rel="noopener" 
                                class="btn btn-outline-primary mobile-w-100">View More</a>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-7">
                        <div class="work-img-wrapper">
                            <a href="resources/images/projects/pos/pos.webp"
                                target="_blank" 
                                rel="noopener">
                                <img src="resources/images/projects/pos/pos.webp" 
                                    class="img-fluid rounded img-fluid-hovered"
                                    loading="lazy" 
                                    alt="Restaurant POS"
                                    width="500"
                                    height="380">
                            </a>
                        </div>
                    </div>
                </div>
    
                <div class="row no-gutters flexbox-works flex-md-row-reverse">
                    <div class="col-md-4">
                        <div class="d-none d-md-block placeholder placeholder-3"></div>
                        <h3 class="work-title">Professional Portfolio Design</h3>

                        <div class="built-with">
                            <div class="built-with-using">
                                <div class="badge p-2">HTML</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">CSS3</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">Sass</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">JavaScript</div>
                            </div>
                            <div class="built-with-using">
                                <div class="badge p-2">JQuery</div>
                            </div>
                        </div>
                        
                        <br>

                        <p class="work-description">A Professional Portfolio template where you can download your resume/CV with sections like Clients, Services, Project, Testimonials, About Me, and Contact Me. It is a one-pager website, user-friendly and responsive.</p>
                
                        <div class="work-action">
                            <a href="https://jethrocaparroso.netlify.app" 
                                target="_blank"
                                title="View More" 
                                rel="noopener" 
                                class="btn btn-outline-primary mobile-w-100">
                                <span>View More</span>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-7">
                        <div class="work-img-wrapper">
                            <a href="resources/images/projects/portfolio/portfolio.webp"
                                target="_blank" 
                                rel="noopener">
                                <img src="resources/images/projects/portfolio/portfolio.webp" 
                                    class="img-fluid rounded img-fluid-hovered"
                                    loading="lazy" 
                                    alt="Personal Portfolio Design"
                                    width="500"
                                    height="380">
                            </a>
                        </div>
                    </div>
                </div>
    
                <!-- <div class="text-center mt-5">
                    <a href="#view-more-projects" 
                        class="btn btn-outline-primary"
                        id="view-more-projects">View More Projects</a>
                </div> -->
    
            </div>
        </section>
    
        <section id="skills" class="screen-height bg-light">
            <div class="container">
                <div class="text-center">
                    <div class="text-section">ABOUT MY</div>
                    <h2 class="text-highlight">Skills & Expertise</h2>
                </div>
    
                <div class="text-center">
                    <div class="skill-gallery">
                        <img src="resources/images/svg/skills/html.svg" 
                            alt="HTML 5" 
                            class="skill-img p-4" 
                            title="HTML 5" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/css3.svg" 
                            alt="CSS 3" 
                            class="skill-img p-4" 
                            title="CSS 3" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/sass.svg" 
                            alt="Sass" 
                            class="skill-img p-4" 
                            title="Sass" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/javascript.svg" 
                            alt="JavaScript" 
                            class="skill-img p-4" 
                            title="JavaScript" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/jquery.svg" 
                            alt="JQuery" 
                            class="skill-img p-4" 
                            title="JQuery" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/bootstrap.svg" 
                            alt="Bootstrap" 
                            class="skill-img p-4" 
                            title="Bootstrap" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <!-- <img src="resources/images/svg/skills/angular.svg" 
                            alt="AngularJS" 
                            class="skill-img p-4" 
                            title="AngularJS" 
                            loading="lazy"
                            width="110"
                            height="110"> -->
                        <img src="resources/images/svg/skills/vue.svg" 
                            alt="VueJS" 
                            class="skill-img p-4" 
                            title="VueJS" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/php.svg" 
                            alt="PHP" 
                            class="skill-img p-4" 
                            title="PHP" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/mysql.svg" 
                            alt="MySQL" 
                            class="skill-img p-4" 
                            title="MySQL" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/laravel.svg" 
                            alt="Laravel" 
                            class="skill-img p-4" 
                            title="Laravel" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <img src="resources/images/svg/skills/git.svg" 
                            alt="git" 
                            class="skill-img p-4" 
                            title="git" 
                            loading="lazy"
                            width="110"
                            height="110">
                        <!-- <img src="resources/images/svg/skills/adobe-xd.svg" 
                            alt="Adobe XD" 
                            class="skill-img" 
                            title="Adobe XD" 
                            loading="lazy"
                            width="110"
                            height="110"> -->
                        <!-- <img src="resources/images/svg/skills/webflow.svg" 
                            alt="webflow" 
                            class="skill-img" 
                            title="webflow" 
                            loading="lazy"
                            width="110"
                            height="110"> -->
                        <img src="resources/images/svg/skills/figma-1.svg" 
                            alt="figma" 
                            class="skill-img p-4" 
                            title="figma" 
                            loading="lazy">
                        <img src="resources/images/svg/skills/outsystems.svg" 
                            alt="OutSystems" 
                            class="skill-img" 
                            title="OutSystems" 
                            loading="lazy"
                            width="110"
                            height="110">
                    </div>
                </div>
            </div>
        </section>
    
        <section id="about" class="py-5">
            <div class="container">
                <div class="row no-gutters flex-column flex-md-row border-radius">
                    <div class="col d-flex align-items-start justify-content-center flex-column">
                        <div class="text-section">A BIT ABOUT ME &#128075;</div>
                        <h2 class="mb-3 text-highlight h1">Robertson Morales</h2>
                        <p class="a-bit-about-me">I live in San Jose Del Monte City, Bulacan. I have a Bachelor of Science Degree in Information Technology. I work as a Passionate Web Developer & Designer, where I've developed and contributed to projects such as Travel, Loan, E-Commerce, E-Gift Certificates, and Revamp Websites. 
                        <br><br>My hobbies are watching anime, tutorial videos, reading articles, and playing with my pets.</p>
    
                        <div class="mb-3"></div>
    
                        <div class="d-none d-md-block">
                            <a class="btn btn-outline-primary btn-download-resume"
                            href="resources/attachment/resume.pdf"
                            download="Resume">Download Resume</a>
                        </div>
    
                        <!-- <div class="mb-4 mb-md-0"></div> -->
                    </div>
                    <div class="col-1"></div>
                    <div class="col">
                        <div class="bg-primary about-radius">
                            <div class="pt-1 pt-md-5 mb-3 mb-md-0">
                                <div class="flexbox-center overflow-hidden">
                                    <img class="img-drop-shadow" 
                                        src="resources/images/me/profile.webp" 
                                        loading="lazy"
                                        width="462"
                                        height="475"
                                        alt="Avatar">
                                </div>
                            </div>
                        </div>

                        <div class="d-block d-md-none">
                            <a class="btn btn-outline-primary btn-download-resume"
                            href="resources/attachment/resume.pdf"
                            download="Resume">Download Resume</a>
                        </div>
                    </div>
                </div>
        
            </div>
        </section>

        <section id="contact" class="py-5 bg-light">
            <div class="container">
                <div class="text-center">
                    <div class="text-section">CONTACT ME</div>
                    <h2 class="text-highlight">Any questions? Just write me a message!</h2>
                </div>
                
                <div class="row no-gutters contact-card">
                    <div class="col-5 bg-primary contact-radius">
                        <div class="contact-wrapper">
                            <div class="contact-information">
                                <h4>Contact Information</h4>
                                <p>Fill up the form and I will get back to you within 24 hours. Thank you!</p>

                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <em data-feather="phone"></em>
                                        <a class="ml-2" href="#callme" id="btn-call">+639552808438</a>
                                    </li>
                                    <li class="list-group-item">
                                        <em data-feather="mail"></em>
                                        <a class="ml-2" href="#emailme" id="btn-email">robertson.morales@gmail.com</a>
                                    </li>
                                    <li class="list-group-item">
                                        <em data-feather="map-pin"></em>
                                        <span class="ml-2">San Jose Del Monte City, Bulacan, Philippines</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="contact-information">
                                <div class="divider"></div>

                                <div class="flexbox-start">
                                    <a href="https://www.facebook.com/robertsonmorales.dev" 
                                        target="_blank" 
                                        title="Connect with me at facebook" 
                                        rel="noopener"
                                        class="btn-socmedia">
                                        <div class="icon-wrapper">
                                            <em data-feather="facebook"></em>
                                        </div>
                                    </a>
                                    
                                    <a href="https://www.linkedin.com/in/robertson-morales-517a721bb" 
                                        target="_blank" 
                                        title="Connect with me at linkedin" 
                                        rel="noopener"
                                        class="btn-socmedia">
                                        <div class="icon-wrapper">
                                            <em data-feather="linkedin"></em>
                                        </div>
                                    </a>
                                    
                                    <a href="https://github.com/robertsonmorales" 
                                        target="_blank" 
                                        title="Follow me at github" 
                                        rel="noopener"
                                        class="btn-socmedia">
                                        <div class="icon-wrapper">
                                            <em data-feather="github"></em>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <form action="/mail/contact.php"
                            method="POST" 
                            id="contact-form"
                            
                            class="p-5">
                            
                            <div class="row">
                                <div class="col">
                                    <div class="input-group">
                                        <label for="first_name">First Name</label>
                                        <input type="text" 
                                            name="first_name" 
                                            id="first_name" 
                                            class="form-control" 
                                            autocomplete="off">
                                        <span class="invalid-feedback" 
                                        id="validate-first_name"></span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <label for="last_name">Last Name</label>
                                        <input type="text" 
                                            name="last_name" 
                                            id="last_name" 
                                            class="form-control" 
                                            autocomplete="off">
                                        <span class="invalid-feedback" 
                                        id="validate-last_name"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="input-group">
                                        <label for="email_address">Email Address</label>
                                        <input type="email" 
                                            name="email_address"
                                            id="email_address" 
                                            class="form-control" 
                                            autocomplete="off">
                                        <span class="invalid-feedback" 
                                        id="validate-email_address"></span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <label for="phone_number">Phone Number</label>
                                        <input type="number" 
                                            name="phone_number"
                                            id="phone_number" 
                                            class="form-control" 
                                            autocomplete="off">
                                        <span class="invalid-feedback" 
                                        id="validate-phone_number"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group">
                                <label for="subject">What do you want me to do?</label>
                                <div id="offered-services"></div>

                                <span class="invalid-feedback" 
                                id="validate-subject"></span>
                            </div>
                            <div class="input-group">
                                <label for="message">Message</label>
                                <textarea name="message" 
                                    id="message"
                                    name="message" 
                                    cols="30" 
                                    rows="3" 
                                    class="form-control" 
                                    placeholder="Write your message here..."
                                    autocomplete="off"></textarea>
                                <span class="invalid-feedback" 
                                id="validate-message"></span>
                            </div>
    
                            <div class="flexbox-end">
                                <button class="btn btn-primary mobile-w-100"
                                    id="btn-submit" 
                                    type="submit">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="text-center py-1 bg-light">
            <div class="text-muted font-weight-500">&copy; <span id="year"></span> | Robertson Morales</div>
        </div>
    </footer>

    <script src="plugins/scrollreveal/scrollreveal.min.js"></script>
    <script src="plugins/jquery/dist/jquery.min.js"></script>
    <script defer src="plugins/bootstrap/dist/js/bootstrap.min.js"></script>
    <script defer src="plugins/feather-icons/dist/feather.min.js"></script>

    <script defer src="resources/js/scroll.js"></script>
    <script defer src="resources/js/script.js"></script>
    <script defer src="resources/js/contact.js"></script>
</body>
</html>