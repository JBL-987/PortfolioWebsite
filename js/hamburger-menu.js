 document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a');
    let isMenuOpen = false;

    console.log('Hamburger menu script loaded'); // Debug log

    const toggleMenu = () => {
        console.log('Toggle menu called, isMenuOpen:', isMenuOpen); // Debug log
        
        isMenuOpen = !isMenuOpen;
        
        // Toggle classes
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        console.log('Menu toggled, new state:', isMenuOpen); // Debug log
    };

    // Hamburger click event
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!'); // Debug log
            toggleMenu();
        });
    }

    // Close menu when clicking links
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            console.log('Link clicked:', link.href); // Debug log
            if (isMenuOpen) {
                toggleMenu();
            }
            
            // Handle anchor links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, isMenuOpen ? 500 : 0);
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            console.log('Clicked outside, closing menu'); // Debug log
            toggleMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        }, 250);
    });
});