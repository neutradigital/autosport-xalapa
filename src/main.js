import './style.css';

console.log('Auto Sport XL - Loaded');

// Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        // Toggle Active States
        menuBtn.classList.toggle('active');

        // Toggle Menu Visibility (using translate to slide)
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Lock Scroll
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = ''; // Unlock Scroll
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });
}

// Intro Curtain Logic
const introCurtain = document.getElementById('intro-curtain');
const startBtn = document.getElementById('start-btn');
const startupSound = document.getElementById('startup-sound');

if (introCurtain && startBtn) {
    // Lock scroll initially
    document.body.style.overflow = 'hidden';

    const dismissCurtain = () => {
        // Play Sound
        if (startupSound) {
            startupSound.volume = 0.5;
            startupSound.currentTime = 0;
            startupSound.play().catch(e => console.log('Audio play failed:', e));
        }

        // Trigger Ignition Sequence
        // 1. Flash Red
        introCurtain.classList.add('animate-flash-red');

        // 2. Delay before opening (simulating engine start/rev up)
        setTimeout(() => {
            // Stop Flash
            introCurtain.classList.remove('animate-flash-red');

            // Add opacity fade out
            introCurtain.classList.add('opacity-0', 'pointer-events-none');

            // Unlock scroll after transition
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 1000);

        }, 800); // 800ms of flashing/delay

        // Audio Fade Logic (Adjusted for delay)
        setTimeout(() => {
            if (startupSound) {
                const fadeAudio = setInterval(() => {
                    if (startupSound.volume > 0.05) {
                        startupSound.volume -= 0.05;
                    } else {
                        startupSound.pause();
                        startupSound.currentTime = 0;
                        clearInterval(fadeAudio);
                    }
                }, 50);
            }
        }, 3500);
    };

    startBtn.addEventListener('click', dismissCurtain);
}
