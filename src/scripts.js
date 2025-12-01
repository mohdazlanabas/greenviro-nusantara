// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target || '0');
                const duration = 1200;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const value = (target * progress).toFixed(0);
                    el.textContent = value;
                    if (progress < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.35 });

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);
