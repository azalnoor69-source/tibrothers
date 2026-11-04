const productSelect = document.getElementById("product");
const orderForm = document.getElementById("orderForm");
const productCards = document.querySelectorAll(".product-card");
const qtyInput = document.getElementById("qty");
const colorInput = document.getElementById("color");
const totalPrice = document.getElementById("totalPrice");

const getBundleTotal = (quantity) => {
  const qty = Number.parseInt(quantity, 10) || 1;

  if (qty === 1) return 69;
  if (qty === 2) return 119;
  if (qty === 3) return 159;

  return 159 + (qty - 3) * 69;
};

const updateTotal = () => {
  if (!totalPrice || !qtyInput) return;

  const total = getBundleTotal(qtyInput.value);
  totalPrice.textContent = `${total} DH`;
};

document.querySelectorAll("[data-gallery-image]").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const gallery = thumb.closest(".product-gallery");
    const mainImage = gallery?.querySelector(".product-image img");
    if (!mainImage) return;

    mainImage.src = thumb.dataset.galleryImage;
    mainImage.alt = thumb.dataset.galleryAlt || "Photo du produit";

    gallery.querySelectorAll("[data-gallery-image]").forEach((item) => {
      const isActive = item === thumb;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  });
});

function syncSelectedProduct(selectedProduct) {
  if (!selectedProduct) return;

  productCards.forEach((card) => {
    const productName = card.querySelector(".small-btn")?.dataset.product || "";
    const isSelected = productName === selectedProduct;
    card.classList.toggle("is-selected", isSelected);
  });
}

if (productSelect) {
  productSelect.addEventListener("change", () => {
    syncSelectedProduct(productSelect.value.trim());
  });

  document.querySelectorAll("[data-product]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedProduct = btn.dataset.product?.trim();
      if (!selectedProduct) return;

      productSelect.value = selectedProduct;
      syncSelectedProduct(selectedProduct);

      const commanderSection = document.getElementById("commander");
      if (commanderSection) {
        commanderSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  syncSelectedProduct(productSelect.value.trim());
}

if (qtyInput) {
  qtyInput.addEventListener("change", updateTotal);
  updateTotal();
}

if (orderForm) {
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const addressInput = document.getElementById("address");

    const name = nameInput ? nameInput.value.trim() : "";
    const city = cityInput ? cityInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const product = productSelect ? productSelect.value.trim() : "";
    const color = colorInput ? colorInput.value.trim() : "";
    const qty = qtyInput ? qtyInput.value.trim() : "";

    if (!name || !city || !address || !product || !color || !qty) {
      const firstInvalidField = [nameInput, cityInput, addressInput, productSelect, colorInput, qtyInput].find(Boolean);
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    const total = getBundleTotal(qty);
    const message = `Bonjour TI Brothers 👋

Je veux commander :
• Modèle : ${product}
• Couleur : ${color}
• Quantité : ${qty}
• Total : ${total} DH

Nom : ${name}
Ville : ${city}
Adresse : ${address}

Merci !`;

    window.open("https://wa.me/212640186093?text=" + encodeURIComponent(message), "_blank");
  });
}
