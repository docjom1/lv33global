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


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
  
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  });
  