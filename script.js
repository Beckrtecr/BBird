/**
 * BBird Photography Portfolio - Main Script
 * Handles navigation, gallery rendering, photo management, and interactions.
 */

// ===========================
// Photo Data Configuration
// Categories: Nature, Still Life, Urban, Animals, Portrait
// ===========================
const photos = [
    {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
        title: "Misty Mountains",
        collection: "Nature",
        alt: "Misty Mountains landscape"
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
        title: "Forest Path",
        collection: "Nature",
        alt: "Sunlight through forest trees"
    },
    {
        src: "https://images.unsplash.com/photo-1453791052107-5c843da62d97?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1453791052107-5c843da62d97?auto=format&fit=crop&w=1600&q=80",
        title: "Deep Woods",
        collection: "Nature",
        alt: "Deep mysterious woods"
    },
    {
        src: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1600&q=80",
        title: "Vintage Camera",
        collection: "Still Life",
        alt: "Vintage camera on table"
    },
    {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        title: "Workspace",
        collection: "Still Life",
        alt: "Minimalist workspace"
    },
    {
        src: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1600&q=80",
        title: "Morning Coffee",
        collection: "Still Life",
        alt: "Coffee cup on wooden table"
    },
    {
        src: "https://images.unsplash.com/photo-1449824913929-2b3a64192581?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1449824913929-2b3a64192581?auto=format&fit=crop&w=1600&q=80",
        title: "City Lights",
        collection: "Urban",
        alt: "City skyline at night"
    },
    {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
        title: "Urban Canyon",
        collection: "Urban",
        alt: "Tall buildings in city"
    },
    {
        src: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=1600&q=80",
        title: "Street Life",
        collection: "Urban",
        alt: "Busy city street"
    },
    {
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=80",
        title: "Portrait Mood",
        collection: "Portrait",
        alt: "Moody portrait of woman"
    },
    {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
        title: "Male Portrait",
        collection: "Portrait",
        alt: "Portrait of man smiling"
    },
    {
        src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
        title: "Studio Shot",
        collection: "Portrait",
        alt: "High contrast portrait"
    }
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
    renderCollections();

    initLightbox();
});

function initYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
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
                    case 'collections':
                        topBarTitle.textContent = "Collections";
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

// Render Collections Page
function renderCollections() {
    const container = document.getElementById('collections-grid');
    if (!container) return;

    // Use the fixed categories
    const categories = GALLERY_CATEGORIES;

    container.innerHTML = categories.map(colName => {
        // Find representative photo or use placeholder
        const coverPhoto = photos.find(p => p.collection === colName);
        const count = photos.filter(p => p.collection === colName).length;

        let imgSrc = 'images/logo.jpg';
        if (coverPhoto) {
            imgSrc = coverPhoto.src;
        }

        return `
            <div class="collection-card" onclick="openCollection('${colName}')">
                <img src="${imgSrc}" alt="${colName} Collection" loading="lazy">
                <div class="collection-info">
                    <h3>${colName}</h3>
                    <div class="collection-count">${count} photos</div>
                </div>
            </div>
        `;
    }).join('');
}

// Helper to switch to gallery view filtered by collection
window.openCollection = function (collectionName) {
    // Switch to gallery tab
    const galleryLink = document.querySelector('[data-target="gallery"]');
    if (galleryLink) galleryLink.click();

    // Trigger filter
    setTimeout(() => {
        renderGallery(collectionName);
    }, 50);
};

function createPhotoCard(photo) {
    return `
        <div class="photo-item" data-full="${photo.full}" data-title="${photo.title}">
            <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
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
