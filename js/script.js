// Default Configuration
const defaultConfig = {
  profile: {
    name: 'Your Name',
    bio: 'Justink, the completely free and open-source LinkTree alternative.',
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Justink'
  },
  links: [
    { id: 1, name: "Instagram", url: "https://instagram.com" },
    { id: 2, name: "YouTube", url: "https://youtube.com" },
    { id: 3, name: "Portfolio", url: "#" },
    { id: 4, name: "Contact", url: "mailto:email@example.com" }
  ],
  design: {
    bgType: 'solid',
    bgColor: '#2d3748',
    gradientColor1: '#667eea',
    gradientColor2: '#764ba2',
    gradientDir: 'to right',
    textColor: '#f3f4f6',
    btnColor: '#818cf8',
    btnTextColor: '#0f172a',
    animStyle: 'fade-up',
    enableTilt: true,
    enableGlitch: true
  }
};

// Load config from memory or use defaults
let config = JSON.parse(JSON.stringify(defaultConfig));
let nextLinkId = 5;

// DOM Elements
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const mainBody = document.getElementById('mainBody');
const linksContainer = document.getElementById('links');
const nameTitle = document.getElementById('nameTitle');
const profileImage = document.getElementById('profileImage');
const description = document.getElementById('description');
const previewImage = document.getElementById('previewImage');

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
  });
});

// Settings Panel Toggle
settingsToggle.addEventListener('click', () => {
  settingsPanel.classList.add('open');
});

closeSettings.addEventListener('click', () => {
  settingsPanel.classList.remove('open');
});

// Handle Profile Picture Upload
document.getElementById('uploadPicBtn').addEventListener('click', () => {
  document.getElementById('profilePicFile').click();
});

document.getElementById('profilePicFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      document.getElementById('profilePic').value = result;
      previewImage.src = result;
    };
    reader.readAsDataURL(file);
  }
});

// Apply Profile Changes
document.getElementById('applyProfile').addEventListener('click', () => {
  config.profile.name = document.getElementById('profileName').value;
  config.profile.bio = document.getElementById('profileBio').value;
  config.profile.picture = document.getElementById('profilePic').value;
  applyProfile();
});

// Apply Profile
function applyProfile() {
  nameTitle.textContent = config.profile.name;
  nameTitle.setAttribute('data-text', config.profile.name);
  description.textContent = config.profile.bio;
  profileImage.src = config.profile.picture;
  previewImage.src = config.profile.picture;
}

// Render Links in Settings
function renderLinksList() {
  const linksList = document.getElementById('linksList');
  linksList.innerHTML = '';

  config.links.forEach((link, index) => {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    linkItem.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <span class="text-white font-medium text-sm">Link ${index + 1}</span>
        <button class="text-red-400 hover:text-red-300 text-sm flex items-center" onclick="removeLink(${link.id})">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </button>
      </div>
      <input type="text" value="${link.name}" 
             class="w-full p-2 rounded bg-gray-600 text-white mb-2 text-sm" 
             onchange="updateLink(${link.id}, 'name', this.value)" 
             placeholder="Link Name" />
      <input type="text" value="${link.url}" 
             class="w-full p-2 rounded bg-gray-600 text-white text-sm" 
             onchange="updateLink(${link.id}, 'url', this.value)" 
             placeholder="https://example.com" />
    `;
    linksList.appendChild(linkItem);
  });
}

// Add Link
document.getElementById('addLink').addEventListener('click', () => {
  config.links.push({
    id: nextLinkId++,
    name: 'New Link',
    url: 'https://example.com'
  });
  renderLinksList();
  renderLinks();
});

// Update Link
window.updateLink = function(id, field, value) {
  const link = config.links.find(l => l.id === id);
  if (link) {
    link[field] = value;
    renderLinks();
  }
};

// Remove Link
window.removeLink = function(id) {
  config.links = config.links.filter(l => l.id !== id);
  renderLinksList();
  renderLinks();
};

// Apply Design Configuration
function applyDesign() {
  const design = config.design;

  // Background
  if (design.bgType === 'solid') {
    mainBody.style.background = design.bgColor;
  } else {
    mainBody.style.background = `linear-gradient(${design.gradientDir}, ${design.gradientColor1}, ${design.gradientColor2})`;
  }

  // Text Colors
  description.style.color = design.textColor;
  nameTitle.style.color = design.textColor;

  // Glitch Effect
  if (design.enableGlitch) {
    nameTitle.classList.add('glitch');
  } else {
    nameTitle.classList.remove('glitch');
  }

  // Update all links
  renderLinks();
}

// Render Links on Page
function renderLinks() {
  linksContainer.innerHTML = '';
  
  config.links.forEach((link) => {
    const wrapper = document.createElement('div');
    wrapper.className = config.design.enableTilt ? 'tilt-item anim-element' : 'anim-element';
    wrapper.classList.add(config.design.animStyle);

    const el = document.createElement('a');
    el.href = link.url;
    el.target = '_blank';
    el.className = 'block w-full py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200';
    el.style.backgroundColor = config.design.btnColor;
    el.style.color = config.design.btnTextColor;
    el.textContent = link.name;

    wrapper.appendChild(el);
    linksContainer.appendChild(wrapper);
  });

  // Reinitialize observers and tilt
  setTimeout(() => {
    initAnimations();
    if (config.design.enableTilt) {
      initTilt();
    }
  }, 50);
}

// Initialize Scroll Animations
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.anim-element').forEach((el) => {
    el.classList.remove('show');
    observer.observe(el);
  });
}

// Initialize Tilt Effect
function initTilt() {
  document.querySelectorAll('.tilt-item').forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      item.style.transform = `rotateX(${(-y / 25)}deg) rotateY(${x / 25}deg)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Update Gradient Preview
function updateGradientPreview() {
  const preview = document.getElementById('gradientPreview');
  const dir = document.getElementById('gradientDir').value;
  const c1 = document.getElementById('gradientColor1').value;
  const c2 = document.getElementById('gradientColor2').value;
  preview.style.background = `linear-gradient(${dir}, ${c1}, ${c2})`;
}

// Design Settings Event Listeners
document.getElementById('bgType').addEventListener('change', (e) => {
  config.design.bgType = e.target.value;
  document.getElementById('solidBgControls').classList.toggle('hidden', config.design.bgType !== 'solid');
  document.getElementById('gradientControls').classList.toggle('hidden', config.design.bgType !== 'gradient');
  applyDesign();
});

document.getElementById('bgColor').addEventListener('input', (e) => {
  config.design.bgColor = e.target.value;
  applyDesign();
});

document.getElementById('gradientColor1').addEventListener('input', (e) => {
  config.design.gradientColor1 = e.target.value;
  updateGradientPreview();
  applyDesign();
});

document.getElementById('gradientColor2').addEventListener('input', (e) => {
  config.design.gradientColor2 = e.target.value;
  updateGradientPreview();
  applyDesign();
});

document.getElementById('gradientDir').addEventListener('change', (e) => {
  config.design.gradientDir = e.target.value;
  updateGradientPreview();
  applyDesign();
});

document.getElementById('textColor').addEventListener('input', (e) => {
  config.design.textColor = e.target.value;
  applyDesign();
});

document.getElementById('btnColor').addEventListener('input', (e) => {
  config.design.btnColor = e.target.value;
  applyDesign();
});

document.getElementById('btnTextColor').addEventListener('input', (e) => {
  config.design.btnTextColor = e.target.value;
  applyDesign();
});

document.getElementById('animStyle').addEventListener('change', (e) => {
  config.design.animStyle = e.target.value;
  applyDesign();
});

document.getElementById('enableTilt').addEventListener('change', (e) => {
  config.design.enableTilt = e.target.checked;
  applyDesign();
});

document.getElementById('enableGlitch').addEventListener('change', (e) => {
  config.design.enableGlitch = e.target.checked;
  applyDesign();
});

// Export Configuration
document.getElementById('exportConfig').addEventListener('click', () => {
  const json = JSON.stringify(config, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'justink-config.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Import Configuration
document.getElementById('importConfig').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        config = JSON.parse(event.target.result);
        loadConfigToUI();
        applyProfile();
        applyDesign();
        renderLinksList();
        alert('Configuration imported successfully!');
      } catch (error) {
        alert('Invalid configuration file');
      }
    };
    reader.readAsText(file);
  }
});

// Reset Configuration
document.getElementById('resetConfig').addEventListener('click', () => {
  if (confirm('Reset to default configuration? This will clear all your customizations.')) {
    config = JSON.parse(JSON.stringify(defaultConfig));
    loadConfigToUI();
    applyProfile();
    applyDesign();
    renderLinksList();
  }
});

// Load Config to UI
function loadConfigToUI() {
  // Profile
  document.getElementById('profileName').value = config.profile.name;
  document.getElementById('profileBio').value = config.profile.bio;
  document.getElementById('profilePic').value = config.profile.picture;
  previewImage.src = config.profile.picture;

  // Design
  document.getElementById('bgType').value = config.design.bgType;
  document.getElementById('bgColor').value = config.design.bgColor;
  document.getElementById('gradientColor1').value = config.design.gradientColor1;
  document.getElementById('gradientColor2').value = config.design.gradientColor2;
  document.getElementById('gradientDir').value = config.design.gradientDir;
  document.getElementById('textColor').value = config.design.textColor;
  document.getElementById('btnColor').value = config.design.btnColor;
  document.getElementById('btnTextColor').value = config.design.btnTextColor;
  document.getElementById('animStyle').value = config.design.animStyle;
  document.getElementById('enableTilt').checked = config.design.enableTilt;
  document.getElementById('enableGlitch').checked = config.design.enableGlitch;

  document.getElementById('solidBgControls').classList.toggle('hidden', config.design.bgType !== 'solid');
  document.getElementById('gradientControls').classList.toggle('hidden', config.design.bgType !== 'gradient');
  updateGradientPreview();
}

// Initialize
loadConfigToUI();
applyProfile();
applyDesign();
renderLinksList();