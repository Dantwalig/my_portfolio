// ================================
// CUSTOM CURSOR
// ================================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Hover effect for interactive elements
const interactives = document.querySelectorAll('a, button, .card, .project-card, .timeline-item, .skill-item, .fact');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#ff00ff';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00ff88';
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements INCLUDING the new slide-in-diagonal
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .slide-in-diagonal').forEach(el => {
    scrollObserver.observe(el);
});

// Observe section titles
document.querySelectorAll('.section-title').forEach(title => {
    scrollObserver.observe(title);
});

// Stagger animation delays for cards
document.querySelectorAll('.fade-in-up').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.scale-in').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
});

// ================================
// EMOJI RAIN EFFECT
// ================================
function triggerEmojiRain() {
    const emojis = ['🏥', '💻', '🤖', '⭐', '🔥', '💡', '✨', '🎯', '🚀', '🌟'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 2 + 3) + 's';
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 5000);
        }, i * 100);
    }
}

// Observe fun facts for scroll animation and auto emoji rain
const factObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            triggerEmojiRain();
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

const funFactsSection = document.querySelector('.fun-facts');
if (funFactsSection) {
    factObserver.observe(funFactsSection);
}

// Click on facts also triggers emoji rain
const facts = document.querySelectorAll('.fact');
facts.forEach(fact => {
    fact.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && !e.target.closest('a')) {
            triggerEmojiRain();
        }
    });
});

// ================================
// PROJECT LINKS
// ================================
// document.querySelectorAll('.project-link').forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const projectName = e.currentTarget.querySelector('.project-title').textContent;
//         alert(`Link placeholder for: ${projectName}\n\nYou can add your project URL here later!`);
//     });
// });

// ================================
// PARALLAX EFFECT ON SHAPES
// ================================
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ================================
// SMOOTH SCROLL
// ================================
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

// ================================
// MOBILE CURSOR HANDLING
// ================================
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}