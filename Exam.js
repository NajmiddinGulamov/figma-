const basketBtn = document.querySelector('nav svg'); 
const basketPanel = document.getElementById("basket-panel");
const basketCount = document.getElementById("basket-count");
const subscribeBtn = document.querySelector(".subscribe-btn");

let basketElementlar = [];

const basketList = document.createElement("div");
basketList.id = "basket-list";
basketPanel.appendChild(basketList);

const basketBosh = document.createElement("p");
basketBosh.id = "basket-empty";
basketBosh.textContent = "Savat bo'sh";
basketPanel.appendChild(basketBosh);

basketBtn.style.cursor = "pointer";
basketBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    basketPanel.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!basketPanel.contains(e.target) && e.target !== basketBtn) {
        basketPanel.classList.add('hidden');
    }
});

basketPanel.addEventListener('click', (e) => e.stopPropagation());

if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
        alert("Obuna bo'ldingiz! 🎉 Rahmat");
    });
}

function basketgaQosh(nom, narx, rasm) {
    basketElementlar.push({ nom, narx, rasm });
    basketYangila();
}

function basketYangila() {
    basketList.innerHTML = "";
    
    if (basketElementlar.length === 0) {
        basketBosh.style.display = "block";
        basketCount.textContent = "0";
    } else {
        basketBosh.style.display = "none";
        basketCount.textContent = basketElementlar.length;

        basketElementlar.forEach((element, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.style.cssText = "display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding:5px; background:white;";

            itemDiv.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <img src="${element.rasm}" width="35" height="35" style="object-fit:cover; border-radius:4px;">
                    <div style="display:flex; flex-direction:column;">
                        <span style="color:#333; font-size:11px; font-weight:bold;">${element.nom}</span>
                        <span style="color:#2ecc71; font-size:11px;">${element.narx}</span>
                    </div>
                </div>
                <button class="delete-item" data-index="${index}" style="background:none; border:none; color:red; cursor:pointer; font-size:14px;">✕</button>
            `;
            basketList.appendChild(itemDiv);
        });
    }
}

basketList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-item")) {
        const idx = e.target.getAttribute("data-index");
        basketElementlar.splice(idx, 1);
        basketYangila();
    }
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-cart, .cart, .wishlist, .wishlist-small");
    if (!btn) return;

    const card = e.target.closest(".offer-card, .product-card, .trend-card, .deals-banner");
    if (!card) return;

    const nameEl = card.querySelector("h4") || card.querySelector("h3");
    const priceEl = card.querySelector(".price, .new-price, .price-tag");
    const imgEl = card.querySelector("img");

    if (nameEl && priceEl && imgEl) {
        basketgaQosh(nameEl.textContent.trim(), priceEl.textContent.trim(), imgEl.src);
        alert("🛒 Savatga qo'shildi!");
    }
});