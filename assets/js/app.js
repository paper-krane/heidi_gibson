class HG {
    constructor() {
        this.init();
    }

    init() {
        console.log(`Website by Paper Krane (https://paperkrane.io)`);
        console.log(`Heidi Gibson scripts initialized... Beep boop bop beep boop!`);

        this.navToggleInit();
        this.cursorFollow();
        this.cursorExpand();
        this.parallaxListener();
        this.slider();
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
                items: 2,
                autoplay: false,
                draggable: true,
                nav: false,
                controlsContainer: '#hg__slider-controls',
                preventScrollOnTouch: 'force',
                speed: 800,
                responsive: {
                    992: {
                        items: 3
                    },
                    1600: {
                        items: 4
                    }
                }
            });
        }
    }
}

const hg = new HG();