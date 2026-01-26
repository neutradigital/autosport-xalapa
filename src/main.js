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

            // STRICT 4-SECOND AUDIO TIMEOUT (Mobile-friendly)
            const playPromise = startupSound.play();

            if (playPromise !== undefined) {
                playPromise.catch(e => console.log('Auto-play prevent blocked:', e));
            }

            // ============================================================
            // LÓGICA DE APAGADO (Separa el Fade del Stop)
            // ============================================================

            // A. EL FADE (Decorativo - Intenta bajar volumen desde el segundo 3)
            const fadeInterval = setInterval(() => {
                // Solo intentamos bajar si es mayor a 0.1
                if (startupSound.volume > 0.1) {
                    // En iOS esta línea no hará nada, y no pasa nada.
                    startupSound.volume -= 0.1;
                }
            }, 100); // Cada 0.1s

            // B. LA GUILLOTINA (Funcional - Corta sí o sí a los 4 segundos)
            setTimeout(() => {
                // Detenemos el intervalo del fade para ahorrar memoria
                clearInterval(fadeInterval);

                // FORZAMOS EL SILENCIO Y PAUSA
                startupSound.pause();
                startupSound.currentTime = 0;

                // Restablecemos volumen para la próxima vez (por si acaso)
                startupSound.volume = 0.5;
            }, 4000); // <-- 4000ms EXACTOS
        }
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
};

// Support both click and touchstart for mobile compatibility
startBtn.addEventListener('click', dismissCurtain);
startBtn.addEventListener('touchstart', dismissCurtain, { passive: true });

