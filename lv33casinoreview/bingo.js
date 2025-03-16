document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let bingoCards = document.querySelectorAll(".bingo-card");
    let visibleCount = 2;

    // Hide extra bingo cards
    bingoCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        bingoCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= bingoCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
