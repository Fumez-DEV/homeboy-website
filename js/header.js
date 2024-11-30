document.addEventListener("DOMContentLoaded", () => {
    // Function to update the cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = document.getElementById("cart-count");

        if (cart.length > 0) {
            cartCount.textContent = cart.length; // Set the number of items in the cart
            cartCount.classList.remove("hidden"); // Ensure the count badge is visible
        } else {
            cartCount.textContent = "0"; // Default to 0 if the cart is empty
            cartCount.classList.add("hidden"); // Optionally hide the badge if no items
        }
    }

    // Update the cart count on page load
    updateCartCount();

    // Listen for changes to localStorage (cart updates from other pages)
    window.addEventListener("storage", updateCartCount);
});
