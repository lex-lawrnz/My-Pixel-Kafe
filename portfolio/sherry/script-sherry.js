document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    // FIX 1: Added 'footer' to the selector
    const sections = document.querySelectorAll('section, footer'); 
    
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150; // Increased buffer slightly
        
        // Check if user is at the very bottom of the page
        const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;

        if (isBottom) {
            current = 'contact'; // Force active state to contact at bottom
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            // FIX 2: Ensure we match the ID correctly
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Run once on load
});