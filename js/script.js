document.addEventListener("DOMContentLoaded", function () {
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
    // Dropdown Hover on Desktop, Click on Mobile
    // -------------------------------
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-link.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!isTouchDevice()) {
            // Hover for desktop
            dropdown.addEventListener('mouseenter', function () {
                toggle.classList.add('show');
                menu.classList.add('show');
            });
            dropdown.addEventListener('mouseleave', function () {
                toggle.classList.remove('show');
                menu.classList.remove('show');
            });
        }
    });

    // -------------------------------
    // Services: Redirect on second tap
    // -------------------------------
   function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

document.addEventListener('DOMContentLoaded', function () {
  const servicesToggle = document.querySelector('#servicesToggle');
  const aboutToggle = document.querySelector('#aboutDropdown');

  let servicesOpenedOnce = false;
  let aboutOpenedOnce = false;

  if (servicesToggle) {
    const servicesDropdown = new bootstrap.Dropdown(servicesToggle); // Bootstrap API

    servicesToggle.addEventListener('click', function (e) {
      if (isTouchDevice() && !servicesOpenedOnce) {
        e.preventDefault(); // Prevent redirect
        servicesDropdown.show(); // Open dropdown
        servicesOpenedOnce = true;
      } else {
        window.location.href = 'services.html'; // Redirect on 2nd tap
      }
    });
  }

  if (aboutToggle) {
    const aboutDropdown = new bootstrap.Dropdown(aboutToggle); // Bootstrap API

    aboutToggle.addEventListener('click', function (e) {
      if (isTouchDevice() && !aboutOpenedOnce) {
        e.preventDefault();
        aboutDropdown.show();
        aboutOpenedOnce = true;
      } else {
        window.location.href = 'about-us.html';
      }
    });
  }

  // Reset flags if clicked outside
  document.addEventListener('click', function (e) {
    if (servicesToggle && !servicesToggle.contains(e.target)) {
      servicesOpenedOnce = false;
    }
    if (aboutToggle && !aboutToggle.contains(e.target)) {
      aboutOpenedOnce = false;
    }
  });
});
// -------------------------------
});
