document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let bettingCards = document.querySelectorAll(".betting-card");
    let visibleCount = 6;

    // Hide extra betting cards
    bettingCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        bettingCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 6) {
                card.style.display = "block";
            }
        });

        visibleCount += 6;
        if (visibleCount >= bettingCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
