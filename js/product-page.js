// Function to add a product to the cart and save it in localStorage
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Function to fetch and populate product details
document.addEventListener("DOMContentLoaded", () => {
    // Fetch Header and Footer
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

    // Get product details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("name");
    const productPrice = urlParams.get("price");
    const productDescription = urlParams.get("description");

    const productImages = [];
    const grindOptions = [];

    // Extract images and grind options from URL parameters
    urlParams.forEach((value, key) => {
        if (key.startsWith("image")) {
            productImages.push(value);
        }
        if (key.startsWith("grind")) {
            grindOptions.push(value);
        }
    });

    // Populate product details in the DOM
    document.getElementById("product-title").innerText = productName || "Product Name";
    document.getElementById("product-price").innerText = productPrice || "$0.00";
    document.getElementById("product-description").innerText =
        productDescription || "Product description goes here.";

    const mainImage = document.getElementById("main-image");
    if (productImages.length > 0) {
        mainImage.src = productImages[0];
    }

    const thumbnailGrid = document.getElementById("thumbnail-grid");
    productImages.forEach((image) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = image;
        thumbnail.className = "thumbnail rounded-lg cursor-pointer";
        thumbnail.addEventListener("click", () => {
            mainImage.src = image;
        });
        thumbnailGrid.appendChild(thumbnail);
    });

    // Display grind options if available
    if (grindOptions.length > 0) {
        const grindSelect = document.getElementById("grind-select");
        grindOptions.forEach((grind) => {
            const option = document.createElement("option");
            option.value = grind;
            option.innerText = grind;
            grindSelect.appendChild(option);
        });
        document.getElementById("grind-options").classList.remove("hidden");
    }

    // Handle Add to Cart button click
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        const selectedGrind = document.getElementById("grind-select").value || "None";

        // Create product object
        const product = {
            name: productName || "Product Name",
            price: productPrice || "$0.00",
            grind: selectedGrind,
            image: productImages[0] || ""
        };

        // Add product to cart
        addToCart(product);
    });
});
