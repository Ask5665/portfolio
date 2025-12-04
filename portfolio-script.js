// === NAVIGATION ===
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// === TYPING EFFECT ===
const typingText = document.querySelector('.typing-text');
const titles = [
    'Full Stack Java Developer',
    'IoT Integrator',
    'AI Enthusiast',
    'Problem Solver'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .cert-card, .value-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(el => fadeInObserver.observe(el));

// === SKILL BAR ANIMATION ===
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(skill => skillObserver.observe(skill));

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Form validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (replace with actual backend endpoint)
    try {
        // For demonstration purposes, we'll just show a success message
        // In production, you would send this to a backend API

        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();

        // Log the form data (in production, this would be sent to a server)
        console.log('Form submitted:', data);

    } catch (error) {
        showFormMessage('Oops! Something went wrong. Please try again.', 'error');
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// === SCROLL TO TOP BUTTON ===
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// === DOWNLOAD CV BUTTON ===
const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = 'Ankit_Kamanalli_Resume.pdf';
    link.download = 'Ankit_Kamanalli_Resume.pdf';
    link.click();
});

// === SMOOTH SCROLLING FOR ALL ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === PERFORMANCE: Lazy load images if any are added ===
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// === ACCESSIBILITY: Keyboard navigation improvements ===
document.addEventListener('keydown', (e) => {
    // Press ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// === PREVENT FLASH OF UNSTYLED CONTENT ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// === LOG INITIALIZATION ===
console.log('%c Portfolio Website Loaded Successfully! ', 'background: linear-gradient(135deg, #6366f1, #06b6d4); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Designed and Developed by Ankit Kamanalli ', 'color: #6366f1; font-size: 12px;');
