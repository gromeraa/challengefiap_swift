const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.close-button');
const mobileNav = document.querySelector('.mobile-nav');
const navOverlay = document.querySelector('.nav-overlay');

// Open mobile navigation
if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
        mobileNav.classList.add('is-active');
        navOverlay.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    });
}

// Close mobile navigation
function closeMobileNav() {
    if (mobileNav) {
        mobileNav.classList.remove('is-active');
        navOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
    }
}

if (closeButton) {
    closeButton.addEventListener('click', closeMobileNav);
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
}

// Close navigation on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});

// Close navigation when clicking on nav items
const navItems = document.querySelectorAll('.nav-list-item a');
navItems.forEach(item => {
    item.addEventListener('click', closeMobileNav);
});

// Add to cart functionality
function addToCart(productName, productPrice, productImage) {
    // Show notification
    showNotification(`${productName} adicionado ao carrinho!`);
    
    // In a real application, this would update localStorage or send to backend
    console.log('Adding to cart:', { productName, productPrice, productImage });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--orange-swift-base);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
