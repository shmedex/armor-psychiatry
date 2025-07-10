document.addEventListener("DOMContentLoaded", function () {
    // -------------------------------
    // Utility: Detect touch devices
    // -------------------------------
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // -------------------------------
    // Counter Animation
    // -------------------------------
    function animateCounter(counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let decimals = (target % 1 !== 0) ? 1 : 0;
        const duration = 1200;
        const frameRate = 24;
        const totalFrames = Math.round(duration / (1000 / frameRate));
        let frame = 0;

        function update() {
            frame++;
            let progress = frame / totalFrames;
            let value = target * progress;
            if (progress >= 1) {
                value = target;
            }
            counter.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        update();
    }

    function animateAllCounters() {
        document.querySelectorAll('.counter').forEach(counter => {
            animateCounter(counter);
        });
    }

    animateAllCounters();

    let animated = false;
    window.addEventListener('scroll', function () {
        const section = document.querySelector('.counter-box');
        if (!animated && section && section.getBoundingClientRect().top < window.innerHeight) {
            animateAllCounters();
            animated = true;
        }
    });

    // -------------------------------
    // Dropdown Hover (Desktop)
    // -------------------------------
    if (!isTouchDevice()) {
        document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-link.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            dropdown.addEventListener('mouseenter', function () {
                toggle.classList.add('show');
                menu.classList.add('show');
            });

            dropdown.addEventListener('mouseleave', function () {
                toggle.classList.remove('show');
                menu.classList.remove('show');
            });
        });
    }

    // -------------------------------
    // Mobile Tap-to-Open / Redirect on 2nd Tap
    // -------------------------------
    const servicesToggle = document.querySelector('#servicesToggle');
    const aboutToggle = document.querySelector('#aboutDropdown');

    let servicesOpenedOnce = false;
    let aboutOpenedOnce = false;

    let servicesDropdown, aboutDropdown;

    if (servicesToggle && isTouchDevice()) {
        servicesDropdown = new bootstrap.Dropdown(servicesToggle);
        servicesToggle.addEventListener('click', function (e) {
            if (!servicesOpenedOnce) {
                e.preventDefault();
                servicesDropdown.show();
                servicesOpenedOnce = true;
            } else {
                window.location.href = 'services.html';
            }
        });
    }

    if (aboutToggle && isTouchDevice()) {
        aboutDropdown = new bootstrap.Dropdown(aboutToggle);
        aboutToggle.addEventListener('click', function (e) {
            if (!aboutOpenedOnce) {
                e.preventDefault();
                aboutDropdown.show();
                aboutOpenedOnce = true;
            } else {
                window.location.href = 'about-us.html';
            }
        });
    }

    // -------------------------------
    // Close dropdowns when tapping outside (Mobile only)
    // -------------------------------
    document.addEventListener('click', function (e) {
        const isOutsideServices = servicesToggle && !servicesToggle.contains(e.target);
        const isOutsideAbout = aboutToggle && !aboutToggle.contains(e.target);

        if (isTouchDevice()) {
            if (servicesOpenedOnce && isOutsideServices) {
                servicesDropdown.hide();
                servicesOpenedOnce = false;
            }

            if (aboutOpenedOnce && isOutsideAbout) {
                aboutDropdown.hide();
                aboutOpenedOnce = false;
            }
        }
    });
});
