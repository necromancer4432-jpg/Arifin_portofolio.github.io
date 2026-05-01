// Initialize Lucide Icons
lucide.createIcons();

// ==========================================
// Typing Effect
// ==========================================
const typingTexts = [
    'Web Developer | Laravel Enthusiast',
    'Mahasiswa Teknik Informatika',
    'Problem Solver | Fast Learner',
    'Membangun Solusi Digital Berdampak'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 500; // Pause before next word
    }

    setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1000);

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-slate-800/50');
    } else {
        navbar.classList.remove('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-slate-800/50');
    }
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ==========================================
// Intersection Observer — Scroll Animations
// ==========================================
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars if present
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, 300);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    animationObserver.observe(el);
});

// ==========================================
// Counter Animation
// ==========================================
let counterDone = false;
const aboutSection = document.getElementById('about');

if (aboutSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterDone) {
                counterDone = true;

                const counters = [
                    ['counter-projects', 8],
                    ['counter-skills', 12]
                ];

                counters.forEach(([id, target]) => {
                    const el = document.getElementById(id);
                    if (!el) return;

                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const progress = Math.min((currentTime - startTime) / 1500, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target) + '+';

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                });
            }
        });
    }, {
        threshold: 0.3
    });

    counterObserver.observe(aboutSection);
}

// ==========================================
// Project Filter
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function updateFilterStyles() {
    filterButtons.forEach(btn => {
        if (btn.classList.contains('active')) {
            btn.style.cssText = 'background-color:#2563eb;border-color:#2563eb;color:#ffffff;';
        } else {
            btn.style.cssText = 'background-color:transparent;border-color:#334155;color:#94a3b8;';
        }
    });
}

updateFilterStyles();

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateFilterStyles();

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.style.display = '';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.transition = 'all 0.4s ease';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 400);
            }
        });
    });
});

// ==========================================
// Active Nav Link on Scroll
// ==========================================
window.addEventListener('scroll', () => {
    let currentSection = '';

    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
});
