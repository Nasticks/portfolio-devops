// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Code snippets for animations
const heroCode = `const developer = {
  name: "DevPro",
  skills: ["React", "Node.js", "Python"],
  experience: "5+ years",
  passion: "clean code",
  mission: createAmazingExperiences
};

function createAmazingExperiences() {
  return {
    frontend: "beautiful UIs",
    backend: "scalable APIs",
    impact: "user satisfaction"
  };
}`;

const aboutCode = `{
  "developer": {
    "name": "DevPro",
    "role": "Full Stack Developer",
    "location": "Remote",
    "interests": [
      "Open Source",
      "AI/ML",
      "Web Performance"
    ],
    "values": {
      "code_quality": "high",
      "teamwork": "essential",
      "learning": "continuous"
    }
  }
}`;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeNavigation();
  initializeTypewriter();
  initializeCodeAnimations();
  initializeScrollAnimations();
  initializeSkillBars();
  initializeContactForm();
  initializeParticleEffect();
  initializeGlitchEffect();
});

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Typewriter effect for hero section
function initializeTypewriter() {
  const typewriterElement = document.querySelector('.typewriter');
  const texts = ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'Open Source Contributor'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
  }

  typeWriter();
}

// Code animations
function initializeCodeAnimations() {
  const heroCodeElement = document.getElementById('hero-code');
  const aboutCodeElement = document.getElementById('about-code');

  // Animate hero code
  if (heroCodeElement) {
    animateCode(heroCodeElement, heroCode, 50);
  }

  // Animate about code when section is visible
  if (aboutCodeElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            animateCode(aboutCodeElement, aboutCode, 30);
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(aboutCodeElement);
  }
}

function animateCode(element, code, speed) {
  element.textContent = '';
  let i = 0;

  function addChar() {
    if (i < code.length) {
      element.textContent += code.charAt(i);
      i++;
      setTimeout(addChar, speed);
    }
  }

  addChar();
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in class to elements and observe them
  const elementsToAnimate = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content');
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Active navigation link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Skill bars animation
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
          bar.style.width = width;
        }, 200);

        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading"></span> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 2rem',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: '500',
    zIndex: '10000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    background: type === 'success' ? 'var(--accent-primary)' : 'var(--accent-secondary)'
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Particle effect for hero section
function initializeParticleEffect() {
  const codeRain = document.querySelector('.code-rain');

  if (codeRain) {
    // Create floating code characters
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
                position: absolute;
                color: var(--accent-primary);
                font-family: var(--font-mono);
                font-size: 14px;
                opacity: 0.3;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s infinite linear;
            `;

      // Random code characters
      const chars = ['0', '1', '{', '}', '(', ')', '[', ']', '=', '+', '-', '*', '/', '<', '>'];
      particle.textContent = chars[Math.floor(Math.random() * chars.length)];

      codeRain.appendChild(particle);
    }

    // Add CSS animation for floating particles
    const style = document.createElement('style');
    style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }
}

// Glitch effect enhancement
function initializeGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch');

  glitchElements.forEach(element => {
    setInterval(() => {
      // Random glitch activation
      if (Math.random() < 0.1) { // 10% chance every interval
        element.style.animation = 'none';
        setTimeout(() => {
          element.style.animation = '';
        }, 100);
      }
    }, 2000);
  });
}

// Project card interactions
document.addEventListener('DOMContentLoaded', function () {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });

    // Add click handler for demo links
    const demoLink = card.querySelector('.project-link');
    if (demoLink && demoLink.textContent === 'Live Demo') {
      demoLink.addEventListener('click', function (e) {
        e.preventDefault();
        showNotification('Demo coming soon! This is a showcase project.', 'info');
      });
    }

    const githubLink = card.querySelectorAll('.project-link')[1];
    if (githubLink && githubLink.textContent === 'GitHub') {
      githubLink.addEventListener('click', function (e) {
        e.preventDefault();
        showNotification('GitHub repository is private. Contact me for code samples!', 'info');
      });
    }
  });
});

// Social links functionality
document.addEventListener('DOMContentLoaded', function () {
  const socialLinks = document.querySelectorAll('.social-link');

  socialLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const platform = this.textContent;
      showNotification(`Connect with me on ${platform}! Links coming soon.`, 'info');
    });
  });
});

// Add some interactive Easter eggs
document.addEventListener('keydown', function (e) {
  // Konami code easter egg
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  window.konamiCode = window.konamiCode || [];
  window.konamiCode.push(e.keyCode);

  if (window.konamiCode.length > konamiCode.length) {
    window.konamiCode.shift();
  }

  if (window.konamiCode.join(',') === konamiCode.join(',')) {
    // Activate easter egg
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('🎉 Easter egg activated! Developer mode enabled!', 'success');
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 3000);
    window.konamiCode = [];
  }
});

// Performance optimization: Lazy load animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
  document.head.appendChild(style);
}

// Add console message for developers
console.log(`
%c
🚀 Welcome to DevPro's Portfolio!

%cLike what you see? 
Let's build something amazing together!

Contact: hello@devpro.com
`,
  'color: #00ff88; font-size: 16px; font-weight: bold;',
  'color: #ffffff; font-size: 14px;'
);