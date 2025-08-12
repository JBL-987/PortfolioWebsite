// Fixed demo.js - Portfolio version
document.addEventListener('DOMContentLoaded', () => {
    // Fade in effect for page load
    setTimeout(() => {
        document.body.classList.add('render');
    }, 60);

    // Check for demo navigation elements (from original template)
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    
    // Only run demo navigation if elements exist
    if (navdemos.length > 0) {
        const total = navdemos.length;
        const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
        
        const navigate = (linkEl) => {
            document.body.classList.remove('render');
            document.body.addEventListener('transitionend', () => {
                window.location = linkEl.href;
            });
        };
        
        navdemos.forEach(link => {
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                navigate(ev.target);
            });
        });
        
        // Keyboard navigation for demos
        document.addEventListener('keydown', (ev) => {
            const keyCode = ev.keyCode || ev.which;
            let linkEl;
            
            if (keyCode === 37) { // Left arrow
                linkEl = current > 0 ? navdemos[current - 1] : navdemos[total - 1];
            } else if (keyCode === 39) { // Right arrow
                linkEl = current < total - 1 ? navdemos[current + 1] : navdemos[0];
            } else {
                return false;
            }
            
            navigate(linkEl);
        });
    }

    // Smooth scroll for portfolio navigation (separate from demo navigation)
    const portfolioLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    portfolioLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger-menu');
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle other internal links (if any)
    const otherInternalLinks = document.querySelectorAll('a[href^="#"]:not(.nav-links a)');
    
    otherInternalLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// CSS Variables support check
const supportsCssVars = function() {
    const e = document.createElement("style");
    e.innerHTML = "root: { --tmp-var: bold; }";
    document.head.appendChild(e);
    const supported = !!(window.CSS && window.CSS.supports && window.CSS.supports("font-weight", "var(--tmp-var)"));
    e.parentNode.removeChild(e);
    return supported;
};

if (!supportsCssVars()) {
    console.warn("This browser doesn't support CSS Variables. Some styling may not work correctly.");
}