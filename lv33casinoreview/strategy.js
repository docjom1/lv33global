document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let strategyCards = document.querySelectorAll(".strategy-card");
    let visibleCount = 2;

    // Hide extra strategies
    strategyCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        strategyCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= strategyCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
