// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(10, 14, 39, 1)';
  } else {
    navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
  }
});

// Animated Skill Bars on Scroll
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');

  skillBars.forEach(bar => {
    const barPosition = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (barPosition < screenPosition && !bar.classList.contains('animated')) {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
      bar.classList.add('animated');
    }
  });
};

// Scroll Animation for Sections
const animateOnScroll = () => {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
};

// Initialize sections with fade-in effect
const initializeSections = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (!section.classList.contains('hero')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });
};

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormMessage('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate form submission
  showFormMessage('Thank you for your message! I will get back to you soon.', 'success');

  // Reset form
  contactForm.reset();

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = 'form-message';
  formMessage.classList.add(type);
  formMessage.style.display = 'block';
}

// Active Navigation Link Based on Scroll Position
const updateActiveNavLink = () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

// Scroll to Top Button (Optional Enhancement)
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(90deg, #00d9ff, #00a8cc);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 217, 255, 0.4);
    transition: all 0.3s ease;
  `;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px)';
    button.style.boxShadow = '0 6px 20px rgba(0, 217, 255, 0.6)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(0, 217, 255, 0.4)';
  });

  document.body.appendChild(button);

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
};

// Tool Cards Hover Effect Enhancement
const enhanceToolCards = () => {
  const toolCards = document.querySelectorAll('.tool-card');

  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
};

// Typewriter Effect for Hero Title (Optional Enhancement)
const typewriterEffect = () => {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const text = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  heroTitle.style.display = 'block';

  let index = 0;
  const speed = 50;

  function type() {
    if (index < text.length) {
      heroTitle.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  // Uncomment to enable typewriter effect
  // type();
};

// Parallax Effect for Hero Section
const parallaxEffect = () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5;

  hero.style.transform = `translate3d(0, ${rate}px, 0)`;
};

// Initialize All Animations and Event Listeners
const init = () => {
  initializeSections();
  createScrollToTopButton();
  enhanceToolCards();

  // Scroll event listeners
  window.addEventListener('scroll', () => {
    animateSkillBars();
    animateOnScroll();
    updateActiveNavLink();
  });

  // Trigger animations on page load
  animateOnScroll();
  updateActiveNavLink();
};

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Add intersection observer for better performance
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

// Observe all sections except hero
document.querySelectorAll('section:not(.hero)').forEach(section => {
  observer.observe(section);
});


