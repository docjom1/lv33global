document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
  });
  // Casino Slider Navigation
document.querySelector('.prev').addEventListener('click', () => {
    document.querySelector('.slider-cards').scrollBy({ left: -300, behavior: 'smooth' });
  });
  
  document.querySelector('.next').addEventListener('click', () => {
    document.querySelector('.slider-cards').scrollBy({ left: 300, behavior: 'smooth' });
  });

  document.querySelector('.show-more-btn').addEventListener('click', function() {
    // This would typically load more content via AJAX
    // For now we'll just show an alert
    alert('More casinos would be loaded here in a real implementation');
  });
  // Optional: Auto-scrolling banner
let currentBanner = 0;
const banners = document.querySelectorAll('.banner');
const bannerCount = banners.length;

function scrollBanner() {
  currentBanner = (currentBanner + 1) % bannerCount;
  banners[currentBanner].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  });
}

// Auto-scroll every 5 seconds
setInterval(scrollBanner, 5000);

 // Simple Tab Navigation
 document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      contents[index].classList.add('active');
    });
  });
});


  function showSection(sectionId) {
    // Remove 'active' from all tabs
    document.querySelectorAll('.tab-section').forEach(section => {
      section.classList.remove('active');
    });

    // Add 'active' to the clicked section
    document.getElementById(sectionId).classList.add('active');

    // Optional: toggle active class on the nav buttons too
    document.querySelectorAll('.tabs-nav button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.tabs-nav button[onclick*="${sectionId}"]`).classList.add('active');
  }

function sortCards() {
  const select = document.getElementById('sortSelect');
  const grid = document.getElementById('sportsbookGrid');
  const cards = Array.from(grid.children);

  let sorted = [];

  switch (select.value) {
    case 'newest':
      sorted = cards.sort((a, b) =>
        new Date(b.dataset.date) - new Date(a.dataset.date)
      );
      break;
    case 'oldest':
      sorted = cards.sort((a, b) =>
        new Date(a.dataset.date) - new Date(b.dataset.date)
      );
      break;
    case 'highest':
      sorted = cards.sort((a, b) =>
        parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating)
      );
      break;
    case 'lowest':
      sorted = cards.sort((a, b) =>
        parseFloat(a.dataset.rating) - parseFloat(b.dataset.rating)
      );
      break;
  }

  // Re-render
  grid.innerHTML = '';
  sorted.forEach(card => grid.appendChild(card));
}
function filterCategory() {
  const selected = document.getElementById('categoryFilter').value;
  const cards = document.querySelectorAll('.sportsbook-card');

  cards.forEach(card => {
    const category = card.getAttribute('data-category');

    if (selected === 'all' || category === selected) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  const writeBtn = document.querySelector('.write-review-btn');
  const formContainer = document.getElementById('reviewFormContainer');
  const form = document.getElementById('reviewForm');
  const usernameInput = document.getElementById('username');
  const userReviewInput = document.getElementById('userReview');
  const reviewList = document.getElementById('reviewList');

  writeBtn.addEventListener('click', () => {
    const visible = formContainer.style.display === 'block';
    formContainer.style.display = visible ? 'none' : 'block';
    writeBtn.textContent = visible ? '✍️ Write a Review' : '❌ Cancel';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = usernameInput.value.trim();
    const reviewText = userReviewInput.value.trim();

    if (!name || !reviewText) {
      alert('Please fill in all fields.');
      return;
    }

    const firstLetter = name.charAt(0).toUpperCase();

    const newReview = document.createElement('div');
    newReview.classList.add('user-review');
    newReview.innerHTML = `
      <div class="user-info">
        <div class="avatar">${firstLetter}</div>
        <div>
          <strong>${name}</strong> <span class="badge">New 🇧🇩</span>
          <p class="time">🕒 Just now</p>
        </div>
      </div>
      <div class="review-text">
        <p>${reviewText}</p>
      </div>
      <div class="vote-bar">👍 0</div>
    `;

    reviewList.appendChild(newReview);
    form.reset();
    formContainer.style.display = 'none';
    writeBtn.textContent = '✍️ Write a Review';
  });
});


