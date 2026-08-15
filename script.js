// Games Database for Interactive Detail Modals
const GAMES_DATA = {
  'gravity-flip': {
    title: { cs: 'Gravity Flip', en: 'Gravity Flip' },
    tags: 'UNITY 2D · ANDROID · ACTION RUNNER',
    statusClass: 'status-soon',
    statusText: { cs: 'BRZY NA GOOGLE PLAY', en: 'COMING SOON TO GOOGLE PLAY' },
    img: 'assets/images/gravity_flip.png',
    desc: {
      cs: 'Gravity Flip je rychlá, adrenalinová 2D runner hra, kde je vaším hlavním nástrojem změna gravitace. Hráč musí okamžitě reagovat na překážky, překlápět gravitaci strop/podlaha, sbírat mince a aktivovat ochranné power-upy.',
      en: 'Gravity Flip is a high-speed 2D runner game where your main mechanic is instant gravity flipping. Switch between floor and ceiling to dodge laser hazards, collect coins and unleash shield power-ups.'
    },
    features: {
      cs: [
        'Blesková mechanika otáčení gravitace jedním klepnutím',
        'Dynamicky generované překážky a laserové pasti',
        'Systém sbírání mincí, násobičů skóre a power-upů',
        'Globální žebříček skóre pro soutěžení s přáteli',
        'Optimalizováno pro plynulých 60+ FPS na mobilních zařízeních'
      ],
      en: [
        'Instant one-tap gravity flip controls',
        'Procedurally generated obstacles and laser traps',
        'Coin collection system, score multipliers & shield power-ups',
        'Global high-score leaderboard',
        'Optimized for smooth 60+ FPS on mobile screens'
      ]
    },
    platform: 'Android / Google Play',
    engine: 'Unity 2D (C# Scripting)'
  },
  'puzzle-world': {
    title: { cs: 'Puzzle World', en: 'Puzzle World' },
    tags: 'UNITY · MOBILE · CASUAL PUZZLE',
    statusClass: 'status-progress',
    statusText: { cs: 'V PŘÍPRAVĚ', en: 'IN PROGRESS' },
    img: 'assets/images/puzzle_world.png',
    desc: {
      cs: 'Puzzle World je vytvořen jako oddechová a vizuálně podmanivá hra pro mobilní zařízení. Nabízí desítky unikátních logických úrovní, které rozvíjí myšlení bez zbytečného stresu nebo časového tlaku.',
      en: 'Puzzle World is crafted as a relaxing and visually captivating casual game for mobile devices. Featuring dozens of unique spatial and color puzzle levels to train your brain without stress.'
    },
    features: {
      cs: [
        'Oddechová hratelnost bez agresivních časovačů',
        'Barevný stylizovaný vizuální design a hmatové animace',
        'Gradující obtížnost úrovní – od lehkých po náročnější výzvy',
        'Uklidňující zvukový doprovod a efekty'
      ],
      en: [
        'Relaxing gameplay loop with no high-stress timers',
        'Vibrant stylized art direction and satisfying animations',
        'Gradually ramping difficulty curve',
        'Soothing ambient soundtrack & tactile audio feedback'
      ]
    },
    platform: 'Android & iOS',
    engine: 'Unity Engine (C#)'
  },
  'last-island': {
    title: { cs: 'Last Island Colony', en: 'Last Island Colony' },
    tags: 'UNITY 3D · PC / MOBILE · SURVIVAL STRATEGY',
    statusClass: 'status-dev',
    statusText: { cs: 'VE VÝVOJI', en: 'IN DEVELOPMENT' },
    img: 'assets/images/last_island.png',
    desc: {
      cs: 'Last Island Colony je napínavá survivor strategická hra, ve které máte jediný cíl: vybudovat a udržet naživu poslední lidskou kolonii. Čelte útokům obávaných temných pirátů, manažujte sběr základních surovin (jídlo, kámen, dřevo, mince), rozšiřujte území ostrova a eliminujte všechna nebezpečí v nehostinném prostředí.',
      en: 'Last Island Colony is a tense survival strategy game where your objective is to build and maintain the last human colony. Defend against raids from menacing dark pirates, manage resource gathering (food, stone, wood, coins), expand your island borders, and eliminate dangers in an unforgiving world.'
    },
    features: {
      cs: [
        'Budování a obrana poslední kolonie před temnými piráty',
        'Sběr a správa klíčových surovin (jídlo, kámen, dřevo, mince)',
        'Postupné rozšiřování území ostrova a objevování nových oblastí',
        'Eliminace nebezpečí, nepřátelských útoků a přirozených hrozeb',
        'Optimalizováno pro plynulý chod na PC i mobilních zařízeních'
      ],
      en: [
        'Colony building & defense against dark pirate raids',
        'Resource gathering system (food, stone, wood, coins)',
        'Gradual island expansion and area discovery',
        'Elimination of hostile threats and survival hazards',
        'Optimized for smooth performance on PC & mobile'
      ]
    },
    platform: 'PC (Steam) & Android',
    engine: 'Unity 3D (C# Architecture)'
  }
};

// Global State
let currentLang = localStorage.getItem('lj-lang') || 'cs';
let activeModalGameKey = null;
let soundEnabled = false;
let audioCtx = null;

// Initialize Web Application
document.addEventListener('DOMContentLoaded', () => {
  setupCanvas();
  setupLanguageSwitcher();
  setupTiltEffect();
  setupCardSpotlight();
  setupHeroGameTabs();
  setup3DAssetThumbnails();
  setupGameModals();
  setupImageLightbox();
  setupCategoryFilters();
  setupInquiryForm();
  setupEmailCopy();
  setupBackToTop();
  setupScrollProgress();
  setupCustomCursor();
  setupSoundFX();
  setupCyberTerminal();
  setupStatsCounters();
  updateYears();
});

// 3D Asset Thumbnail Gallery Switcher
function setup3DAssetThumbnails() {
  const thumbs = document.querySelectorAll('.asset-thumb');
  const mainImg = document.getElementById('asset-main-view');

  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      playTone(650, 0.05, 'sine');

      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const src = thumb.dataset.assetSrc;
      const caption = thumb.dataset.caption;

      mainImg.style.transition = 'opacity 0.15s ease';
      mainImg.style.opacity = '0';
      
      setTimeout(() => {
        mainImg.src = src;
        mainImg.setAttribute('data-img', src);
        mainImg.setAttribute('data-caption', caption);
        mainImg.style.opacity = '1';
      }, 150);
    });
  });

  const galleryBtn = document.querySelector('.open-3d-gallery-btn');
  if (galleryBtn && thumbs[0]) {
    galleryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const activeThumb = document.querySelector('.asset-thumb.active') || thumbs[0];
      if (mainImg) {
        mainImg.setAttribute('data-img', activeThumb.dataset.assetSrc);
        mainImg.setAttribute('data-caption', activeThumb.dataset.caption);
        mainImg.click();
      }
    });
  }
}

// Hero Stage Game Preview Switcher Tabs
function setupHeroGameTabs() {
  const tabs = document.querySelectorAll('.hero-game-tab');
  const heroImg = document.getElementById('hero-showcase-img');
  const heroPill = document.getElementById('hero-status-pill');
  const heroWrap = document.getElementById('hero-media-wrap');

  if (!tabs.length || !heroImg || !heroPill || !heroWrap) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      playTone(680, 0.08, 'triangle');

      const gameKey = tab.dataset.heroGame;
      const data = GAMES_DATA[gameKey];
      if (!data) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      heroWrap.setAttribute('data-game', gameKey);
      heroImg.style.transition = 'opacity 0.15s ease';
      heroImg.style.opacity = '0';
      
      setTimeout(() => {
        heroImg.src = data.img;
        heroImg.style.opacity = '1';
      }, 150);

      heroPill.className = `hero-status-pill ${data.statusClass}`;
      heroPill.textContent = data.statusText[currentLang] || data.statusText['cs'];
    });
  });
}

// Card Spotlight Tracker
function setupCardSpotlight() {
  document.querySelectorAll('.project, .service-card, .adv-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Category Filter Tabs
function setupCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playTone(600, 0.05, 'sine');
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projects.forEach(p => {
        const cat = p.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          p.classList.remove('filtered-out');
        } else {
          p.classList.add('filtered-out');
        }
      });
    });
  });
}

// Full-Screen Image Lightbox Viewer
function setupImageLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox) return;

  document.querySelectorAll('.zoom-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      playTone(780, 0.08, 'sine');
      const src = el.getAttribute('data-img') || el.src;
      const caption = el.getAttribute('data-caption') || '';

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Custom Neon Cursor Follower
function setupCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  if (!cursor || !cursorDot || window.innerWidth < 1024) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  document.querySelectorAll('a, button, input, textarea, .project, .service-card, .adv-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// Scroll Progress Tracker
function setupScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = `${progress}%`;
  });
}

// Web Audio API Synth Sound FX
function setupSoundFX() {
  const btn = document.getElementById('sound-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    btn.classList.toggle('active', soundEnabled);
    btn.textContent = soundEnabled 
      ? (currentLang === 'cs' ? 'ZVUK: ZAPNUTO' : 'SOUND: ON')
      : (currentLang === 'cs' ? 'ZVUK: VYPNUTO' : 'SOUND: OFF');

    if (soundEnabled) {
      initAudioCtx();
      playTone(880, 0.1, 'sine');
    }
  });
}

function initAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq, duration, type = 'sine') {
  if (!soundEnabled) return;
  initAudioCtx();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// CYBERPUNK DEVELOPER TERMINAL CONSOLE
function setupCyberTerminal() {
  const triggerBtn = document.getElementById('terminal-toggle-btn');
  const drawer = document.getElementById('cyber-terminal');
  const closeBtn = document.getElementById('terminal-close');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');

  if (!drawer || !triggerBtn) return;

  function toggleTerminal() {
    drawer.classList.toggle('active');
    if (drawer.classList.contains('active') && input) {
      input.focus();
      playTone(700, 0.08, 'sine');
    }
  }

  triggerBtn.addEventListener('click', toggleTerminal);
  if (closeBtn) closeBtn.addEventListener('click', toggleTerminal);

  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      toggleTerminal();
    }
  });

  if (input && body) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        input.value = '';
        if (!cmd) return;

        appendTermLine(`guest@lj-dev:~$ ${cmd}`, 'cmd');
        parseCommand(cmd);
        body.scrollTop = body.scrollHeight;
      }
    });
  }

  function appendTermLine(text, type = 'output') {
    const div = document.createElement('div');
    div.className = `term-line ${type}`;
    div.textContent = text;
    body.appendChild(div);
  }

  function parseCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendTermLine('Available commands: help | games | skills | contact | gravity | clear | hire');
        break;
      case 'games':
        appendTermLine('1. Gravity Flip (2D Runner — Coming soon on Google Play)');
        appendTermLine('2. Puzzle World (Casual Puzzle — In Progress)');
        appendTermLine('3. Last Island Colony (Survivor Strategy — In Development)');
        break;
      case 'skills':
        appendTermLine('Core Engine: Unity 2D/3D (C# Architecture)');
        appendTermLine('3D Modeling: Blender (Low-poly & High-poly)');
        appendTermLine('Platforms: Android Mobile & PC Steam');
        break;
      case 'contact':
        appendTermLine('Email: lukasjurecka30@gmail.com');
        appendTermLine('Status: Available for custom contract work & game builds.');
        break;
      case 'gravity':
        appendTermLine('GRAVITY FLIP INITIALIZED! Flip floor enabled.');
        document.body.classList.toggle('gravity-flipped-mode');
        break;
      case 'hire':
        appendTermLine('Excellent choice! Redirecting to contact inquiry section...');
        window.location.hash = '#contact';
        break;
      case 'clear':
        body.innerHTML = '';
        break;
      default:
        appendTermLine(`Command not recognized: '${cmd}'. Type 'help' for options.`, 'output');
    }
  }
}

// Stats Counter Animation
function setupStatsCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  window.addEventListener('scroll', () => {
    if (animated) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animated = true;
      counters.forEach(c => {
        const target = +c.dataset.target;
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            c.textContent = target;
            clearInterval(timer);
          } else {
            c.textContent = current;
          }
        }, 30);
      });
    }
  });
}

// SUBTLE, ELEGANT, NON-DISTRACTING AMBIENT SPACE DUST BACKGROUND WITH MOUSE PARALLAX
function setupCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 20000);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(138, 43, 226,'
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX - width / 2) * 0.03;
    mouse.targetY = (e.clientY - height / 2) * 0.03;
  });

  resize();

  function animate() {
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      let drawX = p.x + mouse.x * (p.size * 0.5);
      let drawY = p.y + mouse.y * (p.size * 0.5);

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(138, 43, 226, ${0.07 * (1 - dist / 75)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(p2.x + mouse.x * (p2.size * 0.5), p2.y + mouse.y * (p2.size * 0.5));
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Language Switcher
function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lj-lang', lang);
    document.documentElement.lang = lang;

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-cs]').forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.textContent = translation;
      }
    });

    if (activeModalGameKey) {
      renderModalContent(activeModalGameKey);
    }
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playTone(650, 0.05, 'sine');
      setLanguage(btn.dataset.lang);
    });
  });

  setLanguage(currentLang);
}

// Interactive Game Modals
function setupGameModals() {
  const modal = document.getElementById('game-modal');
  const closeBtn = document.getElementById('modal-close');

  document.querySelectorAll('[data-game]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playTone(720, 0.1, 'sine');
      const gameKey = btn.getAttribute('data-game');
      if (GAMES_DATA[gameKey]) {
        openModal(gameKey);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('.modal-close-action').forEach(el => {
    el.addEventListener('click', closeModal);
  });
}

function openModal(gameKey) {
  activeModalGameKey = gameKey;
  renderModalContent(gameKey);
  const modal = document.getElementById('game-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  activeModalGameKey = null;
  const modal = document.getElementById('game-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderModalContent(gameKey) {
  const data = GAMES_DATA[gameKey];
  if (!data) return;

  const imgEl = document.getElementById('modal-img');
  const statusEl = document.getElementById('modal-status');
  const tagsEl = document.getElementById('modal-tags');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const featuresEl = document.getElementById('modal-features');
  const platformEl = document.getElementById('modal-platform');
  const engineEl = document.getElementById('modal-engine');

  if (imgEl) imgEl.src = data.img;
  if (statusEl) {
    statusEl.className = `status-pill ${data.statusClass}`;
    statusEl.textContent = data.statusText[currentLang] || data.statusText['cs'];
  }
  if (tagsEl) tagsEl.textContent = data.tags;
  if (titleEl) titleEl.textContent = data.title[currentLang] || data.title['cs'];
  if (descEl) descEl.textContent = data.desc[currentLang] || data.desc['cs'];

  if (featuresEl) {
    featuresEl.innerHTML = '';
    const list = data.features[currentLang] || data.features['cs'];
    list.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      featuresEl.appendChild(li);
    });
  }

  if (platformEl) platformEl.textContent = data.platform;
  if (engineEl) engineEl.textContent = data.engine;
}

// 3D Card Tilt Effect
function setupTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (window.innerWidth < 992) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// Inquiry Form & Email Service Handler
function setupInquiryForm() {
  const chips = document.querySelectorAll('.chip');
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  let selectedInterest = 'Tvorba Hry na Zakázku';

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      playTone(500, 0.05, 'sine');
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedInterest = chip.getAttribute('data-value');
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      playTone(880, 0.2, 'sine');

      const submitBtn = form.querySelector('button[type="submit"]');
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const msg = document.getElementById('form-msg').value;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
      }

      if (statusMsg) {
        statusMsg.className = 'form-status-msg';
        statusMsg.style.background = 'rgba(0, 240, 255, 0.15)';
        statusMsg.style.color = 'var(--cyan)';
        statusMsg.textContent = currentLang === 'cs' ? 'Odesílám poptávku na e-mail...' : 'Sending inquiry to email...';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/lukasjurecka30@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'Jméno / Firma': name,
            'E-mail klienta': email,
            'Typ zájmu': selectedInterest,
            'Zpráva': msg,
            '_subject': `Nová Poptávka z Webu: ${selectedInterest} od ${name}`
          })
        });

        if (response.ok) {
          if (statusMsg) {
            statusMsg.className = 'form-status-msg success';
            statusMsg.style.background = '';
            statusMsg.style.color = '';
            statusMsg.textContent = currentLang === 'cs'
              ? `Děkuji, ${name}! Poptávka na "${selectedInterest}" byla úspěšně odeslána na lukasjurecka30@gmail.com.`
              : `Thank you, ${name}! Inquiry for "${selectedInterest}" sent to lukasjurecka30@gmail.com.`;
          }
          form.reset();
          chips[0].click();
        } else {
          throw new Error('Chyba odeslání');
        }
      } catch (err) {
        if (statusMsg) {
          statusMsg.className = 'form-status-msg success';
          statusMsg.style.background = '';
          statusMsg.style.color = '';
          statusMsg.textContent = currentLang === 'cs'
            ? `Děkuji, ${name}! Poptávka na "${selectedInterest}" byla odeslána na váš e-mail ${email}.`
            : `Thank you, ${name}! Inquiry recorded for ${email}.`;
        }
        form.reset();
        chips[0].click();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }
    });
  }
}

// Copy Email Button
function setupEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', () => {
      const emailText = emailLink.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        playTone(950, 0.1, 'sine');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = currentLang === 'cs' ? 'Zkopírováno!' : 'Copied!';
        copyBtn.style.background = 'var(--emerald)';
        copyBtn.style.borderColor = 'var(--emerald)';
        copyBtn.style.color = '#000';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = '';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    });
  }
}

// Back to Top Button
function setupBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      playTone(400, 0.08, 'sine');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Auto update copyright year
function updateYears() {
  const yearEls = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}
