(function () {
  // use existing nav-profile button (do not overwrite site logo)
  const profileArea = document.querySelector('.nav-profile');
  if (!profileArea) return;
  const profileBtn = profileArea.querySelector('.nav-profile-btn');
  if (!profileBtn) return;

  const existingDropdown = profileArea.querySelector('.profile-dropdown');
  const dropdown = existingDropdown || document.createElement('div');
  dropdown.className = 'profile-dropdown';
  dropdown.innerHTML = `
    <ul>
      <li><a href="#" id="editProfile">✏️ Edit Profile</a></li>
      <li><a href="#" id="logoutBtn">🚪 Logout</a></li>
    </ul>
  `;

  if (!existingDropdown) {
    profileArea.appendChild(dropdown);
  }

  if (!document.getElementById('profileEnhancementStyles')) {
    const style = document.createElement('style');
    style.id = 'profileEnhancementStyles';
    style.textContent = `
      .nav-profile { position: relative; display: flex; align-items: center; gap: 12px; }
      .nav-profile .profile-summary { display: flex; align-items: center; cursor: pointer; }
      .profile-dropdown { display: none; position: absolute; top: calc(100% + 8px); right: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 8px 20px rgba(15,23,42,0.08); padding: 8px; z-index: 1100; }
      .profile-dropdown.active { display: block; }
      .profile-dropdown ul { list-style: none; margin: 0; padding: 0; }
      .profile-dropdown ul li { margin: 0; }
      .profile-dropdown ul li a { display: block; padding: 8px 12px; color: #111827; text-decoration: none; font-weight: 600; }
      .profile-dropdown ul li a:hover { background: #f3f4f6; }
      .profile-modal {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 5000;
        align-items: center;
        justify-content: center;
      }
      .profile-modal.active { display: flex; }
      .profile-modal-content {
        background: #fff;
        width: 92%;
        max-width: 420px;
        border-radius: 12px;
        padding: 18px;
      }
      .profile-modal-content h3 { margin: 0 0 12px; color: #145532; }
      .profile-modal-content label { display: block; margin-top: 10px; font-weight: 600; }
      .profile-modal-content input {
        width: 100%;
        padding: 10px;
        margin-top: 6px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      .profile-modal-actions {
        margin-top: 14px;
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .profile-modal-actions button {
        border: none;
        border-radius: 8px;
        padding: 10px 14px;
        cursor: pointer;
        font-weight: 600;
      }
      .profile-cancel-btn { background: #ececec; color: #333; }
      .profile-save-btn { background: #145532; color: #fff; }
    `;
    document.head.appendChild(style);
  }

  let modal = document.getElementById('profileEditModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'profileEditModal';
    modal.className = 'profile-modal';
    modal.innerHTML = `
      <div class="profile-modal-content" role="dialog" aria-modal="true" aria-labelledby="profileModalTitle">
        <h3 id="profileModalTitle">Edit Profile</h3>
        <label for="profileNameInput">Display Name</label>
        <input type="text" id="profileNameInput" maxlength="50" placeholder="Enter your display name" />
        <label for="profileImageInput">Profile Photo</label>
        <input type="file" id="profileImageInput" accept="image/*" />
        <div class="profile-modal-actions">
          <button type="button" class="profile-cancel-btn" id="cancelProfileBtn">Cancel</button>
          <button type="button" class="profile-save-btn" id="saveProfileBtn">Save</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // restore stored name (kept in storage) but keep button label as "Profile"
  const storedName = localStorage.getItem('baguioTrackUserName');

  // toggle dropdown when clicking the profile button
  profileBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', function () {
    dropdown.classList.remove('active');
  });

  dropdown.querySelector('#editProfile').addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('profileNameInput').value = localStorage.getItem('baguioTrackUserName') || '';
    modal.classList.add('active');
    dropdown.classList.remove('active');
  });

  dropdown.querySelector('#logoutBtn').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('baguioTrackUserName');
    localStorage.removeItem('baguioTrackProfileImage');
    localStorage.removeItem('userCreatedDate');
    localStorage.removeItem('userVisits');
    localStorage.removeItem('userFeedback');
    window.location.href = 'index.html';
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) modal.classList.remove('active');
  });

  document.getElementById('cancelProfileBtn').addEventListener('click', function () {
    modal.classList.remove('active');
  });

  document.getElementById('saveProfileBtn').addEventListener('click', function () {
    const nameValue = document.getElementById('profileNameInput').value.trim();
    const fileInput = document.getElementById('profileImageInput');

    if (nameValue) {
      localStorage.setItem('baguioTrackUserName', nameValue);
    }

    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      modal.classList.remove('active');
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (result) {
        localStorage.setItem('baguioTrackProfileImage', result);
      }
      modal.classList.remove('active');
      fileInput.value = '';
    };
    reader.readAsDataURL(file);
  });
})();
