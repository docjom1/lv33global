document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let newsCards = document.querySelectorAll(".news-card");
    let visibleCount = 2;

    // Hide extra news
    newsCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        newsCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 2) {
                card.style.display = "block";
            }
        });

        visibleCount += 2;
        if (visibleCount >= newsCards.length) {
            showMoreBtn.style.display = "none";
        }
    });
});
