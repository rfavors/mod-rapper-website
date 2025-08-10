// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Track Card Hover Effects
document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Play Button Click Effect
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Reset all play buttons
        document.querySelectorAll('.play-btn').forEach(b => {
            b.classList.remove('fa-pause');
            b.classList.add('fa-play');
        });
        
        // Toggle current button
        if (btn.classList.contains('fa-play')) {
            btn.classList.remove('fa-play');
            btn.classList.add('fa-pause');
            
            // Add pulse effect
            btn.style.animation = 'pulse 1s infinite';
            
            // Simulate playing for 3 seconds then stop
            setTimeout(() => {
                btn.classList.remove('fa-pause');
                btn.classList.add('fa-play');
                btn.style.animation = 'none';
            }, 3000);
        }
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const bookingType = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !bookingType || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#ff0041' : type === 'error' ? '#ff4444' : '#333'};
        color: ${type === 'success' || type === 'error' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.track-card, .tour-item, .about-text, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000000) {
                stat.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace(/[0-9.]/g, '');
            } else if (target >= 1000) {
                stat.textContent = (current / 1000).toFixed(0) + 'K' + suffix.replace(/[0-9]/g, '');
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Tour Item Hover Effects
document.querySelectorAll('.tour-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.background = 'linear-gradient(145deg, #1f1f1f, #0a0a0a)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.background = 'linear-gradient(145deg, #1a1a1a, #0f0f0f)';
    });
});

// Social Links Hover Effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-video');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smoke Animation on Page Load
function createSmokeParticles() {
    const smokeContainer = document.getElementById('smokeContainer');
    if (!smokeContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'smoke-particle';
            
            // Random size between 20px and 80px
            const size = Math.random() * 60 + 20;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            const duration = Math.random() * 2 + 3; // 3-5 seconds
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            
            smokeContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (duration + 0.5) * 1000);
        }, i * 200); // Stagger particle creation
    }
    
    // Fade out smoke container after 5 seconds
    setTimeout(() => {
        smokeContainer.classList.add('fade-out');
        setTimeout(() => {
            smokeContainer.style.display = 'none';
        }, 2000);
    }, 5000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Initialize smoke animation
    createSmokeParticles();
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Console Easter Egg
console.log(`
%c🎤 M.O.D! - Money • Over • Death 🎤
%cWelcome to the underground. Check out the latest tracks!
`, 
'color: #ff0041; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #ff0041;',
'color: #ffffff; font-size: 12px;'
);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);