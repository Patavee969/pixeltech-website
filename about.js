// Language switching for about page
let currentLanguage = 'th';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-th][data-en]').forEach(element => {
        if (lang === 'th') {
            element.textContent = element.getAttribute('data-th');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language to Thai
    switchLanguage('th');
    
    // Add language switcher events
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Initialize cursor and particles
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        cursor.style.display = 'block';
    }
    
    // Create particles
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        setInterval(() => {
            if (document.querySelectorAll('.particle').length > 15) return;
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }, 600);
    }
});