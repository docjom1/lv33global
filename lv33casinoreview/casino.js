document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let casinoCards = document.querySelectorAll(".casino-card");
    let visibleCount = 2;

    // Hide extra casino cards
    casinoCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        casinoCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= casinoCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
