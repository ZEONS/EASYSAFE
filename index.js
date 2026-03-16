/* ========================================
   이지세이프(EASY SAFE) 랜딩페이지
   Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal Animation ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Navigation Scroll Effect ──
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ── Mobile Navigation Toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all items
      document.querySelectorAll('.faq__item').forEach(faqItem => {
        faqItem.classList.remove('active');
        faqItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Compliance Check Animation ──
  const complianceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.compliance__item[data-check]');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('checked');
          }, 200 + index * 200);
        });
        complianceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.compliance__card').forEach(card => {
    complianceObserver.observe(card);
  });

  // ── Counter Animation ──
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(start + (target - start) * easedProgress);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // ── Steps Timeline Animation ──
  const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = entry.target.querySelectorAll('.steps__step');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.querySelector('.steps__number').style.background = 'var(--c-primary)';
            step.querySelector('.steps__number').style.color = 'var(--c-white)';
            step.querySelector('.steps__number').style.transform = 'scale(1.05)';
          }, 300 + index * 300);
        });
        stepsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const stepsTimeline = document.querySelector('.steps__timeline');
  if (stepsTimeline) {
    stepsObserver.observe(stepsTimeline);
  }

  // ── Scroll Top Button Logic ──
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ── Active Navigation Link Highlight ──
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ── Feature Cards Hover Parallax ──
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

});
