// Fetch Loyalty Benefits
fetch("assets/loyalty.json")
    .then((response) => response.json())
    .then((data) => {
        // Populate Benefits
        const benefitsList = document.querySelector(".benefits-list");
        data.benefits.forEach((benefit) => {
            const li = document.createElement("li");
            li.textContent = benefit;
            benefitsList.appendChild(li);
        });

        // Populate Steps
        const stepsContainer = document.querySelector(".steps");
        data.steps.forEach((step, index) => {
            const stepCard = document.createElement("div");
            stepCard.classList.add("step-card");

            stepCard.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Step ${index + 1}</h3>
                <p class="text-gray-600">${step}</p>
            `;

            stepsContainer.appendChild(stepCard);
        });
    });

// Handle Sign-Up Form Submission
const form = document.getElementById("signup-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    alert(`Thank you, ${name}! You have successfully joined the loyalty program.`);
    form.reset();
});
