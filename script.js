/**
 * BBird Photography Portfolio - Main Script
 * Handles navigation, gallery rendering, photo management, and interactions.
 */

// ===========================
// Photo Data Configuration
// Add your photos here to update the site
// ===========================
const photos = [
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Mountain Solitude",
        collection: "Nature",
        alt: "Hiker on a mountain ridge at sunset"
    },
    {
        src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Looking Through",
        collection: "Portraits",
        alt: "Eye closeup photography"
    },
    {
        src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Forest Mist",
        collection: "Nature",
        alt: "Misty forest path"
    },
    {
        src: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Urban Angles",
        collection: "Architecture",
        alt: "Modern architecture building detail"
    },
    {
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Red Dress",
        collection: "Portraits",
        alt: "Woman in red dress posing artistically"
    },
    {
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Fields of Gold",
        collection: "Nature",
        alt: "Golden wheat field sunset"
    },
    {
        src: "https://images.unsplash.com/photo-1518005052357-e987154039d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1518005052357-e987154039d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "City Lights",
        collection: "Architecture",
        alt: "City skyline at night"
    },
    {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "Profile",
        collection: "Portraits",
        alt: "Side profile portrait of a woman"
    },
    {
        src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        full: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        title: "High Peaks",
        collection: "Nature",
        alt: "Rugged mountain peaks"
    }
];

// ===========================
// Initialization & Navigation
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initNavigation();
    initSidebar();
    renderFeatured();
    renderGallery('all');
    renderCollections();
    initLightbox();
});

function initYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Sidebar Toggle Logic
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

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

            // If navigating to Gallery via "View Gallery" button or otherwise, ensure navigation is updated
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
    // Take first 3 photos as featured, or random
    const featuredPhotos = photos.slice(0, 3);
    
    container.innerHTML = featuredPhotos.map(photo => createPhotoCard(photo)).join('');
    attachLightboxListeners(container);
}

// Render Main Gallery
function renderGallery(filterCategory) {
    const container = document.getElementById('gallery-grid');
    const filterContainer = document.querySelector('.filter-controls');
    
    // Generate Filter Buttons dynamically based on available collections
    const collections = [...new Set(photos.map(p => p.collection))];
    if (filterContainer.children.length === 1) { // Only 'All' exists
        collections.forEach(col => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = col;
            btn.setAttribute('data-filter', col);
            btn.onclick = () => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGallery(col);
            };
            filterContainer.appendChild(btn);
        });
        
        // Add click listener to 'All' button again to be safe
        const allBtn = filterContainer.querySelector('[data-filter="all"]');
        allBtn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            allBtn.classList.add('active');
            renderGallery('all');
        };
    }

    // Filter Logic
    const filteredPhotos = filterCategory === 'all' 
        ? photos 
        : photos.filter(p => p.collection === filterCategory);

    // Render Grid
    container.innerHTML = filteredPhotos.map(photo => createPhotoCard(photo)).join('');
    attachLightboxListeners(container);
}

// Render Collections Page
function renderCollections() {
    const container = document.getElementById('collections-grid');
    const collections = [...new Set(photos.map(p => p.collection))];
    
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

// Helper to switch to gallery view filtered by collection
window.openCollection = function(collectionName) {
    // Switch to gallery tab
    document.querySelector('[data-target="gallery"]').click();
    // Simulate click on filter button
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${collectionName}"]`);
    if (filterBtn) filterBtn.click();
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

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active-lightbox');
    });

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
            
            lightboxImg.src = fullSrc;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active-lightbox');
        });
    });
}
