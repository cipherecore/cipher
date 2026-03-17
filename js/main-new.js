/* ============================================================
   CiphereCore — Cyberpunk Enhanced JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== HEADER SCROLL EFFECT ====================
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ==================== MOBILE NAVIGATION ====================
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==================== SCROLL-TRIGGERED FADE ANIMATIONS ====================
  const fadeElements = document.querySelectorAll('.fade-up');
  
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add small random delay for staggered effect
          const delay = Math.random() * 0.1;
          entry.target.style.animationDelay = delay + 's';
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15, 
      rootMargin: '0px 0px -50px 0px' 
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // ==================== ANIMATED COUNTERS ====================
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  // ==================== DOWNLOAD HANDLERS ====================
  window.handleDownload = function(type) {
    const notification = document.getElementById('download-notification');
    
    // Show notification
    if (notification) {
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 5000);
    }

    // Simulate download start
    if (type === 'exe') {
      // Placeholder: Create download link
      createDownloadLink('CiphereCore_Installer_v2.5.exe', 'application/octet-stream');
    } else if (type === 'zip') {
      createDownloadLink('CiphereCore_v2.5_Win64.zip', 'application/zip');
    }
  };

  function createDownloadLink(filename, mimeType) {
    // In production, these would link to actual files
    const link = document.createElement('a');
    link.href = '#'; // Placeholder
    link.download = filename;
    link.click();
  }

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ 
          top, 
          behavior: 'smooth' 
        });
      }
    });
  });

  // ==================== PARALLAX EFFECT ====================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
      const speed = 0.3 + (index * 0.1);
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  // ==================== HOVER EFFECTS FOR FEATURE CARDS ====================
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });

  // ==================== TYPING ANIMATION FOR CODE BLOCK ====================
  const codeLines = document.querySelectorAll('.app-preview-body .line');
  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex < codeLines.length) {
      codeLines[lineIndex].classList.add('visible');
      lineIndex++;
      setTimeout(typeNextLine, 150);
    }
  }

  // Start typing animation when code block is in view
  if (codeLines.length > 0) {
    const codeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeNextLine();
          codeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const codeBlock = document.querySelector('.app-preview-body');
    if (codeBlock) {
      codeObserver.observe(codeBlock);
    }
  }

  // ==================== GLOW EFFECT ON HOVER ====================
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = document.createElement('div');
      glow.style.position = 'absolute';
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      glow.style.width = '20px';
      glow.style.height = '20px';
      glow.style.background = 'radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)';
      glow.style.borderRadius = '50%';
      glow.style.pointerEvents = 'none';
      glow.style.animation = 'float 0.6s ease-out forwards';
      
      this.style.position = 'relative';
      this.style.overflow = 'visible';
      this.appendChild(glow);
      
      setTimeout(() => glow.remove(), 600);
    });
  });

  // ==================== FORM VALIDATION ====================
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const notification = document.getElementById('download-notification');
      if (notification) {
        notification.innerHTML = '<div style="font-weight: 600; margin-bottom: 4px;">Message Sent! 📧</div><div style="font-size: 0.9rem;">We\'ll get back to you soon...</div>';
        notification.style.display = 'block';
        notification.style.background = 'rgba(184,87,255,.15)';
        notification.style.borderColor = 'rgba(184,87,255,.4)';
        notification.style.color = 'var(--accent-purple)';
        
        setTimeout(() => {
          notification.style.display = 'none';
        }, 5000);
      }
      
      form.reset();
    });
  }

  // ==================== ACTIVE NAV LINK TRACKING ====================
  const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==================== RANDOM GLOW ANIMATION ====================
  // Add random glows to trusted items
  const trustedItems = document.querySelectorAll('.trusted-item');
  trustedItems.forEach((item, index) => {
    item.style.setProperty('--glow-delay', (index * 0.2) + 's');
  });

  // ==================== CURSOR FOLLOW EFFECT ====================
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // Subtle background shift
    document.documentElement.style.setProperty('--mouse-x', x + '%');
    document.documentElement.style.setProperty('--mouse-y', y + '%');
  });

  // ==================== INTERSECTION OBSERVER FOR CARDS ====================
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .install-card').forEach(card => {
    cardObserver.observe(card);
  });

  // ==================== KEYBOARD SHORTCUTS ====================
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to focus download
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      document.querySelector('#download').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navMobile.classList.contains('open')) {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ==================== SCROLL PROGRESS INDICATOR ====================
  const scrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
  };

  window.addEventListener('scroll', scrollProgress, { passive: true });

  console.log('✓ CiphereCore animations initialized');
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Reduce animation frame rate on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-speed', '0s');
}

// Detect dark mode preference (already using dark theme)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Already dark - no changes needed
}
