document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('mainHeader') || document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    });
  }

  // Create profile modal styles
  if (!document.getElementById('profileModalStyles')) {
    const style = document.createElement('style');
    style.id = 'profileModalStyles';
    style.textContent = `
      .profile-modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        align-items: center;
        justify-content: center;
      }

      .profile-modal-overlay.active {
        display: flex;
      }

      .profile-modal-content {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .profile-header {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        padding: 32px 24px;
        text-align: center;
        color: white;
      }

      .profile-header.admin {
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      }

      .profile-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        font-size: 36px;
        border: 3px solid white;
      }

      .profile-avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .profile-name {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 8px;
      }

      .profile-role {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.9;
        font-weight: 600;
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        padding: 4px 12px;
        border-radius: 999px;
        margin-top: 8px;
      }

      .profile-body {
        padding: 24px;
      }

      .profile-section {
        margin-bottom: 24px;
      }

      .profile-section:last-child {
        margin-bottom: 0;
      }

      .profile-section-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #6b7280;
        margin-bottom: 12px;
        letter-spacing: 0.5px;
      }

      .profile-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: #f9fafb;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .profile-item-label {
        color: #6b7280;
        font-weight: 500;
      }

      .profile-item-value {
        color: #1a1a1a;
        font-weight: 600;
      }

      .profile-stat {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 12px;
      }

      .profile-stat-card {
        background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        padding: 16px;
        border-radius: 10px;
        text-align: center;
        border-left: 4px solid #2563eb;
      }

      .profile-stat-card.admin {
        border-left-color: #dc2626;
      }

      .profile-stat-value {
        font-size: 24px;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 4px;
      }

      .profile-stat-label {
        font-size: 12px;
        color: #6b7280;
        font-weight: 600;
        text-transform: uppercase;
      }

      .profile-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }

      .profile-btn {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .profile-btn-primary {
        background: #2563eb;
        color: white;
      }

      .profile-btn-primary:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
      }

      .profile-btn-primary.admin {
        background: #dc2626;
      }

      .profile-btn-primary.admin:hover {
        background: #991b1b;
      }

      .profile-btn-secondary {
        background: #f3f4f6;
        color: #1a1a1a;
        border: 1px solid #e5e7eb;
      }

      .profile-btn-secondary:hover {
        background: #e5e7eb;
      }

      .profile-btn-danger {
        background: #fee2e2;
        color: #991b1b;
      }

      .profile-btn-danger:hover {
        background: #fecaca;
      }

      .feedback-modal-overlay,
      .profile-modal-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.52);
        z-index: 9999;
        align-items: center;
        justify-content: center;
      }

      .feedback-modal-overlay.active {
        display: flex;
      }

      .feedback-modal-content {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 520px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        animation: slideUp 0.3s ease-out;
      }

      .feedback-modal-header {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        padding: 24px;
      }

      .feedback-modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      .feedback-modal-body {
        padding: 24px;
      }

      .feedback-modal-body p {
        margin: 0 0 16px;
        color: #475569;
      }

      .feedback-textarea {
        width: 100%;
        min-height: 130px;
        resize: vertical;
        border: 1px solid #d1d5db;
        border-radius: 14px;
        padding: 16px;
        font-size: 0.95rem;
        color: #111827;
        background: #f8fafc;
      }

      .feedback-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 24px;
        background: #f8fafc;
      }

      .feedback-modal-footer button {
        border: none;
        border-radius: 12px;
        padding: 12px 20px;
        font-weight: 700;
        cursor: pointer;
      }

      .feedback-modal-close {
        background: #e5e7eb;
        color: #111827;
      }

      .feedback-modal-submit {
        background: #2563eb;
        color: white;
      }

      .feedback-modal-submit:hover {
        background: #1d4ed8;
      }

      .footer-feedback-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #2563eb;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }

      .footer-feedback-link:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // Create profile modal
  let profileModal = document.getElementById('profileModal');
  if (!profileModal) {
    profileModal = document.createElement('div');
    profileModal.id = 'profileModal';
    profileModal.className = 'profile-modal-overlay';
    document.body.appendChild(profileModal);
  }

  function renderUserProfile() {
    const userEmail = localStorage.getItem('userEmail') || 'User';
    const userName = localStorage.getItem('baguioTrackUserName') || 'Guest User';
    const userImage = localStorage.getItem('baguioTrackProfileImage');
    const registeredUsers = localStorage.getItem('registeredUsers') || '0';
    const createdDate = localStorage.getItem('userCreatedDate') || new Date().toLocaleDateString();

    profileModal.innerHTML = `
      <div class="profile-modal-content">
        <div class="profile-header">
          <div class="profile-avatar">
            ${userImage ? `<img src="${userImage}" alt="${userName}">` : '<i class="fas fa-user" style="color: white;"></i>'}
          </div>
          <div class="profile-name">${userName}</div>
          <div style="font-size: 13px; margin-top: 4px;">${userEmail}</div>
          <div class="profile-role">👤 Tourist</div>
        </div>
        <div class="profile-body">
          <div class="profile-section">
            <div class="profile-section-title">Account Information</div>
            <div class="profile-item">
              <span class="profile-item-label">Email</span>
              <span class="profile-item-value">${userEmail}</span>
            </div>
            <div class="profile-item">
              <span class="profile-item-label">Member Since</span>
              <span class="profile-item-value">${createdDate}</span>
            </div>
          </div>

          <div class="profile-section">
            <div class="profile-section-title">Activity</div>
            <div class="profile-stat">
              <div class="profile-stat-card">
                <div class="profile-stat-value">${localStorage.getItem('userVisits') || '0'}</div>
                <div class="profile-stat-label">Site Visits</div>
              </div>
              <div class="profile-stat-card">
                <div class="profile-stat-value">${localStorage.getItem('userFeedback') || '0'}</div>
                <div class="profile-stat-label">Feedback Sent</div>
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <button class="profile-btn profile-btn-secondary" onclick="document.getElementById('profileModal').classList.remove('active')">Close</button>
            <button class="profile-btn profile-btn-primary" onclick="window.location.href='home.html'; document.getElementById('profileModal').classList.remove('active');">Go Home</button>
            <button class="profile-btn profile-btn-danger" id="logoutBtnUser">Logout</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminProfile() {
    const adminEmail = localStorage.getItem('adminEmail') || 'Admin';
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]').length;
    const adminCreatedDate = localStorage.getItem('adminLoginDate') || new Date().toLocaleDateString();

    profileModal.innerHTML = `
      <div class="profile-modal-content">
        <div class="profile-header admin">
          <div class="profile-avatar">
            <i class="fas fa-crown" style="color: white;"></i>
          </div>
          <div class="profile-name">Admin Portal</div>
          <div style="font-size: 13px; margin-top: 4px;">${adminEmail}</div>
          <div class="profile-role">👑 Administrator</div>
        </div>
        <div class="profile-body">
          <div class="profile-section">
            <div class="profile-section-title">Admin Account</div>
            <div class="profile-item">
              <span class="profile-item-label">Email</span>
              <span class="profile-item-value">${adminEmail}</span>
            </div>
            <div class="profile-item">
              <span class="profile-item-label">Last Login</span>
              <span class="profile-item-value">${adminCreatedDate}</span>
            </div>
          </div>

          <div class="profile-section">
            <div class="profile-section-title">Dashboard Stats</div>
            <div class="profile-stat">
              <div class="profile-stat-card admin">
                <div class="profile-stat-value">${announcements}</div>
                <div class="profile-stat-label">Announcements</div>
              </div>
              <div class="profile-stat-card admin">
                <div class="profile-stat-value">${localStorage.getItem('totalFeedback') || '0'}</div>
                <div class="profile-stat-label">Feedback</div>
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <button class="profile-btn profile-btn-secondary" onclick="document.getElementById('profileModal').classList.remove('active')">Close</button>
            <button class="profile-btn profile-btn-primary admin" onclick="window.location.href='admin.html'"><i class="fas fa-cog"></i> Admin Panel</button>
            <button class="profile-btn profile-btn-danger" id="logoutBtnAdmin">Logout</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderFeedbackModal() {
    const userEmail = localStorage.getItem('userEmail') || 'Guest';
    const userName = localStorage.getItem('baguioTrackUserName') || 'Guest User';

    feedbackModal.innerHTML = `
      <div class="feedback-modal-content">
        <div class="feedback-modal-header">
          <h2>Share Feedback</h2>
        </div>
        <div class="feedback-modal-body">
          <p>We’d love to hear your thoughts about Baguio Track. Your feedback helps us improve the experience.</p>
          <div class="profile-item" style="background: #f8fafc; border-radius: 14px; margin-bottom: 18px;">
            <span class="profile-item-label">Logged in as</span>
            <span class="profile-item-value">${userName} • ${userEmail}</span>
          </div>
          <textarea id="feedbackMessage" class="feedback-textarea" placeholder="Write your feedback here..."></textarea>
        </div>
        <div class="feedback-modal-footer">
          <button class="feedback-modal-close" type="button">Close</button>
          <button class="feedback-modal-submit" type="button">Send Feedback</button>
        </div>
      </div>
    `;

    const closeBtn = feedbackModal.querySelector('.feedback-modal-close');
    const submitBtn = feedbackModal.querySelector('.feedback-modal-submit');

    closeBtn.addEventListener('click', () => feedbackModal.classList.remove('active'));
    submitBtn.addEventListener('click', () => {
      const message = document.getElementById('feedbackMessage').value.trim();
      if (!message) {
        alert('Please enter your feedback before submitting.');
        return;
      }

      const feedbackList = JSON.parse(localStorage.getItem('feedbackMessages') || '[]');
      feedbackList.push({
        date: new Date().toISOString(),
        userName,
        userEmail,
        message,
      });
      localStorage.setItem('feedbackMessages', JSON.stringify(feedbackList));

      const currentUserFeedback = parseInt(localStorage.getItem('userFeedback') || '0', 10);
      localStorage.setItem('userFeedback', currentUserFeedback + 1);

      const totalFeedback = parseInt(localStorage.getItem('totalFeedback') || '0', 10);
      localStorage.setItem('totalFeedback', totalFeedback + 1);

      feedbackModal.classList.remove('active');
      alert('Thank you for your feedback!');
    });
  }

  function attachFooterFeedbackLinks() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    let footerLinks = footer.querySelector('.footer-links');
    if (!footerLinks) {
      footerLinks = document.createElement('div');
      footerLinks.className = 'footer-links';
      footer.appendChild(footerLinks);
    }

    if (!footer.querySelector('.footer-feedback-link')) {
      const feedbackLink = document.createElement('a');
      feedbackLink.href = '#';
      feedbackLink.className = 'footer-feedback-link';
      feedbackLink.textContent = 'Feedback';
      feedbackLink.addEventListener('click', (event) => {
        event.preventDefault();
        renderFeedbackModal();
        feedbackModal.classList.add('active');
      });
      footerLinks.appendChild(feedbackLink);
    }
  }

  let feedbackModal = document.getElementById('feedbackModal');
  if (!feedbackModal) {
    feedbackModal = document.createElement('div');
    feedbackModal.id = 'feedbackModal';
    feedbackModal.className = 'feedback-modal-overlay';
    document.body.appendChild(feedbackModal);
  }

  feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
      feedbackModal.classList.remove('active');
    }
  });

  attachFooterFeedbackLinks();

  /* === Emergency Hotlines footer link + modal === */
  function renderEmergencyModal() {
    const emergencyContent = `
      <div class="feedback-modal-content">
        <div class="feedback-modal-header">
          <h2>Emergency Hotlines</h2>
        </div>
        <div class="feedback-modal-body">
          <ul style="list-style:none; padding-left:0; margin:0; color:#475569;">
            <li><strong>CDRRMO:</strong> 0927-628-0498</li>
            <li><strong>EMS:</strong> 442-1911 · 0905-555-1911 · 426-1901 · 0921-320-8052</li>
            <li><strong>BCPO:</strong> (074) 661-1471 · 0998-598-7739 · 0917-575-8993</li>
            <li><strong>Fire Station:</strong> 442-2222 · 0912-409-6114 · 443-7089</li>
          </ul>
        </div>
        <div class="feedback-modal-footer">
          <button class="feedback-modal-close" type="button">Close</button>
        </div>
      </div>
    `;
    feedbackModal.innerHTML = emergencyContent;

    const closeBtn = feedbackModal.querySelector('.feedback-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => feedbackModal.classList.remove('active'));
  }

  function attachFooterEmergencyLink() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    let footerLinks = footer.querySelector('.footer-links');
    if (!footerLinks) {
      footerLinks = document.createElement('div');
      footerLinks.className = 'footer-links';
      footer.appendChild(footerLinks);
    }
    if (!footer.querySelector('.footer-emergency-link')) {
      const emergencyLink = document.createElement('a');
      emergencyLink.href = '#';
      emergencyLink.className = 'footer-emergency-link';
      emergencyLink.textContent = 'Emergency Hotlines';
      emergencyLink.style.color = '#2563eb';
      emergencyLink.style.fontWeight = '700';
      emergencyLink.addEventListener('click', (event) => {
        event.preventDefault();
        renderEmergencyModal();
        feedbackModal.classList.add('active');
      });
      footerLinks.appendChild(emergencyLink);
    }
  }

  attachFooterEmergencyLink();

  /* === Simple image lightbox === */
  (function initImageLightbox() {
    let lightbox = document.getElementById('imageLightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'imageLightbox';
      lightbox.style.display = 'none';
      lightbox.style.position = 'fixed';
      lightbox.style.inset = '0';
      lightbox.style.background = 'rgba(0,0,0,0.82)';
      lightbox.style.zIndex = '7000';
      lightbox.style.alignItems = 'center';
      lightbox.style.justifyContent = 'center';
      lightbox.style.padding = '24px';
      lightbox.innerHTML = `
        <div style="position:relative; width:96%; max-width:920px; height:72vh; max-height:620px; min-height:520px; display:flex; align-items:center; justify-content:center; padding:0;">
          <div style="position:absolute; inset:0; background:rgba(255,255,255,0.06); backdrop-filter:blur(2px); border-radius:24px; border:1px solid rgba(255,255,255,0.16);"></div>
          <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:24px;">
            <img id="lightboxImage" src="" alt="Enlarged image" style="width:100%; height:100%; border-radius:18px; object-fit:contain; box-shadow:0 24px 60px rgba(0,0,0,0.28);">
          </div>
          <button id="lightboxClose" style="position:absolute; top:16px; right:16px; background:#ffffff; width:48px; height:48px; border-radius:50%; border:none; font-size:26px; cursor:pointer; box-shadow:0 12px 30px rgba(0,0,0,0.18); transition:transform .2s ease, background .2s ease;">&times;</button>
          <button id="lightboxPrev" style="position:absolute; left:16px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.96); width:48px; height:48px; border-radius:50%; border:none; font-size:24px; cursor:pointer; box-shadow:0 12px 30px rgba(0,0,0,0.18); transition:transform .2s ease, background .2s ease;">◀</button>
          <button id="lightboxNext" style="position:absolute; right:16px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.96); width:48px; height:48px; border-radius:50%; border:none; font-size:24px; cursor:pointer; box-shadow:0 12px 30px rgba(0,0,0,0.18); transition:transform .2s ease, background .2s ease;">▶</button>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImage = lightbox.querySelector('#lightboxImage');
    const lightboxClose = lightbox.querySelector('#lightboxClose');
    const lightboxPrev = lightbox.querySelector('#lightboxPrev');
    const lightboxNext = lightbox.querySelector('#lightboxNext');

    let galleryItems = [];
    let currentLightboxIndex = 0;

    function normalizeUrl(url) {
      return String(url || '').trim();
    }

    function getGalleryData() {
      const container = document.querySelector('#gallery-urls, .gallery-urls, .editable-gallery');
      if (!container) return [];
      const entries = [];
      const dataGallery = normalizeUrl(container.getAttribute('data-gallery'));
      if (dataGallery) {
        const parts = dataGallery.split(/\||,|;/).map(normalizeUrl).filter(Boolean);
        entries.push(...parts);
      }
      for (let i = 1; i <= 5; i += 1) {
        const value = normalizeUrl(container.getAttribute('data-img-' + i));
        if (value) entries.push(value);
      }
      if (entries.length) {
        return Array.from(new Set(entries));
      }
      return [];
    }

    function loadGalleryItems() {
      const items = getGalleryData();
      if (items.length) {
        return items.map(src => ({ src, alt: '' }));
      }
      return [];
    }

    function updateLightbox() {
      const item = galleryItems[currentLightboxIndex] || { src: '', alt: 'Enlarged image' };
      lightboxImage.src = item.src;
      lightboxImage.alt = item.alt || 'Enlarged image';
      const hasGallery = galleryItems.length > 1;
      if (!hasGallery) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
      } else {
        lightboxPrev.style.display = '';
        lightboxNext.style.display = '';
        lightboxPrev.disabled = currentLightboxIndex <= 0;
        lightboxNext.disabled = currentLightboxIndex >= galleryItems.length - 1;
        lightboxPrev.style.opacity = lightboxPrev.disabled ? '0.3' : '1';
        lightboxNext.style.opacity = lightboxNext.disabled ? '0.3' : '1';
      }
    }

    function openLightbox(index) {
      currentLightboxIndex = Math.max(0, Math.min(index, galleryItems.length - 1));
      if (!galleryItems.length) {
        return;
      }
      updateLightbox();
      lightbox.style.display = 'flex';
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      lightboxImage.src = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); if (currentLightboxIndex < galleryItems.length - 1) openLightbox(currentLightboxIndex + 1); });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display !== 'flex') return;
      if (e.key === 'ArrowRight') {
        if (currentLightboxIndex < galleryItems.length - 1) openLightbox(currentLightboxIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    });

    galleryItems = loadGalleryItems();

    document.querySelectorAll('.hero-media img, .card-image img, #openImage').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.preventDefault();
        if (!galleryItems.length) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt || 'Enlarged image';
          lightboxPrev.disabled = true;
          lightboxNext.disabled = true;
          lightboxPrev.style.opacity = '0.3';
          lightboxNext.style.opacity = '0.3';
          lightbox.style.display = 'flex';
          return;
        }
        const targetSrc = normalizeUrl(img.src);
        const foundIndex = galleryItems.findIndex(item => normalizeUrl(item.src) === targetSrc);
        openLightbox(foundIndex >= 0 ? foundIndex : 0);
      });
    });

    const legacyPopup = document.getElementById('imgPopup');
    if (legacyPopup && legacyPopup.parentNode) legacyPopup.parentNode.removeChild(legacyPopup);
    const legacyClose = document.getElementById('closePopup');
    if (legacyClose && legacyClose.parentNode) legacyClose.parentNode.removeChild(legacyClose);
  })();

  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      if (localStorage.getItem('isAdminLoggedIn') === 'true') {
        renderAdminProfile();
      } else if (localStorage.getItem('isLoggedIn') === 'true') {
        renderUserProfile();
      }
      profileModal.classList.add('active');
    });
  }

  // Close modal when clicking outside
  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      profileModal.classList.remove('active');
    }
  });

  // Logout handlers
  document.addEventListener('click', (e) => {
    if (e.target.id === 'logoutBtnUser') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('baguioTrackUserName');
      localStorage.removeItem('baguioTrackProfileImage');
      localStorage.removeItem('userCreatedDate');
      localStorage.removeItem('userVisits');
      localStorage.removeItem('userFeedback');
      window.location.href = 'index.html';
    } else if (e.target.id === 'logoutBtnAdmin') {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminToken');
      window.location.href = 'adminlogin.html';
    }
  });
});