document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Adding a slight delay to the outline for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Hover effects on clickable elements
        const clickables = document.querySelectorAll('a, button, input, .gallery-item, .accordion-header');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // --- Theme Toggle (Local Storage) ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = htmlEl.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if(theme === 'dark') {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
        } else {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
        }
    }

    // --- Scroll Features ---
    const navbar = document.getElementById('navbar');
    const scrollBar = document.getElementById('scrollBar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";

        // Back to top button
        if (window.scrollY > 500) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple hamburger animation could be added here
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a progress bar, animate it
                const progressFill = entry.target.querySelectorAll('.progress-fill');
                progressFill.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));

    // --- Typing Effect ---
    const typeText = document.querySelector('.type-text');
    const words = ["Web Design", "UI/UX", "Innovation"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeText.innerText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.innerText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }
    if(typeText) setTimeout(type, 1500);

    // --- Gallery Filtering & Lightbox ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('show');
    });

    // --- Form Features ---
    
    // Character Counter
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    if(messageInput) {
        messageInput.addEventListener('input', () => {
            charCount.innerText = messageInput.value.length;
        });
    }

    // Password Toggle & Strength
    const passwordInput = document.getElementById('password');
    const togglePass = document.querySelector('.toggle-password');
    const strengthBar = document.getElementById('strengthBar');
    
    if(togglePass && passwordInput) {
        togglePass.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePass.classList.toggle('bx-show');
            togglePass.classList.toggle('bx-hide');
        });

        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            let strength = 0;
            if(val.length > 5) strength += 33;
            if(val.match(/[A-Z]/) && val.match(/[0-9]/)) strength += 33;
            if(val.match(/[^A-Za-z0-9]/)) strength += 34;

            strengthBar.style.width = strength + '%';
            if(strength < 50) strengthBar.style.backgroundColor = 'var(--error)';
            else if(strength < 90) strengthBar.style.backgroundColor = '#eab308';
            else strengthBar.style.backgroundColor = 'var(--success)';
        });
    }

    // Image Upload Preview
    const profilePic = document.getElementById('profilePic');
    const imagePreview = document.getElementById('imagePreview');
    if(profilePic) {
        profilePic.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Form Validation & Progress
    const form = document.getElementById('premiumForm');
    const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
    const formProgressBar = document.getElementById('formProgressBar');

    function updateFormProgress() {
        let filled = 0;
        let total = 0;
        inputs.forEach(input => {
            if(input.hasAttribute('required')) {
                total++;
                if(input.type === 'checkbox') {
                    if(input.checked) filled++;
                } else if(input.value.trim() !== '') {
                    filled++;
                }
            }
        });
        if(total > 0 && formProgressBar) {
            formProgressBar.style.width = (filled / total) * 100 + '%';
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateFormProgress();
            // Basic remove error style on typing
            input.parentElement.classList.remove('error');
        });
    });

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            inputs.forEach(input => {
                if(input.hasAttribute('required') && input.value.trim() === '') {
                    input.parentElement.classList.add('error');
                    isValid = false;
                }
            });

            if(isValid) {
                const btn = document.getElementById('submitBtn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Processing...';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    showToast('Application submitted successfully!', 'success');
                    fireConfetti();
                    form.reset();
                    updateFormProgress();
                    if(imagePreview) imagePreview.classList.add('hidden');
                    if(strengthBar) strengthBar.style.width = '0%';
                }, 1500);
            } else {
                showToast('Please fill all required fields correctly.', 'error');
            }
        });
    }

    // --- Accordion ---
    const accHeaders = document.querySelectorAll('.accordion-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            // Close others
            document.querySelectorAll('.accordion-item').forEach(item => {
                if(item !== parent) item.classList.remove('active');
            });
            parent.classList.toggle('active');
        });
    });

    // --- Toast Notification ---
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i> ${message}`;
        container.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Cookie Consent ---
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptBtn = document.getElementById('acceptCookies');
    if(!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => cookiePopup.classList.add('show'), 2000);
    }
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookiePopup.classList.remove('show');
    });

    // --- Button Ripple Effect ---
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-span');
            this.appendChild(ripples);
            setTimeout(() => ripples.remove(), 600);
        });
    });

    // --- Background Particles ---
    const particlesContainer = document.getElementById('particles');
    for(let i = 0; i < 20; i++) {
        let p = document.createElement('div');
        p.classList.add('particle');
        p.style.width = Math.random() * 15 + 5 + 'px';
        p.style.height = p.style.width;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = Math.random() * 10 + 10 + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(p);
    }

    // --- Custom Confetti Generator (Vanilla JS) ---
    function fireConfetti() {
        const colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
        for (let i = 0; i < 100; i++) {
            createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
        }
    }

    function createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        const duration = Math.random() * 3000 + 2000;
        const animation = confetti.animate([
            { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random()*200 - 100}px, 100vh, 0) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], { duration: duration, easing: 'cubic-bezier(.37,0,.63,1)' });

        animation.onfinish = () => confetti.remove();
    }
});