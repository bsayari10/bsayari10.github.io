document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer (with null check for resume page)
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Bootstrap Active Navigation Link handling on Scroll handled below
    const navbarCollapse = document.getElementById('navbarNav');
    
    // Close Bootstrap Menu on Link Click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Try closing with bootstrap instance if available, otherwise just use vanilla JS
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Sticky Navbar Styling on Scroll (with null check for resume page)
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.classList.add('shadow-sm');
                navbar.style.background = 'rgba(252, 252, 250, 0.98)';
            } else {
                navbar.style.padding = '1.2rem 0';
                navbar.classList.remove('shadow-sm');
                navbar.style.background = 'transparent';
            }
        });
    }

    // Gallery Click Lightbox logic
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Only select actual image elements that have the zoomable class or are inside a gallery item
    document.querySelectorAll('img.zoomable, .gallery-item img, img.idp-image').forEach(img => {
        // Add cursor style for UX
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubbling immediately
            
            // Just double check we have a source before opening
            if(img.src) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            }
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

});
