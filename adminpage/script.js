const modal = document.getElementById("postModal");
  const updateModal = document.getElementById("updateCasinoModal");
  const previewModal = document.getElementById("previewModal");

  // --- ORIGINAL Post News modal ---
  function openModal() {
    modal.style.display = "flex";
    modal.classList.remove("fadeOut");
  }

  function closeModal() {
    modal.classList.add("fadeOut");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fadeOut");
    }, 300);
  }

  document.getElementById("postForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:3000/api/create-post", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      const message = document.getElementById("responseMessage");
      message.textContent = data.message;
      message.style.color = res.ok ? "lime" : "red";

      if (res.ok) {
        form.reset();
        closeModal();
        window.location.href = "../news/index.html";
      }
    } catch (error) {
      document.getElementById("responseMessage").textContent = "Failed to post. Try again.";
      document.getElementById("responseMessage").style.color = "red";
      console.error("Post error:", error);
    }
  });

  // --- Update Casino Modal ---
  function openCasinoModal() {
    updateModal.style.display = "flex";
    updateModal.classList.remove("fadeOut");
  }

  function closeCasinoModal() {
    updateModal.classList.add("fadeOut");
    setTimeout(() => {
      updateModal.style.display = "none";
      updateModal.classList.remove("fadeOut");
    }, 300);
  }

  document.getElementById("casinoForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:3000/api/create-casino", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      const message = document.getElementById("casinoResponseMessage");
      message.textContent = data.message;
      message.style.color = res.ok ? "lime" : "red";

      if (res.ok) {
        form.reset();
        closeCasinoModal();
        clearPreview();
      }
    } catch (err) {
      document.getElementById("casinoResponseMessage").textContent = "Failed to update.";
      document.getElementById("casinoResponseMessage").style.color = "red";
    }
  });

  // --- Preview Modal for Update Casino ---
  function openPreviewModal() {
  const label1 = document.getElementById("label1").value;
  const label2 = document.getElementById("label2").value;
  const countryData = document.getElementById("countryHidden").value;

  let flagHTML = "";
  if (countryData) {
    try {
      const { name, code } = JSON.parse(countryData);
      const flagURL = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
      flagHTML = `<img src="${flagURL}" style="width: 20px; vertical-align: middle; margin-right: 6px;"> ${name}`;
    } catch (e) {
      flagHTML = countryData;
    }
  }
  document.getElementById("previewCountry").innerHTML = flagHTML;

  const website = document.getElementById("website").value;
  const payments = Array.from(document.querySelectorAll('input[name="payments[]"]:checked'))
    .map(cb => cb.value).join(", ");
  const ranking = document.getElementById("ranking").value;

  document.getElementById("previewLabels").textContent = `${label1} - ${label2}`;
  document.getElementById("previewWebsite").textContent = website;
  document.getElementById("previewPayments").textContent = `Payments: ${payments}`;
  document.getElementById("previewRanking").textContent = ranking;

  const file = document.getElementById("logoInput").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("previewLogo").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  previewModal.style.display = "flex";
}

  function closePreviewModal() {
    previewModal.style.display = "none";
  }

  function editPreview() {
    closePreviewModal();
  }

  function clearPreview() {
    document.getElementById("previewLabels").textContent = '';
    document.getElementById("previewCountry").textContent = '';
    document.getElementById("previewWebsite").textContent = '';
    document.getElementById("previewPayments").textContent = '';
    document.getElementById("previewRanking").textContent = '';
    document.getElementById("previewLogo").src = '';
  }

  // --- Global click to close any modal ---
  window.onclick = function (event) {
    if (event.target === modal) closeModal();
    if (event.target === updateModal) closeCasinoModal();
    if (event.target === previewModal) closePreviewModal();
  };

  // --- Load All Countries into #country dropdown ---
  async function populateCountrySelect() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    const countryList = countries
      .map(c => ({
        name: c.name.common,
        code: c.cca2 // ISO Alpha-2 code for flag
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const container = document.getElementById("countryOptions");
    container.innerHTML = "";

    const input = document.getElementById("countrySearch");
    const dropdown = document.getElementById("countryOptions");

    countryList.forEach(c => {
      const div = document.createElement("div");
      div.className = "country-item";

      const flagCode = c.code.toLowerCase();
      const flagImg = `<img src="https://flagcdn.com/w40/${flagCode}.png" style="width: 20px; margin-right: 10px;">`;

      div.innerHTML = `${flagImg} ${c.name}`;
      div.dataset.name = c.name;
      div.dataset.code = c.code;

      div.addEventListener("click", () => {
        input.value = c.name;
        dropdown.style.display = "none";

        // Save both name and code for later display
        document.getElementById("countryHidden").value = JSON.stringify({
          name: c.name,
          code: c.code
        });
      });

      container.appendChild(div);
    });

    input.addEventListener("click", () => {
      dropdown.style.display = "block";
    });

    input.addEventListener("input", function () {
      const val = this.value.toLowerCase();
      const items = document.querySelectorAll(".country-item");
      items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(val) ? "flex" : "none";
      });
      dropdown.style.display = "block";
    });

  } catch (error) {
    console.error("Failed to load countries:", error);
  }
}


  // --- Load All Payment Methods ---
 function populatePaymentMethods() {
  const paymentGroups = {
    "Credit Cards": [
      { name: "Visa", icon: "fa-brands fa-cc-visa" },
      { name: "Mastercard", icon: "fa-brands fa-cc-mastercard" },
      { name: "American Express", icon: "fa-brands fa-cc-amex" },
      { name: "Discover", icon: "fa-brands fa-cc-discover" }
    ],
    "Digital Wallets": [
      { name: "PayPal", icon: "fa-brands fa-cc-paypal" },
      { name: "Skrill", icon: "fa-solid fa-money-bill-transfer" },
      { name: "Neteller", icon: "fa-solid fa-wallet" },
      { name: "GCash", icon: "fa-solid fa-mobile-screen-button" },
      { name: "bKash", icon: "fa-solid fa-mobile-retro" }
    ],
    "Mobile Payments": [
      { name: "Apple Pay", icon: "fa-brands fa-apple" },
      { name: "Google Pay", icon: "fa-brands fa-google" },
      { name: "Samsung Pay", icon: "fa-solid fa-mobile" },
      { name: "PhonePe", icon: "fa-solid fa-mobile-button" },
      { name: "Paytm", icon: "fa-solid fa-money-bill-wave" }
    ],
    "Cryptocurrencies": [
      { name: "Bitcoin", icon: "fa-brands fa-btc" },
      { name: "Ethereum", icon: "fa-brands fa-ethereum" },
      { name: "Litecoin", icon: "fa-solid fa-coins" },
      { name: "Tether (USDT)", icon: "fa-solid fa-circle-dollar-to-slot" }
    ],
    "Banking & Local": [
      { name: "Alipay", icon: "fa-brands fa-alipay" },
      { name: "WeChat Pay", icon: "fa-brands fa-weixin" },
      { name: "iDEAL", icon: "fa-solid fa-globe" },
      { name: "POLi", icon: "fa-solid fa-building-columns" },
      { name: "PIX", icon: "fa-solid fa-qrcode" },
      { name: "TrueMoney", icon: "fa-solid fa-credit-card" },
      { name: "Dana", icon: "fa-solid fa-university" },
      { name: "UnionPay", icon: "fa-solid fa-building" },
      { name: "SWIFT", icon: "fa-solid fa-network-wired" },
      { name: "SEPA", icon: "fa-solid fa-euro-sign" }
    ]
  };

  const container = document.getElementById("checkboxes");
  container.innerHTML = `
    <input type="text" id="paymentSearch" placeholder="Search payment..." class="payment-search" />
  `;

  for (const group in paymentGroups) {
    const groupLabel = document.createElement("div");
    groupLabel.className = "payment-group-title";
    groupLabel.textContent = group;
    container.appendChild(groupLabel);

    paymentGroups[group].forEach(opt => {
      const label = document.createElement("label");
      label.classList.add("payment-option");
      label.innerHTML = `
        <input type="checkbox" name="payments[]" value="${opt.name}" />
        <i class="${opt.icon}"></i> ${opt.name}
      `;
      container.appendChild(label);
    });
  }

  // Add search functionality
  document.getElementById("paymentSearch").addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const options = document.querySelectorAll(".payment-option");
    options.forEach(opt => {
      opt.style.display = opt.textContent.toLowerCase().includes(term) ? "flex" : "none";
    });
  });
}

  // --- Trigger population once DOM is ready ---
  document.addEventListener("DOMContentLoaded", () => {
  populateCountrySelect(); // for update modal
  populatePaymentMethods();
  populateEditCountries(); // for edit modal
  populateEditPaymentMethods();
});

  let checkboxesVisible = false;
  function toggleCheckboxes() {
    const checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
    checkboxesVisible = !checkboxesVisible;
  }

  // Optional: close dropdown if user clicks outside
  document.addEventListener("click", function (e) {
  const container = document.querySelector(".country-group");
  if (!container.contains(e.target)) {
    document.getElementById("countryOptions").style.display = "none";
  }
});
async function loadCasinoUpdates() {
  try {
    const res = await fetch("http://localhost:3000/api/casino-list");
    const updates = await res.json();
    const container = document.getElementById("casinoUpdatesContainer");
    container.innerHTML = '<h2 style="color:#ffcc00; padding: 20px;">Recent Casino Submissions</h2>';

    const paymentIcons = {
      Visa: "fa-brands fa-cc-visa",
      Mastercard: "fa-brands fa-cc-mastercard",
      PayPal: "fa-brands fa-cc-paypal",
      Skrill: "fa-solid fa-money-bill-transfer",
      GCash: "fa-solid fa-mobile-screen-button",
      bKash: "fa-solid fa-mobile-retro",
      "American Express": "fa-brands fa-cc-amex",
      Discover: "fa-brands fa-cc-discover",
      Neteller: "fa-solid fa-wallet",
      "Apple Pay": "fa-brands fa-apple",
      "Google Pay": "fa-brands fa-google",
      "Samsung Pay": "fa-solid fa-mobile",
      PhonePe: "fa-solid fa-mobile-button",
      Paytm: "fa-solid fa-money-bill-wave",
      Bitcoin: "fa-brands fa-btc",
      Ethereum: "fa-brands fa-ethereum",
      Litecoin: "fa-solid fa-coins",
      "Tether (USDT)": "fa-solid fa-circle-dollar-to-slot",
      Alipay: "fa-brands fa-alipay",
      "WeChat Pay": "fa-brands fa-weixin",
      iDEAL: "fa-solid fa-globe",
      POLi: "fa-solid fa-building-columns",
      PIX: "fa-solid fa-qrcode",
      TrueMoney: "fa-solid fa-credit-card",
      Dana: "fa-solid fa-university",
      UnionPay: "fa-solid fa-building",
      SWIFT: "fa-solid fa-network-wired",
      SEPA: "fa-solid fa-euro-sign"
    };

    updates.forEach(update => {
      let country = {};
      try {
        country = JSON.parse(update.country);
      } catch {}

      const flagImg = country.code
        ? `<img class="flag" src="https://flagcdn.com/w40/${country.code.toLowerCase()}.png" alt="${country.name}" />`
        : "";

      const paymentHTML = update.payments
        .map(p => `<i class="${paymentIcons[p] || 'fa-solid fa-money-check-dollar'} payment-icon"></i>`)
        .join("");

      const div = document.createElement("div");
      div.className = "casino-card";
      div.innerHTML = `
        <div class="rank-circle">${update.ranking.replace("Rank ", "")}</div>
        <div class="casino-card-left">
          <img class="casino-logo" src="http://localhost:3000${update.logo}" alt="Casino Logo" />
          <div class="casino-name">${update.label1}</div>
          <div class="launch-year">Launched 2025</div>
        </div>
        <div class="casino-card-middle">
          ${flagImg}
          <div class="regulator">Regulated by <span class="authority">GAMBLING COMMISSION</span></div>
        </div>
        <div class="casino-card-right">
          <a class="visit-site-btn" href="${update.website}" target="_blank">VISIT SITE</a>
          ${paymentHTML}
          <div class="rating">★★★★★ <span>5/5</span></div>
        </div>
      `;
      div.addEventListener("click", () => {
        div.addEventListener("click", () => {
  document.getElementById("editCasinoModal").style.display = "flex";
  document.getElementById("edit_id").value = update._id;
  document.getElementById("edit_label1").value = update.label1;
  document.getElementById("edit_label2").value = update.label2;
  document.getElementById("edit_website").value = update.website;
  document.getElementById("edit_ranking").value = update.ranking;

  try {
    const countryObj = JSON.parse(update.country);
    document.getElementById("edit_countrySearch").value = countryObj.name;
    document.getElementById("edit_countryHidden").value = JSON.stringify(countryObj);
    document.getElementById("edit_countryOptions").style.display = "none";
  } catch {}

  populateEditPaymentMethods(update.payments || []);
});

  openEditCasinoModal(update); // opens the new modal with data
});

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load casino updates:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCasinoUpdates);


const editCasinoModal = document.getElementById("editCasinoModal");

function openEditCasinoModal(data) {
  editCasinoModal.style.display = "flex";
  document.getElementById("edit_id").value = data.id;
  document.getElementById("edit_label1").value = data.label1;
  document.getElementById("edit_label2").value = data.label2;
  document.getElementById("edit_website").value = data.website;
  document.getElementById("edit_ranking").value = data.ranking;

  try {
    const countryObj = JSON.parse(data.country || "{}");
    document.getElementById("edit_countrySearch").value = countryObj.name || "";
    document.getElementById("edit_countryHidden").value = JSON.stringify(countryObj);
    document.getElementById("edit_countryOptions").style.display = "none"; // ✅ Hide dropdown again
  } catch (e) {
    console.warn("Invalid country data", e);
  }

  populateEditPaymentMethods(data.payments || []);
}


function closeEditCasinoModal() {
  editCasinoModal.style.display = "none";
}

document.getElementById("editCasinoForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const res = await fetch("http://localhost:3000/api/update-casino", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    document.getElementById("editResponseMessage").textContent = result.message;

    document.getElementById("editResponseMessage").style.color = res.ok ? "green" : "red";

    if (res.ok) {
      closeEditCasinoModal();
      loadCasinoUpdates(); // reload updated content
    }
  } catch (err) {
    document.getElementById("editResponseMessage").textContent = "Update failed.";
    document.getElementById("editResponseMessage").style.color = "red";
  }
});
function closeEditCasinoModal() {
  document.getElementById("editCasinoModal").style.display = "none";
}

// Reuse populateCountrySelect() and populatePaymentMethods() with prefixes
async function populateEditCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const countries = await res.json();

    const countryList = countries.map(c => ({
      name: c.name.common,
      code: c.cca2
    })).sort((a, b) => a.name.localeCompare(b.name));

    const container = document.getElementById("edit_countryOptions");
    container.innerHTML = "";

    const input = document.getElementById("edit_countrySearch");
    countryList.forEach(c => {
      const div = document.createElement("div");
      div.className = "country-item";
      const flag = `<img src="https://flagcdn.com/w40/${c.code.toLowerCase()}.png" style="width: 20px; margin-right: 10px;">`;
      div.innerHTML = `${flag} ${c.name}`;
      div.dataset.name = c.name;
      div.dataset.code = c.code;

      div.addEventListener("click", () => {
        input.value = c.name;
        document.getElementById("edit_countryHidden").value = JSON.stringify({ name: c.name, code: c.code });
        container.style.display = "none";
      });
      
      container.appendChild(div);
    });
input.addEventListener("click", () => {
  container.style.display = "block";
});

    input.addEventListener("input", () => {
      const term = input.value.toLowerCase();
      document.querySelectorAll("#edit_countryOptions .country-item").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(term) ? "flex" : "none";
      });
    });

    input.addEventListener("click", () => {
      container.style.display = "block";
    });
  } catch (e) {
    console.error("Failed to load countries", e);
  }
}

function populateEditPaymentMethods(selected = []) {
  const paymentGroups = {
    "Credit Cards": [
      { name: "Visa", icon: "fa-brands fa-cc-visa" },
      { name: "Mastercard", icon: "fa-brands fa-cc-mastercard" },
      { name: "American Express", icon: "fa-brands fa-cc-amex" },
      { name: "Discover", icon: "fa-brands fa-cc-discover" }
    ],
    "Digital Wallets": [
      { name: "PayPal", icon: "fa-brands fa-cc-paypal" },
      { name: "Skrill", icon: "fa-solid fa-money-bill-transfer" },
      { name: "Neteller", icon: "fa-solid fa-wallet" },
      { name: "GCash", icon: "fa-solid fa-mobile-screen-button" },
      { name: "bKash", icon: "fa-solid fa-mobile-retro" }
    ],
    "Mobile Payments": [
      { name: "Apple Pay", icon: "fa-brands fa-apple" },
      { name: "Google Pay", icon: "fa-brands fa-google" },
      { name: "Samsung Pay", icon: "fa-solid fa-mobile" },
      { name: "PhonePe", icon: "fa-solid fa-mobile-button" },
      { name: "Paytm", icon: "fa-solid fa-money-bill-wave" }
    ],
    "Cryptocurrencies": [
      { name: "Bitcoin", icon: "fa-brands fa-btc" },
      { name: "Ethereum", icon: "fa-brands fa-ethereum" },
      { name: "Litecoin", icon: "fa-solid fa-coins" },
      { name: "Tether (USDT)", icon: "fa-solid fa-circle-dollar-to-slot" }
    ],
    "Banking & Local": [
      { name: "Alipay", icon: "fa-brands fa-alipay" },
      { name: "WeChat Pay", icon: "fa-brands fa-weixin" },
      { name: "iDEAL", icon: "fa-solid fa-globe" },
      { name: "POLi", icon: "fa-solid fa-building-columns" },
      { name: "PIX", icon: "fa-solid fa-qrcode" },
      { name: "TrueMoney", icon: "fa-solid fa-credit-card" },
      { name: "Dana", icon: "fa-solid fa-university" },
      { name: "UnionPay", icon: "fa-solid fa-building" },
      { name: "SWIFT", icon: "fa-solid fa-network-wired" },
      { name: "SEPA", icon: "fa-solid fa-euro-sign" }
    ]
  };

  const container = document.getElementById("edit_checkboxes");
  container.innerHTML = "";

  for (const group in paymentGroups) {
    const groupLabel = document.createElement("div");
    groupLabel.className = "payment-group-title";
    groupLabel.textContent = group;
    container.appendChild(groupLabel);

    paymentGroups[group].forEach(opt => {
      const label = document.createElement("label");
      label.classList.add("payment-option");
      label.innerHTML = `
        <input type="checkbox" name="payments[]" value="${opt.name}" ${selected.includes(opt.name) ? "checked" : ""} />
        <i class="${opt.icon}"></i> ${opt.name}
      `;
      container.appendChild(label);
    });
  }
}

function toggleEditCheckboxes() {
  const box = document.getElementById("edit_checkboxes");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// Initialize country and payment fields when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  populateEditCountries();
  populateEditPaymentMethods();
});

async function deleteCasino() {
  const id = document.getElementById("edit_id").value;
  if (!id || !confirm("Are you sure you want to delete this casino?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/delete-casino/${id}`, {
      method: "DELETE"
    });

    const result = await res.json();
    alert(result.message);
    if (res.ok) {
      closeEditCasinoModal();
      loadCasinoUpdates(); // refresh display
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete casino.");
  }
}
