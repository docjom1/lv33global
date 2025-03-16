document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let giveawayCards = document.querySelectorAll(".giveaway-card");
    let visibleCount = 2;

    // Hide extra giveaways
    giveawayCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        giveawayCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= giveawayCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
