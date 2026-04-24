// ========================================
// EDZISANI DRIVING SCHOOL - JAVASCRIPT
// Sidebar Navigation, Form Handling, Interactions
// ========================================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // ----- SIDEBAR FUNCTIONALITY -----
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
    }
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Event listeners for sidebar
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
    
    // ----- ACTIVE NAVIGATION LINK HIGHLIGHTING -----
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight active link in sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ----- CONTACT FORM HANDLING (with alert for demo) -----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Get form values
            const name = this.querySelector('input[type="text"]')?.value || '';
            const phone = this.querySelector('input[type="tel"]')?.value || '';
            const message = this.querySelector('textarea')?.value || '';
            
            // Simple validation
            if (name.trim() === '') {
                showAlert('Please enter your name', 'error');
                return;
            }
            
            if (message.trim() === '') {
                showAlert('Please enter your message', 'error');
                return;
            }
            
            // Success message (demo only - no backend)
            showAlert(`Thank you ${name}! Your message has been sent. We will contact you soon.`, 'success');
            
            // Clear form
            this.reset();
        });
    }
    
    // ----- ALERT FUNCTION (Custom styled alert) -----
    function showAlert(message, type) {
        // Create alert element
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        // Add styles for alert (inject if not already present)
        if (!document.querySelector('#alert-styles')) {
            const style = document.createElement('style');
            style.id = 'alert-styles';
            style.textContent = `
                .custom-alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    left: 20px;
                    max-width: 400px;
                    margin: 0 auto;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                }
                .custom-alert .alert-content {
                    background: #1a1a1a;
                    border-left: 4px solid;
                    border-radius: 8px;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                }
                .custom-alert.success .alert-content {
                    border-left-color: #25D366;
                }
                .custom-alert.error .alert-content {
                    border-left-color: #e63946;
                }
                .custom-alert i {
                    font-size: 1.5rem;
                }
                .custom-alert.success i {
                    color: #25D366;
                }
                .custom-alert.error i {
                    color: #e63946;
                }
                .custom-alert p {
                    flex: 1;
                    margin: 0;
                    color: #e0e0e0;
                }
                .alert-close {
                    background: none;
                    border: none;
                    color: #888;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .alert-close:hover {
                    color: #e63946;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(alertBox);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            alertBox.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (alertBox.parentNode) alertBox.remove();
            }, 300);
        }, 4000);
        
        // Close button functionality
        alertBox.querySelector('.alert-close').addEventListener('click', () => {
            alertBox.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (alertBox.parentNode) alertBox.remove();
            }, 300);
        });
    }
    
    // ----- CARD HOVER ENHANCEMENT (Smooth transitions) -----
    const cards = document.querySelectorAll('.card, .price-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        });
    });
    
    // ----- SMOOTH SCROLL FOR ANCHOR LINKS (if any) -----
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close sidebar if open after clicking
                if (sidebar && sidebar.classList.contains('open')) {
                    closeSidebar();
                }
            }
        });
    });
    // -----for whatsaapp btn to llok nice on mobimle phones 
    const whatsappBtn = document.querySelector('.floating-whatsapp');
const footer = document.querySelector('footer');

if (whatsappBtn && footer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                whatsappBtn.classList.add('hide');
            } else {
                whatsappBtn.classList.remove('hide');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(footer);
}
    
    // ----- ADD YEAR TO FOOTER AUTOMATICALLY (Optional) -----
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
    
    // ----- LOG FOR CONSOLE (Developer friendly) -----
    console.log('Edzisani Driving School Website Loaded Successfully! 🚗');
});
