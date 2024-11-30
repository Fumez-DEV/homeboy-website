
// Load Header
fetch('header')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Load Footer
fetch('footer')
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
document.getElementById("product-title").innerText = productName || "Product Name";
document.getElementById("product-price").innerText = productPrice || "$0.00";
document.getElementById("product-description").innerText = productDescription || "Product description goes here.";

const mainImage = document.getElementById("main-image");
if (productImages.length > 0) {
    mainImage.src = productImages[0];
}

const thumbnailGrid = document.getElementById("thumbnail-grid");
productImages.forEach(image => {
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
    const grindList = document.getElementById("grind-list");
    grindOptions.forEach(grind => {
        const grindItem = document.createElement("li");
        grindItem.innerText = grind;
        grindList.appendChild(grindItem);
    });
    document.getElementById("grind-options").classList.remove("hidden");
}

// Add to Cart Button
const addToCartBtn = document.getElementById("add-to-cart-btn");
addToCartBtn.addEventListener("click", function () {
    alert(`${productName || "Product"} added to cart!`);
});

// Navigate to Product Page
function navigateToProduct(name, price, description, images, grinds) {
    const url = new URL('product-page.html', window.location.origin); // Ensure .html extension is added
    url.searchParams.append('name', name);
    url.searchParams.append('price', price);
    url.searchParams.append('description', description);

    images.split(',').forEach((image, index) => {
        url.searchParams.append(`image${index}`, image);
    });

    if (grinds) {
        grinds.split(',').forEach((grind, index) => {
            url.searchParams.append(`grind${index}`, grind);
        });
    }

    window.location.href = url.href;
}
