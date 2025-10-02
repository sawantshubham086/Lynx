// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => 
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// New Arrivals Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.arrival-item');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Initialize carousel on mobile
function initCarousel() {
    if (window.innerWidth <= 768) {
        document.querySelector('.arrivals-grid').style.display = 'flex';
        document.querySelector('.arrivals-grid').style.overflow = 'hidden';
        
        slides.forEach((slide, i) => {
            slide.style.minWidth = '100%';
            slide.style.transform = `translateX(${i * 100}%)`;
        });
        
        document.querySelector('.next').addEventListener('click', nextSlide);
        document.querySelector('.prev').addEventListener('click', prevSlide);
        
        showSlide(0);
    }
}

// Hero images are now displayed in a static grid layout
// No need for auto-rotation as all images are visible simultaneously

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .features, .new-arrivals, .tech-details');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Initialize carousel if needed
    initCarousel();
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Add hover effects for interactive elements
document.querySelectorAll('.cta-button, .shop-btn, .arrow').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced mobile navigation
function createMobileNav() {
    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            .nav-menu.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.98);
                padding: 20px;
                gap: 20px;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize mobile navigation on page load
document.addEventListener('DOMContentLoaded', createMobileNav);

// Reinitialize on window resize
window.addEventListener('resize', () => {
    createMobileNav();
    initCarousel();
});

// Add click handlers for CTA buttons
document.querySelector('.cta-button').addEventListener('click', () => {
    alert('Thanks for your interest! We\'ll notify you when LYNX OUTFIT launches. Stay tuned for revolutionary apparel technology!');
});

// Add product click simulation
document.querySelectorAll('.arrival-item').forEach(item => {
    item.addEventListener('click', () => {
        alert('This product will be available soon! Join our waitlist to be notified when we launch.');
    });
});

document.querySelectorAll('.shop-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Coming Soon! LYNX OUTFIT will launch with revolutionary fabric technology. Stay tuned!');
    });
});