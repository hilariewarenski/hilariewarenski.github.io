// Click-to-enlarge implementation using event listeners
document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = document.querySelectorAll('.park_images');
  const expandedImg = document.getElementById('expandedImg');
  const imgText = document.getElementById('imgtext');
  const container = document.querySelector('.container');
  const closeBtn = document.querySelector('.closebtn');
  let lastActiveImage = null;

  if (!expandedImg || !imgText || !container) return;

  // Open image in expanded view
  function openExpanded(imgEl) {
    lastActiveImage = imgEl;
    expandedImg.src = imgEl.src;
    // Use alt text as caption; fallback to empty string
    imgText.textContent = imgEl.alt || '';
    container.style.display = 'block';
    // Move focus to the close button for keyboard users
    closeBtn && closeBtn.focus();
  }

  // Close expanded view and return focus
  function closeExpanded() {
    container.style.display = 'none';
    // Return focus to the image that opened the view
    if (lastActiveImage && typeof lastActiveImage.focus === 'function') {
      lastActiveImage.focus();
    }
    lastActiveImage = null;
  }

  // Attach click listeners to gallery images
  galleryImages.forEach(img => {
    // Make images keyboard-focusable
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openExpanded(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openExpanded(img);
      }
    });
  });

  // Close button
  closeBtn && closeBtn.addEventListener('click', closeExpanded);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.style.display === 'block') {
      closeExpanded();
    }
  });

  // Click outside image to close (clicking on the container background)
  container.addEventListener('click', (e) => {
    if (e.target === container) closeExpanded();
  });

  // --- Search bar functionality: filter gallery by alt text ---
  const searchForm = document.getElementById('heroSearchForm');
  const searchInput = document.getElementById('heroSearchInput');
  const galleryColumns = document.querySelectorAll('.row .column');

  function filterGallery(q) {
    const ql = (q || '').trim().toLowerCase();
    galleryColumns.forEach(col => {
      const img = col.querySelector('img');
      const alt = img && img.alt ? img.alt.toLowerCase() : '';
      if (!ql || alt.includes(ql)) {
        col.style.display = '';
      } else {
        col.style.display = 'none';
      }
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      filterGallery(searchInput.value);
    });

    // live filter as user types
    searchInput.addEventListener('input', () => filterGallery(searchInput.value));
  }
});
