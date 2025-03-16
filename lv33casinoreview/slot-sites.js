document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let slotCards = document.querySelectorAll(".slot-card");
    let visibleCount = 6;

    // Hide extra slot cards
    slotCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        slotCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 6) {
                card.style.display = "block";
            }
        });

        visibleCount += 6;
        if (visibleCount >= slotCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
