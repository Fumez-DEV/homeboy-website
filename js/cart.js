// Utility function to add product to cart
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger a storage event to update other tabs/pages
    window.dispatchEvent(new Event("storage"));
}


function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger a storage event to update other tabs/pages
    window.dispatchEvent(new Event("storage"));
}

// Render cart items and update total price
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const freeShippingNote = document.getElementById("free-shipping-note");

    if (!cartItemsContainer) return; // Prevent errors if not on the cart page

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "$0.00";
            freeShippingNote.classList.add("hidden");
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += parseFloat(item.price.replace("$", ""));
            const itemRow = document.createElement("div");
            itemRow.className = "flex justify-between items-center border-b py-2";
            itemRow.innerHTML = `
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded mr-4">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-gray-500 text-sm">Grind: ${item.grind}</p>
                    </div>
                </div>
                <p class="font-semibold">${item.price}</p>
                <button class="text-red-500 hover:underline" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemRow);
        });

        // Update Total Price
        totalPriceElement.textContent = `$${total.toFixed(2)}`;

        // Show Free Shipping Note if total exceeds $50
        if (total >= 50) {
            freeShippingNote.classList.remove("hidden");
        } else {
            freeShippingNote.classList.add("hidden");
        }

        // Add event listeners for remove buttons
        document.querySelectorAll('[data-index]').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();
});

