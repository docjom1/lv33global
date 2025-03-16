document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let strategyCards = document.querySelectorAll(".strategy-card");
    let visibleCount = 3;

    // Hide extra strategy cards
    strategyCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        strategyCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 3) {
                card.style.display = "block";
            }
        });

        visibleCount += 3;
        if (visibleCount >= strategyCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
