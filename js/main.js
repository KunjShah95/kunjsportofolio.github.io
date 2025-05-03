// Modern Portfolio JavaScript - 2025 Edition

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navbar functionality
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  const menuBars = menuToggle.querySelectorAll('span');
  
  // Scroll event for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('py-3', 'bg-black/70');
      navbar.classList.remove('py-6', 'bg-black/20');
    } else {
      navbar.classList.add('py-6', 'bg-black/20');
      navbar.classList.remove('py-3', 'bg-black/70');
    }
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    
    // Animate hamburger to X
    if (!mobileMenu.classList.contains('hidden')) {
      menuBars[0].classList.add('rotate-45', 'translate-y-2');
      menuBars[1].classList.add('opacity-0');
      menuBars[2].classList.add('-rotate-45', '-translate-y-2');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      menuBars[0].classList.remove('rotate-45', 'translate-y-2');
      menuBars[1].classList.remove('opacity-0');
      menuBars[2].classList.remove('-rotate-45', '-translate-y-2');
      document.body.style.overflow = ''; // Allow scrolling
    }
  });
  
  // Close mobile menu when clicking on links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      menuBars[0].classList.remove('rotate-45', 'translate-y-2');
      menuBars[1].classList.remove('opacity-0');
      menuBars[2].classList.remove('-rotate-45', '-translate-y-2');
      document.body.style.overflow = '';
    });
  });

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

  // Animate skill items on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('animate-in');
        element.classList.remove('opacity-0');
        
        if (element.classList.contains('timeline-item')) {
          element.style.animationDelay = `${element.dataset.delay || 0}s`;
        }
      }
    });
  };
  
  // Initial animation check
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
    contactForm.addEventListener('submit', function(e) {
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
    // Animate gradient text
    document.querySelectorAll('.gradient-text').forEach(el => {
      el.classList.add('bg-gradient-to-r', 'from-accent', 'to-pink-600', 'bg-clip-text', 'text-transparent');
    });
    
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