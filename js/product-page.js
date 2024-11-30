// Fetch product details
const productDescriptionFull = document.getElementById("product-description-full");
const productDescriptionPreview = document.getElementById("product-description-preview");
const toggleDescriptionBtn = document.getElementById("toggle-description-btn");

// Toggle Read More / Read Less
toggleDescriptionBtn.addEventListener("click", function () {
    const isHidden = productDescriptionFull.classList.contains("hidden");
    productDescriptionFull.classList.toggle("hidden", !isHidden);
    toggleDescriptionBtn.textContent = isHidden ? "Read Less" : "Read More";
});

// Fetch product details from query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productName = urlParams.get("name");
const productPrice = urlParams.get("price");
const productDescription = urlParams.get("description");

const productImages = [];
urlParams.forEach((value, key) => {
    if (key.startsWith("image")) {
        productImages.push(value);
    }
});

// Populate product details on the page
document.getElementById("product-title").innerText = productName || "Product Name";
document.getElementById("product-price").innerText = productPrice || "$0.00";
document.getElementById("product-description-preview").innerText = productDescription?.split('\n')[0] || "Description coming soon.";
if (productDescription?.split('\n').length > 1) {
    productDescriptionFull.innerHTML = productDescription.split('\n').slice(1).join('<br>');
}

// Main Image and Thumbnail Logic
const mainImage = document.getElementById("main-image");
if (productImages.length > 0) {
    mainImage.src = productImages[0];
}

const thumbnailGrid = document.querySelector(".thumbnail-grid");
productImages.forEach(image => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image;
    thumbnail.className = "thumbnail rounded-lg cursor-pointer";
    thumbnail.addEventListener("click", () => {
        mainImage.src = image;
    });
    thumbnailGrid.appendChild(thumbnail);
});

// Add to Cart Button
const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', function () {
    alert(`${productName || "Product"} added to cart!`);
});

// Function to toggle read more/less
function toggleReadMore(button, productId) {
    const fullText = document.getElementById(`full-description-${productId}`);
    const truncatedText = document.getElementById(`truncated-description-${productId}`);
    
    if (fullText.classList.contains("hidden")) {
        fullText.classList.remove("hidden");
        truncatedText.classList.add("hidden");
        button.innerText = "Read Less";
    } else {
        fullText.classList.add("hidden");
        truncatedText.classList.remove("hidden");
        button.innerText = "Read More";
    }
}

// Function to render product description with toggle
function renderDescription(description, productId) {
    const truncated = description.split("\n\n").slice(0, 1).join("\n\n");
    const full = description;

    return `
        <p id="truncated-description-${productId}" class="text-gray-600">${truncated}</p>
        <p id="full-description-${productId}" class="text-gray-600 hidden">${full}</p>
        <button class="text-blue-500 underline mt-2" onclick="toggleReadMore(this, '${productId}')">Read More</button>
    `;
}
