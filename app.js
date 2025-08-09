// AWS SDK Configuration
const AWS_CONFIG = {
    region: 'ap-southeast-1',
    apiGatewayUrl: 'https://your-api-gateway-url.execute-api.ap-southeast-1.amazonaws.com/prod'
};

// Custom cursor
let cursor;
document.addEventListener('DOMContentLoaded', () => {
    cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Show cursor initially
        cursor.style.display = 'block';
        
        document.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.opacity = '0';
        });
    }
});

// Particle system
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleInterval = setInterval(() => {
        if (document.querySelectorAll('.particle').length > 20) return;
        
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
    }, 500);
    
    // Clear particles when leaving main site
    window.particleInterval = particleInterval;
}

// Smooth scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0,0,0,0.95)';
    } else {
        header.style.background = 'rgba(0,0,0,0.9)';
    }
});

// Game data loading with animations
async function loadGameData(gameType = 'ayutthaya') {
    const gamesGrid = document.getElementById('games-grid');
    gamesGrid.innerHTML = '<div class="loading">Loading games...</div>';
    
    try {
        const response = await fetch(`${AWS_CONFIG.apiGatewayUrl}/games`);
        const gameData = await response.json();
        displayGames(gameData.games, gameType);
    } catch (error) {
        if (gameType === 'trk') {
            const fallbackGames = [
                { title: 'T.R.K Record', description: 'First-person Body Cam Shooter that takes you into thrilling tactical missions', icon: '🎯' }
            ];
            displayGames(fallbackGames, gameType);
        } else {
            const fallbackGames = [
                { title: 'THE SHADOW OF AYUTTHAYA', description: 'A game that will take you on an adventure to the ancient world of Ayutthaya filled with villains and incredible supernatural beings. Use! The! Shadow! As! Your! Weapon!!', icon: '🏰' }
            ];
            displayGames(fallbackGames, gameType);
        }
    }
    
    loadNews(gameType);
}

function displayGames(games, gameType = 'ayutthaya') {
    const gamesGrid = document.getElementById('games-grid');
    const showcaseImage = gameType === 'trk' ? 'TRK/Showcase.jpg' : 'Showcase.JPG';
    const logoImage = gameType === 'trk' ? '' : 'Logo.png';
    
    gamesGrid.innerHTML = games.map((game, index) => `
        <div class="game-card" style="animation-delay: ${index * 0.3}s">
            <div class="game-image">
                <img src="${showcaseImage}" alt="${game.title}" class="game-showcase">
                <div class="game-logo-overlay">
                    ${logoImage ? `<img src="${logoImage}" alt="Game Logo" class="card-game-logo">` : `<div class="game-title-overlay">${gameType === 'trk' ? 'T.R.K' : game.title}</div>`}
                </div>
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p>${game.description}</p>
            </div>
        </div>
    `).join('');
    
    // Add click events
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            if (gameType === 'trk') {
                window.open('https://www.youtube.com/watch?v=RJ3eAqZoUJE', '_blank');
            } else {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px) scale(1.02)';
                }, 150);
            }
        });
    });
}

function loadNews() {
    const newsContainer = document.getElementById('news-container');
    const news = [
        { title: 'The Shadow of Ayutthaya Released', date: '2024-01-15', content: 'Journey through the ancient kingdom of Ayutthaya.' },
        { title: 'New Combat System', date: '2024-01-10', content: 'Experience authentic Thai martial arts combat.' },
        { title: 'Historical Accuracy', date: '2024-01-05', content: 'Meticulously researched ancient Thai culture.' }
    ];
    
    newsContainer.innerHTML = news.map((item, index) => `
        <div class="news-item" style="animation-delay: ${index * 0.3}s">
            <h3>${item.title}</h3>
            <p class="news-date">${item.date}</p>
            <p>${item.content}</p>
        </div>
    `).join('');
}

// Modal functions
function showTrailer() {
    const modal = document.getElementById('trailer-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('trailer-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('trailer-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Intersection Observer for animations
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

// Game selection functionality
function selectGame(gameType) {
    const gameSelection = document.getElementById('game-selection');
    const mainSite = document.getElementById('main-site');
    
    gameSelection.style.animation = 'fadeOut 1s ease forwards';
    
    setTimeout(() => {
        gameSelection.style.display = 'none';
        mainSite.style.display = 'block';
        mainSite.style.animation = 'fadeInUp 1s ease forwards';
        
        // Initialize main site with selected game
        createParticles();
        loadGameData(gameType);
        initializeMainSite(gameType);
    }, 1000);
}

function initializeMainSite(gameType = 'ayutthaya') {
    // Update hero section based on game type
    updateHeroSection(gameType);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.games-section, .news-section, .about-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(2)';
        });
        btn.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
        });
    });
}

function updateHeroSection(gameType) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBg = document.querySelector('.hero-bg');
    const trailerBtn = document.querySelector('.btn-primary');
    
    if (gameType === 'trk') {
        heroTitle.setAttribute('data-th', 'T.R.K Record');
        heroTitle.setAttribute('data-en', 'T.R.K Record');
        heroSubtitle.setAttribute('data-th', 'ภารกิจสุดระทึกรอคุณอยู่');
        heroSubtitle.setAttribute('data-en', 'Thrilling Tactical Missions Await');
        heroBg.style.backgroundImage = "url('TRK/Showcase.jpg')";
        
        // Change trailer button to open YouTube
        trailerBtn.onclick = () => window.open('https://www.youtube.com/watch?v=RJ3eAqZoUJE', '_blank');
    } else {
        heroTitle.setAttribute('data-th', 'เงาแห่งอยุธยา');
        heroTitle.setAttribute('data-en', 'THE SHADOW OF AYUTTHAYA');
        heroSubtitle.setAttribute('data-th', 'อาณาจักรโบราณรอการกลับมา');
        heroSubtitle.setAttribute('data-en', 'Ancient Kingdom Awaits Your Return');
        heroBg.style.backgroundImage = "url('Envaronment1.jpg')";
        
        // Reset trailer button to original function
        trailerBtn.onclick = showTrailer;
    }
    
    // Apply current language
    switchLanguage(currentLanguage);
}

// Language switching functionality
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
    
    // Update fallback game data
    if (lang === 'en') {
        updateGameDataEnglish();
        updateNewsEnglish();
    } else {
        updateGameDataThai();
        updateNewsThai();
    }
}

function updateGameDataEnglish() {
    const fallbackGames = [
        { title: 'THE SHADOW OF AYUTTHAYA', description: 'A game that will take you on an adventure to the ancient world of Ayutthaya filled with villains and incredible supernatural beings. Use! The! Shadow! As! Your! Weapon!!', icon: '🏰' }
    ];
    displayGames(fallbackGames);
}

function updateGameDataThai() {
    const fallbackGames = [
        { title: 'เงาแห่งอยุธยา', description: 'เกมที่จะพาคุณผจญภัยไปกับโลกโบราณในสมัยอยุทธยาที่มีทั้งเหล่าตัวร้ายและสิ่งน่าเหลือเชื่ออีกมากมาย จง! ใช้! เงา! เป็น! อาวุธ!!', icon: '🏰' }
    ];
    displayGames(fallbackGames);
}

function updateNewsEnglish() {
    const news = [
        { title: 'The Shadow of Ayutthaya Released', date: '2024-01-15', content: 'Journey through the ancient kingdom of Ayutthaya.' },
        { title: 'New Combat System', date: '2024-01-10', content: 'Experience authentic Thai martial arts combat.' },
        { title: 'Historical Accuracy', date: '2024-01-05', content: 'Meticulously researched ancient Thai culture.' }
    ];
    loadNewsWithData(news);
}

function updateNewsThai() {
    const news = [
        { title: 'เงาแห่งอยุธยาเปิดตัวแล้ว', date: '2024-01-15', content: 'เดินทางผ่านอาณาจักรอยุธยาโบราณ' },
        { title: 'ระบบการต่อสู้ใหม่', date: '2024-01-10', content: 'สัมผัสการต่อสู้ศิลปะการต่อสู้ไทยแท้' },
        { title: 'ความแม่นยำทางประวัติศาสตร์', date: '2024-01-05', content: 'วิจัยวัฒนธรรมไทยโบราณอย่างพิถีพิถัน' }
    ];
    loadNewsWithData(news);
}

function loadNewsWithData(newsData) {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        newsContainer.innerHTML = newsData.map((item, index) => `
            <div class="news-item" style="animation-delay: ${index * 0.3}s">
                <h3>${item.title}</h3>
                <p class="news-date">${item.date}</p>
                <p>${item.content}</p>
            </div>
        `).join('');
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language to Thai
    switchLanguage('th');
    
    // Hide loading screen after 4 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 4000);
    
    // Add game selection click events
    document.querySelectorAll('.game-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            const gameType = slot.getAttribute('data-game');
            selectGame(gameType);
        });
    });
    
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const gameType = e.target.closest('.game-slot').getAttribute('data-game');
            selectGame(gameType);
        });
    });
    
    // Add language switcher events
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});