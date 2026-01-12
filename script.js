document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    // Smooth entrance for Hero elements
    function startHeroAnimations() {
        const revealElements = document.querySelectorAll('.hero .reveal-text, .hero .reveal-text-delay');
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }

    // Loader logic
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
                mainContent.style.opacity = '1';
                startHeroAnimations();
            }, 500);
        }, 1000);
    });

    // Fallback
    setTimeout(() => {
        if (loader.style.visibility !== 'hidden') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            mainContent.style.opacity = '1';
            startHeroAnimations();
        }
    }, 5000);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const scrollBar = document.createElement('div');
    scrollBar.className = 'scroll-indicator';
    document.body.appendChild(scrollBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollBar.style.width = progress + '%';

        if (window.pageYOffset > window.innerHeight * 0.5) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Aggressive Zoom effect on hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const viewportHeight = window.innerHeight;
        if (scrolled < viewportHeight) {
            const scale = 1 + (scrolled / viewportHeight) * 0.3;
            hero.style.transform = `scale(${scale})`;
        }
    });

    // Scroll Reveal functionality
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Discovery Carousel Observer - ULTIMATE ROBUST VERSION
    const discoverySection = document.querySelector('.discovery');
    const cardsGrid = document.querySelector('.cards-grid');

    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && cardsGrid) {
                // 1. Aparece con fade-in
                setTimeout(() => {
                    cardsGrid.classList.add('animate-in');

                    // 2. Espera 1.2s antes de "bailar"
                    setTimeout(() => {
                        cardsGrid.style.scrollSnapType = 'none';

                        let amount = 0;
                        const target = 200;
                        const speed = 5;

                        // Scroll hacia la derecha
                        const driveRight = setInterval(() => {
                            cardsGrid.scrollLeft += speed;
                            amount += speed;
                            if (amount >= target) {
                                clearInterval(driveRight);

                                // Pausa y regreso gradual
                                setTimeout(() => {
                                    const driveBack = setInterval(() => {
                                        cardsGrid.scrollLeft -= (speed / 2);
                                        amount -= (speed / 2);
                                        if (amount <= 0) {
                                            clearInterval(driveBack);
                                            cardsGrid.scrollLeft = 0;
                                            // Restaurar snap
                                            cardsGrid.style.scrollSnapType = 'x mandatory';
                                        }
                                    }, 10);
                                }, 500);
                            }
                        }, 10);
                    }, 1200);
                }, 500);
                carouselObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (discoverySection) carouselObserver.observe(discoverySection);

    // Magnetic & Mercurial Effect for Bento Grid with Dynamic Colors
    const sonoroSection = document.querySelector('.sonoro-dna');
    const bentoItems = document.querySelectorAll('.bento-magnetic');

    bentoItems.forEach(item => {
        const color = item.getAttribute('data-color');

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Mercurial movement: smooth attraction
            item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
            item.querySelector('.bento-content').style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;

            // Dynamic Color Change
            if (sonoroSection) sonoroSection.style.setProperty('--dynamic-color', color);
            item.style.setProperty('--dynamic-hover-color', color);
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `translate(0, 0) scale(1)`;
            item.querySelector('.bento-content').style.transform = `translate(0, 0)`;
            if (sonoroSection) sonoroSection.style.setProperty('--dynamic-color', 'transparent');
        });
    });

    // Timeline Scroll Progress & Event Activation
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineEvents = document.querySelectorAll('.timeline-event');

    window.addEventListener('scroll', () => {
        if (!timelineContainer || !timelineProgress) return;

        const rect = timelineContainer.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // Calculate progress based on how much of the timeline is scrolled
        if (rect.top < viewHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const scrolled = Math.max(0, viewHeight * 0.6 - rect.top);
            const progress = (scrolled / totalHeight) * 100;

            timelineProgress.style.height = `${Math.min(100, progress)}%`;

            // Activate events as "light" passes them
            timelineEvents.forEach(event => {
                const eventTop = event.getBoundingClientRect().top;
                if (eventTop < viewHeight * 0.65) {
                    event.classList.add('active');
                } else {
                    event.classList.remove('active');
                }
            });
        }
    });
});
