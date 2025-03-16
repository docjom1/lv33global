document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let pokerCards = document.querySelectorAll(".poker-card");
    let visibleCount = 2;

    // Hide extra poker cards
    pokerCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        pokerCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= pokerCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
