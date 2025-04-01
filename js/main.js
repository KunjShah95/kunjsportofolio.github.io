// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Projects filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // How much of the element is visible before animation starts

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Run once to check elements in the initial viewport
    checkIfInView();

    // Then on scroll
    window.addEventListener('scroll', checkIfInView);

    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                }

                // Smooth scroll to target
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill card flip animation
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.skill-card-inner').style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.skill-card-inner').style.transform = 'rotateY(0deg)';
        });
    });

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const subjectInput = contactForm.querySelector('#subject');
            const messageInput = contactForm.querySelector('#message');

            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                clearError(nameInput);
            }

            // Validate email
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                clearError(emailInput);
            }

            // Validate subject
            if (!subjectInput.value.trim()) {
                isValid = false;
                showError(subjectInput, 'Subject is required');
            } else {
                clearError(subjectInput);
            }

            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                clearError(messageInput);
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, show a success message
                const formContent = contactForm.innerHTML;
                contactForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';

                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.innerHTML = formContent;
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        clearError(input); // Clear any existing errors

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        formGroup.classList.add('has-error');
        formGroup.appendChild(errorElement);

        // Highlight the input
        input.classList.add('error-input');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        formGroup.classList.remove('has-error');
        input.classList.remove('error-input');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                    }

                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.getAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
});