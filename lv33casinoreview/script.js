document.addEventListener("DOMContentLoaded", function () {
    const casinos = document.querySelectorAll(".casino-card");
    const showMoreBtn = document.querySelector(".show-more-btn");

    // Initially hide casinos beyond the first 6
    for (let i = 6; i < casinos.length; i++) {
        casinos[i].classList.add("hidden-casino");
    }

    showMoreBtn.addEventListener("click", function () {
        // Reveal hidden casinos
        document.querySelectorAll(".hidden-casino").forEach((casino, index) => {
            if (index < 6) {
                casino.classList.remove("hidden-casino");
            }
        });

        // Check if there are still hidden casinos left
        if (document.querySelectorAll(".hidden-casino").length === 0) {
            showMoreBtn.style.display = "none"; // Hide button if all casinos are shown
        }
    });
});
