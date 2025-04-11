
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


// Filter sportsbooks by category
function filterCategory() {
    const filterValue = document.getElementById("categoryFilter").value;
    const cards = document.querySelectorAll(".sportsbook-card");
  
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filterValue === "all" || filterValue === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  // Betting slider autoplay + swipe
  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("bettingSlider");
    let scrollAmount = 0;
  
    function autoSlide() {
      const cardWidth = slider?.querySelector(".betting-card")?.offsetWidth || 300;
      scrollAmount += cardWidth + 20;
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
      }
      slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  
    let autoScroll = setInterval(autoSlide, 4000);
  
    slider?.addEventListener("mouseenter", () => clearInterval(autoScroll));
    slider?.addEventListener("mouseleave", () => {
      autoScroll = setInterval(autoSlide, 4000);
    });
  
    // Swipe
    let startX = 0;
    slider?.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
  
    slider?.addEventListener("touchmove", (e) => {
      const x = e.touches[0].clientX;
      const diff = startX - x;
      slider.scrollLeft += diff;
      startX = x;
    });
  
    // Mobile nav toggle
    const menuBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    menuBtn?.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
  
  