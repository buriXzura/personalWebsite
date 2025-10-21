// Personal Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Deadline highlighting for LoR page
    if (window.location.pathname.includes('lor')) {
        highlightDeadlines();
    }

    // Active navigation highlighting
    highlightActiveNavigation();
});

function highlightDeadlines() {
    const deadlineRows = document.querySelectorAll('table tbody tr');
    const today = new Date();
    
    deadlineRows.forEach(row => {
        const deadlineCell = row.querySelector('td:nth-child(3)'); // Assuming deadline is 3rd column
        if (deadlineCell) {
            const deadlineText = deadlineCell.textContent.trim();
            const deadlineDate = new Date(deadlineText);
            
            if (!isNaN(deadlineDate)) {
                const timeDiff = deadlineDate - today;
                const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                
                if (daysDiff < 0) {
                    row.classList.add('deadline-passed');
                } else if (daysDiff <= 7) {
                    row.classList.add('deadline-urgent');
                } else if (daysDiff <= 30) {
                    row.classList.add('deadline-soon');
                } else {
                    row.classList.add('deadline-normal');
                }
            }
        }
    });
}

function highlightActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath.replace('#', ''))) {
            link.classList.add('active');
        }
    });
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copied to clipboard: ' + text);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}
