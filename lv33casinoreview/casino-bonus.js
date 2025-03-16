document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.querySelector(".show-more-btn");
    let bonusCards = document.querySelectorAll(".bonus-card");
    let visibleCount = 6;

    // Hide extra bonus cards
    bonusCards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = "none";
        }
    });

    showMoreBtn.addEventListener("click", function () {
        bonusCards.forEach((card, index) => {
            if (index >= visibleCount && index < visibleCount + 6) {
                card.style.display = "block";
            }
        });

        visibleCount += 6;
        if (visibleCount >= bonusCards.length) {
            showMoreBtn.style.display = "none";
        }
document.addEventListener("DOMContentLoaded", function () {
    const bonusContainer = document.querySelector(".bonus-container");

    // Sample bonus data (can be replaced with API data)
    const extraBonuses = [
        {
            img: "logo5.png",
            name: "Casino Royale",
            offer: "200% up to €2000 + 100 Free Spins",
        },
        {
            img: "logo6.png",
            name: "MegaSpin",
            offer: "100% up to €1500, 1st Deposit Bonus",
        },
        {
            img: "logo7.png",
            name: "Jackpot City",
            offer: "120% up to €800 + 50 Free Spins",
        },
        {
            img: "logo8.png",
            name: "SpinKing",
            offer: "50 Free Spins on Registration",
        },
    ];

    // Function to add more bonuses
    function loadMoreBonuses() {
        extraBonuses.forEach(bonus => {
            let bonusBox = document.createElement("div");
            bonusBox.classList.add("bonus-box");

            bonusBox.innerHTML = `
                <img src="${bonus.img}" alt="Casino Logo">
                <h3>${bonus.name}</h3>
                <p>${bonus.offer}</p>
                <button class="claim-btn">Get</button>
            `;

            bonusContainer.appendChild(bonusBox);
        });
    }

    // Add Show More Button
    const showMoreBtn = document.createElement("button");
    showMoreBtn.classList.add("claim-btn");
    showMoreBtn.textContent = "Show More Bonuses";
    showMoreBtn.style.display = "block";
    showMoreBtn.style.margin = "20px auto";

    // Load more bonuses on click
    showMoreBtn.addEventListener("click", function () {
        loadMoreBonuses();
        showMoreBtn.remove(); // Remove button after adding bonuses
    });

    // Append Show More Button below bonus-container
    document.querySelector(".featured-bonuses").appendChild(showMoreBtn);
});

        
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const tocLinks = document.querySelectorAll(".toc a");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        document.querySelectorAll("section").forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute("id");
            }
        });

        tocLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });
});
