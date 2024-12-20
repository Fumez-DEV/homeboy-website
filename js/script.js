document.addEventListener("DOMContentLoaded", () => {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    // Fetch product details from URL parameters
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

    // Set dynamic page title based on product name
    if (productName) {
        document.title = `${productName} - Homeboy Coffee Shop`;
    }

    // Populate product details
    const productTitle = document.getElementById("product-title");
    const productPriceElem = document.getElementById("product-price");
    const productDescriptionElem = document.getElementById("product-description");
    const mainImage = document.getElementById("main-image");
    const thumbnailGrid = document.getElementById("thumbnail-grid");
    const grindOptionsElem = document.getElementById("grind-options");
    const grindList = document.getElementById("grind-list");

    if (productTitle) productTitle.innerText = productName || "Product Name";
    if (productPriceElem) productPriceElem.innerText = productPrice || "$0.00";
    if (productDescriptionElem)
        productDescriptionElem.innerText = productDescription || "Product description goes here.";

    if (mainImage && productImages.length > 0) {
        mainImage.src = productImages[0];
    }

    if (thumbnailGrid && productImages.length > 0) {
        productImages.forEach((image) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = image;
            thumbnail.className = "thumbnail rounded-lg cursor-pointer";
            thumbnail.addEventListener("click", () => {
                if (mainImage) mainImage.src = image;
            });
            thumbnailGrid.appendChild(thumbnail);
        });
    }

    if (grindOptions.length > 0 && grindOptionsElem && grindList) {
        grindOptions.forEach((grind) => {
            const grindItem = document.createElement("li");
            grindItem.innerText = grind;
            grindList.appendChild(grindItem);
        });
        grindOptionsElem.classList.remove("hidden");
    }

    // Add to Cart Button
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function () {
            const selectedGrind = grindList ? grindList.value || "None" : "None";

            // Prepare product details
            const product = {
                name: productName || "Product Name",
                price: productPrice || "$0.00",
                grind: selectedGrind,
                image: productImages[0] || "",
            };

            // Add product to cart
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.name} added to cart!`);
        });
    }
});
