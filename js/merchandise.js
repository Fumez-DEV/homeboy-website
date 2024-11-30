// Merchandise data
const merchandise = {
    hats: [
        {
            name: "Almond Milk Hat",
            images: [
                "images/merchandise/hats/almond-milk-hat/almond-milk-hat.png",
                "images/merchandise/hats/almond-milk-hat/almond-milk-hat2.png"
            ],
            price: "$25",
            description: `
                - Almond milk >
                - Front screen print
                - Side embroidery
                `,
            availability: "Sold Out" // Adding availability status
        },
        {
            name: "Lactose Tolerant Hat",
            images: [
                "images/merchandise/hats/lactose-tolerant-hat/lactose-tolerant-hat.png",
                "images/merchandise/hats/lactose-tolerant-hat/lactose-tolerant-hat2.png"
            ],
            price: "$25",
            description: `
                - Tolerant to lactose 💪
                - Front screen print
                - Side embroidery
                - One size fits all
            `,
        },
        {
            name: "Oat Milk Hat",
            images: [
                "images/merchandise/hats/oat-milk-hat/oat-milk-hat.png",
                "images/merchandise/hats/oat-milk-hat/oat-milk-hat2.png"
            ],
            price: "$25",
            description: `
                - Oat milk >>
                - Front screen print
                - Side embroidery
            `
        },
        {
            name: "Soy Boy Hat",
            images: [
                "images/merchandise/hats/soy-boy-hat/soy-boy-hat.png",
                "images/merchandise/hats/soy-boy-hat/soy-boy-hat2.png"
            ],
            price: "$25",
            description: `
                - Soy boys rule 💪
                - Front screen print
                - Side embroidery
            `
        }
    ],    
    hoodies: [
        {
            name: "SZN-2 Hood",
            images: [
                "images/merchandise/hoodies/SZN-2-HOOD/szn-2-hood1.png",
                "images/merchandise/hoodies/SZN-2-HOOD/szn-2-hood2.png"
            ],
            price: "$45",
            availability: "Sold Out" // Adding availability status
        },
        {
            name: "The Staple Hood",
            images: [
                "images/merchandise/hoodies/the-staple-hood/the-staple-hood1.png",
                "images/merchandise/hoodies/the-staple-hood/the-staple-hood2.png"
            ],
            price: "$45",
            availability: "Sold Out" // Adding availability status
        }
    ],
    homeBlend: [
        {
            name: "1kg Home Blend",
            images: [
                "images/merchandise/home-blend/1kg/1kg-1.png",
                "images/merchandise/home-blend/1kg/1kg-2.png"
            ],
            price: "$20",
            grinds: ["Beans", "Aeropress", "Domestic Espresso", "Commercial Espresso", "Plunger", "Mokka Pot", "V60"],
            description: `
                Bringing homeboy, home. 
                
                A perfect all-rounder. 
                A great blend for beginners and coffee nerds alike.
                
                Roasted by our friends at Limpopo Project - Brisbane, Queensland.
                
                This blend is crafted to taste great as an espresso but really shines through in milk-based coffees and holds up pretty well as a cold brew.
                
                It is a medium roast with a syrupy body and medium acidity.
                
                It is comprised of Brazil, Indonesia, and Colombia.
                
                The recommended espresso extraction is 20-21g in with an extraction between 32-35 sec and a yield of 35-40 ml.
            `
        },
        {
            name: "500g Home Blend",
            images: [
                "images/merchandise/home-blend/500g/500g-1.png",
                "images/merchandise/home-blend/500g/500g-2.png"
            ],
            price: "$15",
            grinds: ["Beans", "Aeropress", "Domestic Espresso", "Commercial Espresso", "Plunger", "Mokka Pot", "V60"],
            description: `
                Bringing homeboy, home. 
                
                A perfect all-rounder. 
                A great blend for beginners and coffee nerds alike.
                
                Roasted by our friends at Limpopo Project - Brisbane, Queensland.
                
                This blend is crafted to taste great as an espresso but really shines through in milk-based coffees and holds up pretty well as a cold brew.
                
                It is a medium roast with a syrupy body and medium acidity.
                
                It is comprised of Brazil, Indonesia, and Colombia.
                
                The recommended espresso extraction is 20-21g in with an extraction between 32-35 sec and a yield of 35-40 ml.
            `
        },
        {
            name: "250g Home Blend",
            images: [
                "images/merchandise/home-blend/250g/250g-1.png",
                "images/merchandise/home-blend/250g/250-2.png"
            ],
            price: "$10",
            grinds: ["Beans", "Aeropress", "Domestic Espresso", "Commercial Espresso", "Plunger", "Mokka Pot", "V60"],
            description: `
                Bringing homeboy, home. 
                
                A perfect all-rounder. 
                A great blend for beginners and coffee nerds alike.
                
                Roasted by our friends at Limpopo Project - Brisbane, Queensland.
                
                This blend is crafted to taste great as an espresso but really shines through in milk-based coffees and holds up pretty well as a cold brew.
                
                It is a medium roast with a syrupy body and medium acidity.
                
                It is comprised of Brazil, Indonesia, and Colombia.
                
                The recommended espresso extraction is 20-21g in with an extraction between 32-35 sec and a yield of 35-40 ml.
            `
        }
    ]   
};


// Function to render products for a category
function renderProducts(category, elementId) {
    const container = document.querySelector(`#${elementId} .product-grid`);
    merchandise[category].forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        
        // Add "sold-out" class if product is unavailable
        if (product.availability === "Sold Out") {
            productCard.classList.add("sold-out");
        }

        // Create product card HTML
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.images[0]}" alt="${product.name}" 
                    onmouseover="this.src='${product.images[1]}'" 
                    onmouseout="this.src='${product.images[0]}'">
                ${product.availability === "Sold Out" ? '<div class="sold-out-overlay">Sold Out</div>' : ""}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                ${product.grinds ? renderGrindList(product.grinds) : ""}
                <button class="product-button" ${product.availability === "Sold Out" ? "disabled" : ""}>
                    ${product.availability === "Sold Out" ? "Unavailable" : "Add to Cart"}
                </button>
            </div>
        `;

        // Add click event listener for redirecting to product page
        productCard.addEventListener("click", () => {
            if (product.availability !== "Sold Out") {
                redirectToProductPage(product);
            }
        });

        // Append the product card to the container
        container.appendChild(productCard);
    });
}

// Function to render grind list
function renderGrindList(grinds) {
    const grindListHTML = `
        <ul class="grind-list">
            ${grinds.map(grind => `<li>${grind}</li>`).join("")}
        </ul>
    `;
    return grindListHTML;
}

// Function to redirect to product page with product details
function redirectToProductPage(product) {
    const url = new URL("product-page.html", window.location.origin);
    url.searchParams.append("id", product.id);
    url.searchParams.append("name", product.name);
    url.searchParams.append("price", product.price);
    url.searchParams.append("description", product.description);
    product.images.forEach((image, index) => {
        url.searchParams.append(`image${index}`, image);
    });
    if (product.grinds) {
        product.grinds.forEach((grind, index) => {
            url.searchParams.append(`grind${index}`, grind);
        });
    }
    window.location.href = url;
}

// Render products for all categories
renderProducts("hats", "hats");
renderProducts("hoodies", "hoodies");
renderProducts("homeBlend", "home-blend");
