document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer dynamically
    fetch("header")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("footer")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");

    function renderOrderSummary() {
        orderSummary.innerHTML = "";
        if (cartItems.length === 0) {
            orderSummary.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        let total = 0;
        cartItems.forEach(item => {
            total += parseFloat(item.price.replace("$", ""));
            const itemRow = document.createElement("div");
            itemRow.className = "flex justify-between mb-2";
            itemRow.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
            `;
            orderSummary.appendChild(itemRow);
        });

        const totalRow = document.createElement("div");
        totalRow.className = "flex justify-between font-bold border-t pt-2";
        totalRow.innerHTML = `
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        `;
        orderSummary.appendChild(totalRow);
    }

    renderOrderSummary();

    // Handle payment method selection
    const paymentOptions = document.querySelectorAll("input[name='payment-method']");
    const paymentDetails = {
        "credit-card": document.getElementById("credit-card-details"),
        "paypal": document.getElementById("paypal-details"),
        "google-pay": document.getElementById("google-pay-details"),
    };

    paymentOptions.forEach(option => {
        option.addEventListener("change", (event) => {
            const selectedMethod = event.target.value;

            // Show the selected method's details and hide others
            Object.keys(paymentDetails).forEach(method => {
                if (method === selectedMethod) {
                    paymentDetails[method].classList.remove("hidden");
                } else {
                    paymentDetails[method].classList.add("hidden");
                }
            });
        });
    });

    // Handle form submission
    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", event => {
        event.preventDefault();

        // Get selected payment method
        const selectedPaymentMethod = document.querySelector("input[name='payment-method']:checked").value;

        if (selectedPaymentMethod === "paypal") {
            alert("Redirecting to PayPal...");
            // Redirect logic for PayPal
            window.location.href = "https://www.paypal.com/checkout";
        } else if (selectedPaymentMethod === "google-pay") {
            alert("Redirecting to Google Pay...");
            // Redirect logic for Google Pay
            window.location.href = "https://pay.google.com";
        } else {
            alert("Thank you for your order! Payment processed via Credit/Debit Card.");
            localStorage.removeItem("cart");
            window.location.href = "index";
        }
    });
});
