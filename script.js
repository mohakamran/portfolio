document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }

            // Set active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Scroll to sections
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

    // Portfolio filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            tabBtns.forEach(item => item.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-tab');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');

    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    }

    // Initial check
    checkAnimation();

    // Check on scroll
    window.addEventListener('scroll', checkAnimation);

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Only animate when skills section is in view
    const skillsSection = document.querySelector('.skills');

    function checkSkillsSection() {
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionPosition < windowHeight - 100) {
            animateSkillBars();
            // Remove the event listener after animation
            window.removeEventListener('scroll', checkSkillsSection);
        }
    }

    window.addEventListener('scroll', checkSkillsSection);

    // Initial check in case skills section is already in view
    checkSkillsSection();

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input').value;

            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);

            // Show success message
            alert('Thank you for subscribing to our newsletter!');

            // Reset form
            this.reset();
        });
    }

    // Typewriter Effect
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        const words = JSON.parse(element.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            const currentText = currentWord.substring(0, charIndex);
            element.textContent = currentText;

            if (!isDeleting && charIndex < currentWord.length) {
                // Typing
                charIndex++;
                typingSpeed = 100;
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                typingSpeed = 50;
            } else {
                // Change word
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                typingSpeed = isDeleting ? 1500 : 500;
            }

            setTimeout(type, typingSpeed);
        }

        // Start the typewriter effect after a short delay
        setTimeout(type, 1000);
    });
    
    // Google Translate Integration - Fixed Version
// Translation function using LibreTranslate
async function translateText(text, targetLang) {
    try {
        const response = await axios.post('https://libretranslate.de/translate', {
            q: text,
            source: 'en',
            target: targetLang,
            format: 'text'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original if translation fails
    }
}

// Main translation function
async function translatePage(targetLang) {
    // Get all text nodes in the body (excluding scripts, styles, etc.)
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        { 
            acceptNode: function(node) {
                // Only translate non-empty nodes that aren't in scripts/style tags
                return node.nodeValue.trim() && 
                       !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION'].includes(node.parentNode.nodeName) ?
                    NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        },
        false
    );

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    // Show loading state
    const currentLanguage = document.getElementById('current-language');
    currentLanguage.textContent = '...';
    document.body.style.cursor = 'wait';

    // Translate each text node
    for (const node of textNodes) {
        const originalText = node.nodeValue.trim();
        if (originalText) {
            node.nodeValue = await translateText(originalText, targetLang);
        }
    }

    // Update UI
    currentLanguage.textContent = targetLang.toUpperCase();
    localStorage.setItem('preferredLanguage', targetLang);
    document.body.style.cursor = 'default';

    // Set direction for RTL languages
    document.documentElement.dir = ['ar', 'ur', 'he'].includes(targetLang) ? 'rtl' : 'ltr';
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    
    // Set click handlers
    languageLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            await translatePage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
        translatePage(savedLang);
    }
});


// Particles Animation
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = [
        'rgba(108, 99, 255, 0.2)', 
        'rgba(255, 101, 132, 0.2)', 
        'rgba(255, 201, 71, 0.2)'
    ];
    
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        requestAnimationFrame(animate);
    }
    
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

document.addEventListener('DOMContentLoaded', initParticles);


});

