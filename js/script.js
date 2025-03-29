// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Inițializare AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 2. Animație titlu hero
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.classList.add('animate__fadeInDown');
        heroTitle.style.opacity = 1;
    }
    
    if (heroSubtitle) {
        heroSubtitle.classList.add('animate__fadeInUp');
        heroSubtitle.style.opacity = 1;
        heroSubtitle.style.transform = 'translateY(0)';
    }

    // 3. Animație iconițe
    document.querySelectorAll('.animated-icon, .feature-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('animate__animated', 'animate__swing');
        });
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('animate__animated', 'animate__swing');
        });
    });

    // 4. Funcționalitate contoare
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        // Verifică dacă CountUp este disponibil
        if (typeof CountUp === 'undefined') {
            console.warn('CountUp nu este disponibil - folosim fallback');
            counters.forEach(counter => {
                counter.textContent = counter.getAttribute('data-target');
            });
            return;
        }

        function animateCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2.5;
                
                if (!counter.classList.contains('animated')) {
                    const countUp = new CountUp(counter, 0, target, 0, duration, {
                        useEasing: true,
                        useGrouping: true,
                        separator: ','
                    });
                    
                    if (countUp.error) {
                        console.error(countUp.error);
                        counter.textContent = target;
                    } else {
                        countUp.start();
                        counter.classList.add('animated');
                    }
                }
            });
        }

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        function checkCounters() {
            const countersSection = document.querySelector('.global-stats-section');
            if (countersSection && isInViewport(countersSection)) {
                animateCounters();
                window.removeEventListener('scroll', checkCounters);
            }
        }

        // Verifică la încărcare și la scroll
        checkCounters();
        window.addEventListener('scroll', checkCounters);
    }

    initCounters();

    // 5. Funcționalitate pădure digitală
    const forestAnimation = document.getElementById('forestAnimation');
    const addTreeBtn = document.getElementById('addTreeBtn');
    let treeCount = 0;
    const maxTrees = 15;

    function addTree() {
        if (treeCount < maxTrees && forestAnimation) {
            const position = Math.random() * (forestAnimation.offsetWidth - 50);
            const delay = Math.random() * 0.7;
            const tree = document.createElement('div');
            tree.className = 'tree';
            tree.style.left = `${position}px`;
            tree.style.animation = `grow 1s ${delay}s forwards`;

            // Efect la click pe copac
            tree.addEventListener('click', function() {
                this.classList.add('animate__animated', 'animate__rubberBand');
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__rubberBand');
                }, 1000);
            });

            forestAnimation.appendChild(tree);
            treeCount++;

            // Actualizează progresul
            const progressPercent = Math.min(100, (treeCount / maxTrees) * 100);
            const progressBar = document.getElementById('fineMotorProgress');
            const progressText = document.getElementById('fineMotorPercentage');
            
            if (progressBar) progressBar.style.width = `${progressPercent}%`;
            if (progressText) progressText.textContent = Math.round(progressPercent);

            if (treeCount === maxTrees && addTreeBtn) {
                addTreeBtn.innerHTML = '<i class="fas fa-check me-2"></i>Pădurea completă!';
                addTreeBtn.disabled = true;
            }
        }
    }

    // Buton plantare copac
    if (addTreeBtn) {
        addTreeBtn.addEventListener('click', addTree);
    }

    // 6. Animație bare de progres
    let forestAnimated = false;
    let progressAnimated = false;

    window.addEventListener('scroll', function() {
        // Pădurea
        if (!forestAnimated && forestAnimation) {
            const forestPosition = forestAnimation.getBoundingClientRect().top;
            if (forestPosition < window.innerHeight) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(addTree, i * 300);
                }
                forestAnimated = true;
            }
        }

        // Bare de progres
        if (!progressAnimated) {
            const progressCard = document.querySelector('.progress-card');
            if (progressCard) {
                const progressPosition = progressCard.getBoundingClientRect().top;
                if (progressPosition < window.innerHeight) {
                    const consistencyBar = document.getElementById('exerciseConsistency');
                    const consistencyText = document.getElementById('exerciseConsistencyPercentage');
                    
                    if (consistencyBar) consistencyBar.style.width = '90%';
                    if (consistencyText) consistencyText.textContent = '90';
                    
                    progressAnimated = true;
                }
            }
        }
    });

    // 7. Efecte hover butoane
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // 8. Cursor personalizat
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX}px`;
                cursorFollower.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Efecte cursor pe elemente interactive
        document.querySelectorAll('a, button, .tree, .feature-card, .progress-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                if (cursor) cursor.style.background = 'rgba(255, 126, 95, 0.7)';
                if (cursorFollower) cursorFollower.style.width = '30px';
                if (cursorFollower) cursorFollower.style.height = '30px';
                if (cursorFollower) cursorFollower.style.borderColor = 'rgba(255, 126, 95, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                if (cursor) cursor.style.background = 'rgba(106, 17, 203, 0.5)';
                if (cursorFollower) cursorFollower.style.width = '40px';
                if (cursorFollower) cursorFollower.style.height = '40px';
                if (cursorFollower) cursorFollower.style.borderColor = 'rgba(37, 117, 252, 0.5)';
            });
        });
    }

    // 9. Inițializare Particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: false, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }
});