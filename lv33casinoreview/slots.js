document.addEventListener("DOMContentLoaded", function () {
    /* ========================
       Casino Cards Slider
    ========================= */
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("casino-row");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "flex"; // Show current slide
        setTimeout(showSlides, 3000); // Change slide every 3 seconds
    }

    /* ========================
       Mobile Navigation Menu
    ========================= */
    let menuToggle = document.querySelector(".menu-toggle");
    let navMenu = document.querySelector(".navigation-menu ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    /* ========================
       Betting Button Animation
    ========================= */
    let bettingButton = document.querySelector(".betting-btn");
    if (bettingButton) {
        bettingButton.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#00ff00"; // Green hover effect
            this.style.transform = "translateX(-50%) scale(1.1)"; // Enlarge button
        });

        bettingButton.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "red"; // Return to red
            this.style.transform = "translateX(-50%) scale(1)"; // Reset size
        });
    }
});
