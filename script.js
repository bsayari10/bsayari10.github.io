document.addEventListener('DOMContentLoaded', () => {

    /* ── Footer year ── */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ── Navbar scroll state ── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const updateNav = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();
    }


    /* ── Mobile menu ── */
    const hamburger = document.querySelector('.hamburger');
    const mobilePanel = document.getElementById('mobileMenuPanel');
    const backdrop = document.getElementById('navBackdrop');

    function openMenu() {
        hamburger.classList.add('active');
        if (mobilePanel) mobilePanel.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        if (mobilePanel) mobilePanel.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        hamburger.classList.contains('active') ? closeMenu() : openMenu();
    }

    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close when a mobile panel link is clicked
    if (mobilePanel) {
        mobilePanel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeMenu());
        });
    }

    // Close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close panel if viewport resizes to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && hamburger && hamburger.classList.contains('active')) {
            closeMenu();
        }
    }, { passive: true });


    /* ── Scroll-spy: active nav link ── */
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            // Update both desktop nav-links and mobile panel links
            const desktopLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            const mobileLink = document.querySelector(`#mobileMenuPanel a[href="#${id}"]`);
            const isActive = scrollY >= top && scrollY < top + height;

            if (desktopLink) desktopLink.classList.toggle('active', isActive);
            if (mobileLink) mobileLink.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    /* ── Scroll-reveal (Intersection Observer) ── */
    const fadeEls = document.querySelectorAll('.fade-in');
    const fadeObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObs.observe(el));


    /* ── Gallery lightbox ── */
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    document.querySelectorAll('img.zoomable, .gallery-item img, img.idp-image').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (img.src) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            }
        });
    });

    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

});
