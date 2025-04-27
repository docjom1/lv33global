// 🍔 Mobile Navigation Toggle
document.getElementById('menu-toggle')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('active');
});

// 🎰 Slider Navigation (Optional)
document.querySelector('.prev')?.addEventListener('click', () => {
  document.querySelector('.slider-cards')?.scrollBy({ left: -300, behavior: 'smooth' });
});

document.querySelector('.next')?.addEventListener('click', () => {
  document.querySelector('.slider-cards')?.scrollBy({ left: 300, behavior: 'smooth' });
});

// ⚠️ "Show More" Button (Optional)
document.querySelector('.show-more-btn')?.addEventListener('click', () => {
  alert('More casinos would be loaded here in a real implementation.');
});

// 🎞️ Auto-scrolling Banner (Optional)
let currentBanner = 0;
const banners = document.querySelectorAll('.banner');
const bannerCount = banners.length;

function scrollBanner() {
  if (bannerCount > 0) {
    currentBanner = (currentBanner + 1) % bannerCount;
    banners[currentBanner].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
}

if (bannerCount > 0) {
  setInterval(scrollBanner, 5000);
}

// 🌏 Tab Switcher Function
function showSection(sectionId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.remove('active');
  });

  // Activate the selected tab content
  const selectedTab = document.getElementById(sectionId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Update button state
  document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`.tabs-nav button[onclick*="${sectionId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Load JSON bonus cards for this tab
  loadBonuses(sectionId);
}

// 🎁 Load Bonuses From JSON File
function loadBonuses(country) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const countryData = data[country];
      const container = document.querySelector(`#${country} .bonus-grid`);
      if (!container || !countryData) {
        console.error(`❌ No bonus data found for "${country}"`);
        return;
      }

      container.innerHTML = ''; // Clear before loading

      countryData.forEach(casino => {
        const flame = casino.flame ? `<span class="flame-icon">🔥</span>` : '';
        container.innerHTML += `
          <div class="bonus-card" style="background:${casino.bg}">
            <div class="rank-badge">#${casino.rank} ${flame}</div>
            <img src="${casino.logo}" alt="${casino.name}" class="top-logo" />
            <h3 style="color:white; font-weight:900;">${casino.name}</h3>
            <p class="bonus-amount" data-amount="${casino.amount}">₱0</p>
            <p class="bonus-label">${casino.spins}</p>
            <a href="#" class="play-now">Play Now</a>
          </div>
        `;
      });

      animateBonuses();
    })
    .catch(error => {
      console.error(`❌ Failed to fetch bonus data for "${country}":`, error);
    });
}

// 💸 Animate Counter for Bonus Amounts
function animateBonuses() {
  const countElements = document.querySelectorAll('.bonus-amount');
  countElements.forEach(el => {
    const amount = parseInt(el.dataset.amount) || 0;
    let current = 0;
    const increment = Math.ceil(amount / 50);

    const counter = setInterval(() => {
      current += increment;
      if (current >= amount) {
        current = amount;
        clearInterval(counter);
      }
      el.textContent = `₱${current.toLocaleString()}`;
    }, 20);
  });
}

// 🚀 Initialize Default Tab
window.onload = () => {
  showSection('philippines'); // Set default tab on load
};
