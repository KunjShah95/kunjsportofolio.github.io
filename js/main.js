// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initProjectFilters();
  initTypingAnimation();
  initParallaxEffects();
  initContactForm();
  initThemeToggle();
  initAOS();

  // Initialize AOS (Animate On Scroll)
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
      });
    }
  }

  // Navigation functionality
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

    // Navbar scroll effect
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        navbar.classList.add('bg-neutral-950/95');
        navbar.classList.remove('bg-neutral-950/90');
      } else {
        navbar.classList.add('bg-neutral-950/90');
        navbar.classList.remove('bg-neutral-950/95');
      }

      // Auto-hide navbar on scroll down (optional)
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
      const hamburgerIcon = mobileMenuButton.querySelector('.hamburger-icon');

      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // Animate hamburger icon
        if (mobileMenu.classList.contains('hidden')) {
          hamburgerIcon.classList.remove('open');
        } else {
          hamburgerIcon.classList.add('open');
        }
      });

      // Close mobile menu when clicking on links
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('open');
        });
      });
    }

    // Smooth scrolling for navigation links
    [...navLinks, ...mobileNavLinks].forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
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

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          // Remove active class from all links
          [...navLinks, ...mobileNavLinks].forEach(link => {
            link.classList.remove('text-primary-400');
            const span = link.querySelector('span');
            if (span) span.style.width = '0';
          });

          // Add active class to current section link
          const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
          activeLinks.forEach(link => {
            link.classList.add('text-primary-400');
            const span = link.querySelector('span');
            if (span) span.style.width = '100%';
          });
        }
      });
    });
  }

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.opacity-0, .translate-y-8, [data-aos]'
    );

    animatedElements.forEach(el => observer.observe(el));
  }

  // Project filtering
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-primary-500/20', 'border-primary-500/50', 'text-primary-400');
        });
        button.classList.add('bg-primary-500/20', 'border-primary-500/50', 'text-primary-400');

        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.classList.add('animate-scale-in');
          } else {
            card.style.display = 'none';
            card.classList.remove('animate-scale-in');
          }
        });
      });
    });
  }

  // Typing animation for hero section
  function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');

    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };

      // Start typing animation after a delay
      setTimeout(typeWriter, 1000);
    });
  }

  // Parallax effects
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Contact form handling
  function initContactForm() {
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
          // Show success message
          showNotification('Message sent successfully!', 'success');

          // Reset form
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 2000);
      });
    }
  }

  // Theme toggle (optional feature)
  function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');

        // Save preference to localStorage
        const isLight = document.documentElement.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });

      // Load saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
      }
    }
  }

  // Utility functions
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Skills animation
  function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const percentage = skillBar.getAttribute('data-percentage');
          const progressBar = skillBar.querySelector('.progress');

          if (progressBar) {
            progressBar.style.width = percentage + '%';
          }
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillsObserver.observe(bar));
  }

  // Counter animation for stats
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Initialize additional animations
  document.addEventListener('DOMContentLoaded', function () {
    initSkillsAnimation();
    initCounterAnimation();
  });

  // Smooth reveal animations for timeline items
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = 'all 0.6s ease-out';
      timelineObserver.observe(item);
    });
  }

  // Initialize timeline animations
  document.addEventListener('DOMContentLoaded', function () {
    initTimelineAnimations();
  });

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

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Any scroll-based animations that need debouncing
  }, 10);

  window.addEventListener('scroll', debouncedScrollHandler);

  // Preload images for better performance
  function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Initialize image lazy loading
  document.addEventListener('DOMContentLoaded', preloadImages);

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active state from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active', 'bg-gradient-to-r', 'from-accent', 'to-pink-600', 'text-white'));

      // Add active state to clicked button
      button.classList.add('active', 'bg-gradient-to-r', 'from-accent', 'to-pink-600', 'text-white');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Start with fade out effect
        card.classList.add('opacity-0', 'scale-95');
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'all 0.4s ease-out';

        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            // Then fade in
            setTimeout(() => {
              card.classList.remove('opacity-0', 'scale-95');
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // Animate experience timeline and other elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .skill-card');

    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        // Add delay based on element index for staggered animation
        setTimeout(() => {
          element.classList.add('animate-in');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  };

  // Add initial styles for animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
  });

  // Run animation on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission with validation and animation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Form submission animation and success message
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';

      // Simulate form submission (in a real scenario, you would send data to a server)
      setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = '<svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Sent Successfully!';

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }, 3000);
      }, 2000);
    });
  }

  // Custom cursor effect (optional)
  const createCustomCursor = () => {
    const cursor = document.createElement('div');
    const cursorBorder = document.createElement('div');

    cursor.classList.add('custom-cursor');
    cursorBorder.classList.add('cursor-border');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorBorder);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      cursorBorder.style.left = `${e.clientX}px`;
      cursorBorder.style.top = `${e.clientY}px`;
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('a, button, .filter-btn, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorBorder.classList.add('border-hover');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorBorder.classList.remove('border-hover');
      });
    });
  };

  // Only enable custom cursor on desktop
  if (window.innerWidth > 768) {
    createCustomCursor();
  }

  // Add CSS to handle the 3D flipping effect for skill cards
  const addFlipStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .perspective { perspective: 1500px; }
      .preserve-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: rgba(0, 219, 222, 0.5);
        mix-blend-mode: exclusion;
      }

      .border-hover {
        transform: translate(-50%, -50%) scale(1.2);
        border-color: rgba(0, 219, 222, 0.5);
      }
    `;
    document.head.appendChild(style);
  };

  addFlipStyles();

  // Intersection Observer for revealing elements on scroll
  const setupIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(element);
    });
  };

  setupIntersectionObserver();

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Enable custom animations
  const customAnimations = () => {
    // Animate hero background elements
    document.querySelectorAll('.animated-bg-element').forEach(el => {
      el.classList.add('animate-float');
    });
  };

  customAnimations();
});

// Preloader animation
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('preloader-hidden');

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }
});