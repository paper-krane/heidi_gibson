class HG {
    constructor() {
        this.init();
    }

    init() {
        console.log(`Website by Paper Krane (https://paperkrane.io)`);
        console.log(`Heidi Gibson scripts initialized... Beep boop bop beep boop!`);

        this.navBarListener();
        this.navToggleInit();
        this.cursorFollow();
        this.cursorExpand();
        this.parallaxListener();
        this.headerReveal();
        this.heroReveal();
        this.slider();
        this.productReveal();
        this.aboutParallax();
        this.articleReveal();
    }

    // Navbar Background
    navBarListener() {
        const navBar = document.querySelector('#hg__navbar');

        this.navBarClass(navBar);

        window.addEventListener('scroll', (e) => {
            this.navBarClass(navBar);
        }, false);
    }

    navBarClass(navBar) {
        if (window.scrollY === 0) {
            navBar.classList.remove('hg__background');
        } else {
            navBar.classList.add('hg__background');
        }
    }

    // Nav toggle
    navToggleInit() {
        const toggles = document.querySelectorAll('.hg__mobile-toggle, #hg__nav-filter');
        const navElements = document.querySelectorAll('[data-nav]');

        for (let toggle of toggles) {
            this.navToggle(toggle, navElements, 'click');
            this.navToggle(toggle, navElements, 'keyup');
        }
    }

    navToggle(el, controledElements, eType) {
        el.addEventListener(eType, (e) => {
            if (e.keyCode === 13 || e.type === "click") {
                e.preventDefault();
                e.stopPropagation();
                
                for (let element of controledElements) {
                    element.classList.toggle("hg__active");
                }
              
            }
        }, false);
    }

    // Cursor functions
    cursorFollow() {
        const cursor = document.querySelector('.cursor.stylus');

        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 1280) {
                var x = e.clientX;
                var y = e.clientY;

                const cursorMove = gsap.to(cursor, {
                duration: 1,
                    x: x,
                    y: y,
                    opacity: 1,
                    ease: Expo.easeOut
                });
            } else {
                cursor.style.opacity = 0;
            }
        }, false);
    }
  
    cursorExpand() {
        const hoverable = document.querySelectorAll('a, [data-toggle], button, input, textarea, select, .hg__checkbox');
        const cursor = document.querySelector('#hg__cursor');
        
        for (var i = 0; i < hoverable.length; i++) {
            hoverable[i].addEventListener('mouseover', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '108px',
                    height: '108px',
                    marginLeft: '-54px',
                    marginTop: '-54px',
                    opacity: .5,
                    background: 'transparent',
                    ease: Expo.easeOut
                });
            }, false);
            hoverable[i].addEventListener('mouseout', (e) => {
                const cursorMove = gsap.to(cursor, .5, {
                    width: '32px',
                    height: '32px',
                    marginLeft: '-16px',
                    marginTop: '-16px',
                    opacity: .5,
                    background: '#a2907c',
                    ease: Expo.easeOut
                });
            }, false);
        }
    }

    // Parallax Functions
    parallaxListener() {
        const parallaxParents = document.querySelectorAll("[data-parallax-container]");
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        const mouse = {x: 0, y: 0, moved: false};

        for (let parallaxContainer of parallaxParents) {
            const rect = parallaxContainer.getBoundingClientRect();

            parallaxContainer.addEventListener('mousemove', function(e) {
                mouse.moved = true;
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });

            gsap.ticker.add(() => {
                if (mouse.moved){  
                    for (let el of parallaxElements) { 
                        this.parallax(mouse, rect, el, parseInt(`-${el.dataset.parallaxSpeed}`));
                    }
                }
                mouse.moved = false;
            });
        }

        window.addEventListener('resize', function(){
            if (window.innerWidth < 992) {
                for (let el of parallaxElements) {
                    el.removeAttribute('style');
                }
            }
        }, false);
    }

    parallax(mouse, rect, target, movement) {
        if (window.innerWidth >= 992) {
            gsap.to(target, 0.5, {
                x: (mouse.x - rect.width / 2) / rect.width * movement,
                y: (mouse.y - rect.height / 2) / rect.height * movement
            });
        } else {
            target.removeAttribute('style');
        }
    }

    slider() {
        const sliderContainer = document.querySelector('#hg__slider');

        if (sliderContainer) {
            const slider = tns({
                container: sliderContainer,
                items: 1,
                autoplay: false,
                draggable: true,
                nav: false,
                controlsContainer: '#hg__slider-controls',
                preventScrollOnTouch: 'force',
                speed: 800,
                loop: false,
                rewind: true,
                responsive: {
                    600: {
                        items: 2
                    },
                    992: {
                        items: 3
                    },
                    2000: {
                        items: 4
                    }
                }
            });
        }
    }

    headerReveal() {
        const headers = document.querySelectorAll('#hg__navbar, #hg__mobile-navbar');

        ScrollTrigger.batch(headers, {
            onEnter: (batch) => {gsap.to(batch, {
                opacity: 1,
                duration: 2,
                delay: 2.5
            })}
        });
    }

    heroReveal() {
        const images = document.querySelectorAll('#hg__hero-image .swipe, #hg__hero-accent-1 .swipe');
        const content = document.querySelectorAll('#hg__hero-content .hg__hero-content-container');
        const finalImage = document.querySelectorAll('#hg__hero-content #hg__hero-accent-2 .swipe');

        ScrollTrigger.batch(images, {
            onEnter: (batch) => {gsap.to(batch, {
                height: 0,
                ease: "power3",
                duration: 2,
                delay: .25
            })}
        });

        ScrollTrigger.batch(content, {
            onEnter: (batch) => {gsap.to(batch, {
                opacity: 1,
                duration: 2,
                delay: 1.25
            })}
        });

        ScrollTrigger.batch(finalImage, {
            onEnter: (batch) => {gsap.to(batch, {
                width: 0,
                ease: "power3",
                duration: 2,
                delay: 1.5
            })}
        });
    }

    productReveal() {
        const products = document.querySelectorAll('.hg__product');
        
        if (products.length > 0) {
            ScrollTrigger.batch(products, {
                onEnter: (batch) => {gsap.to(batch, {
                    opacity: 1, 
                    y: 0,
                    stagger: 0.25, 
                    duration: 1.5,
                    delay: 0,
                    scrollTrigger: {
                        trigger: "#hg__slider"
                    }
                })}
            });
        }
    }

    articleReveal() {
        const articles = document.querySelectorAll('#hg__image-banner .hg__col .swipe');

        ScrollTrigger.batch(articles, {
            onEnter: (batch) => {gsap.to(batch, {
                width: 0,
                ease: "power3",
                duration: 2
            })}
        });
    }

    aboutParallax() {
        gsap.to("#hg__about-image", {
            y: () => {
                if (window.innerWidth > 992) {
                    return 32;
                } else {
                    return 0;
                }
            },
            ease: "power1",
            scrollTrigger: {
              trigger: "#hg__about-image",
              start: "top bottom",
              end: "100% 140px",
              scrub: 3
            }, 
        });
    }
}

const hg = new HG();