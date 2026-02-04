/**
 * BBird Photography Portfolio - Main Script
 * Handles navigation, gallery rendering, photo management, and interactions.
 */

// ===========================
// Photo Data Configuration
// Start empty as per user request
// ===========================
let photos = [];

// ===========================
// Initialization & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initNavigation();
    initSidebar();

    // Initial Render (will be empty or show placeholder message)
    renderFeatured();
    renderGallery('all');
    renderCollections();

    initLightbox();
    initImport();
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

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

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
// Import Logic
// ===========================
function initImport() {
    const fileInput = document.getElementById('file-input');
    const dropzone = document.getElementById('import-dropzone');

    if (!fileInput || !dropzone) return;

    // Handle File Selection via Button
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Handle Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--primary-color)';
        dropzone.style.backgroundColor = '#f0f9ff';
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#cbd5e1';
        dropzone.style.backgroundColor = 'white';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#cbd5e1';
        dropzone.style.backgroundColor = 'white';
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const newPhoto = {
                src: e.target.result,
                full: e.target.result,
                title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                collection: "Imported", // Default collection for imports
                alt: file.name
            };

            photos.push(newPhoto);

            // Re-render
            renderGallery('all'); // Refresh gallery
            renderCollections();  // Refresh collections
            renderFeatured();     // Refresh home
        };
        reader.readAsDataURL(file);
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
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No featured photos yet. Import some in the Gallery!</p>';
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

    // Update Filters
    if (filterContainer) {
        const collections = [...new Set(photos.map(p => p.collection))];

        // Remove old dynamic buttons (keeping "All")
        const existingBtns = filterContainer.querySelectorAll('.filter-btn:not([data-filter="all"])');
        existingBtns.forEach(btn => btn.remove());

        collections.forEach(col => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = col;
            btn.setAttribute('data-filter', col);
            if (filterCategory === col) btn.classList.add('active');

            btn.onclick = () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGallery(col);
            };
            filterContainer.appendChild(btn);
        });

        // Re-bind All
        const allBtn = filterContainer.querySelector('[data-filter="all"]');
        if (allBtn) {
            allBtn.onclick = () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                allBtn.classList.add('active');
                renderGallery('all');
            };
        }
    }

    // Filter Logic
    const filteredPhotos = filterCategory === 'all'
        ? photos
        : photos.filter(p => p.collection === filterCategory);

    // Render Grid
    if (filteredPhotos.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 20px;">No photos found. Use the import area above to add photos.</p>';
    } else {
        container.innerHTML = filteredPhotos.map(photo => createPhotoCard(photo)).join('');
        attachLightboxListeners(container);
    }
}

// Render Collections Page
function renderCollections() {
    const container = document.getElementById('collections-grid');
    if (!container) return;

    const collections = [...new Set(photos.map(p => p.collection))];

    if (collections.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">No collections yet.</p>';
    } else {
        container.innerHTML = collections.map(colName => {
            // Find representative photo (first one in collection)
            const coverPhoto = photos.find(p => p.collection === colName);
            const count = photos.filter(p => p.collection === colName).length;

            return `
                <div class="collection-card" onclick="openCollection('${colName}')">
                    <img src="${coverPhoto.src}" alt="${colName} Collection" loading="lazy">
                    <div class="collection-info">
                        <h3>${colName}</h3>
                        <div class="collection-count">${count} photos</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Helper to switch to gallery view filtered by collection
window.openCollection = function (collectionName) {
    // Switch to gallery tab
    const galleryLink = document.querySelector('[data-target="gallery"]');
    if (galleryLink) galleryLink.click();

    // Simulate click on filter button
    setTimeout(() => {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${collectionName}"]`);
        if (filterBtn) filterBtn.click();
    }, 100);
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
