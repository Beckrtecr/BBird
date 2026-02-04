/**
 * BBird Photography Portfolio - Main Script
 * Handles navigation, gallery rendering, photo management, and interactions.
 */

// ===========================
// Photo Data Configuration
// Categories: Nature, Still Life, Urban, Animals, Portrait
// ===========================
// ===========================
// Photo Data Configuration
// Loaded from index.html (window.sitePhotos)
// ===========================
const photos = [
    { src: 'images/logo.jpg', alt: 'BBird Logo', title: 'Logo', collection: 'Main' },
    { src: 'images/Beckham.jpg', alt: 'Beckham Harris', title: 'Beckham', collection: 'Portfolio' },
    // Add more photos here
];

// Fixed Categories (Total 5 including All: All, Nature, Still Life, Urban, Portrait)
const GALLERY_CATEGORIES = ['Nature', 'Still Life', 'Urban', 'Portrait'];

// ===========================
// Initialization & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initNavigation();
    initSidebar();

    // Initial Render
    renderFeatured();
    renderGallery('all');
    updateAge();

    initLightbox();
});

function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function updateAge() {
    const ageEl = document.getElementById('my-age');
    if (!ageEl) return;

    // Birthdate: December 16, 2014 (Month is 0-indexed, so 11 is December)
    const birthDate = new Date(2014, 11, 16);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    ageEl.textContent = age;
}

// Sidebar Toggle Logic
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Mobile: Toggle overlay
                sidebar.classList.toggle('mobile-open');
            } else {
                // Desktop: Toggle collapse
                sidebar.classList.toggle('collapsed');
            }
        });

        // Close mobile sidebar when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        });
    }
}

// Navigation Logic (SPA Feel)
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const topBarTitle = document.querySelector('.center-text');

    // Set initial title (Home)
    if (topBarTitle) topBarTitle.textContent = "Home";

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Update Top Bar Text
            if (topBarTitle) {
                switch (targetId) {
                    case 'home':
                        topBarTitle.textContent = "Home";
                        break;
                    case 'gallery':
                        topBarTitle.textContent = "Gallery";
                        break;
                    case 'about':
                        topBarTitle.textContent = "About";
                        break;
                    case 'contact':
                        topBarTitle.textContent = "Contact";
                        break;
                    default:
                        topBarTitle.textContent = "Home";
                }
            }

            // Update Active State
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show Section
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === targetId) {
                    section.classList.add('active-section');
                }
            });



            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// ===========================
// Rendering Functions
// ===========================

// Render Featured Photos on Home Page
function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    // Take first 3 photos as featured
    const featuredPhotos = photos.slice(0, 3);

    if (featuredPhotos.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No photos available.</p>';
    } else {
        container.innerHTML = featuredPhotos.map(photo => createPhotoCard(photo)).join('');
        attachLightboxListeners(container);
    }
}

// Render Main Gallery
function renderGallery(filterCategory) {
    const container = document.getElementById('gallery-grid');
    const filterContainer = document.querySelector('.filter-controls');

    if (!container) return;

    // Build Filters if they don't exist
    if (filterContainer) {
        filterContainer.innerHTML = ''; // Reset to ensure order

        const categories = ['All', ...GALLERY_CATEGORIES];

        categories.forEach(col => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = col;
            const filterValue = col === 'All' ? 'all' : col;
            btn.setAttribute('data-filter', filterValue);

            const currentFilter = filterCategory === 'all' ? 'All' : filterCategory;
            if (col === currentFilter || (col === 'All' && filterCategory === 'all')) {
                btn.classList.add('active');
            }

            btn.onclick = () => {
                renderGallery(filterValue);
            };
            filterContainer.appendChild(btn);
        });
    }

    // Filter Logic
    const filteredPhotos = filterCategory === 'all'
        ? photos
        : photos.filter(p => p.collection === filterCategory);

    // Render Grid
    if (filteredPhotos.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 20px;">No photos found in this collection.</p>';
    } else {
        container.innerHTML = filteredPhotos.map(photo => createPhotoCard(photo)).join('');
        attachLightboxListeners(container);
    }
}



function createPhotoCard(photo) {
    const src = encodeURI(photo.src);
    const full = encodeURI(photo.full || photo.src);

    return `
        <div class="photo-item" data-full="${full}" data-title="${photo.title}">
            <img src="${src}" alt="${photo.alt}" loading="lazy">
            <div class="photo-overlay">
                <h4>${photo.title}</h4>
                <small>${photo.collection}</small>
            </div>
        </div>
    `;
}

// ===========================
// Lightbox Logic
// ===========================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    if (!lightbox) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active-lightbox');
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active-lightbox');
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active-lightbox');
        }
    });
}

function attachLightboxListeners(container) {
    const items = container.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const fullSrc = item.getAttribute('data-full');
            const title = item.getAttribute('data-title');

            if (lightboxImg) lightboxImg.src = fullSrc;
            if (lightboxCaption) lightboxCaption.textContent = title;
            if (lightbox) lightbox.classList.add('active-lightbox');
        });
    });
}
