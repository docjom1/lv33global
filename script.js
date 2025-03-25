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