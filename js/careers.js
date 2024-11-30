// Careers Data
const jobs = [
    {
        title: "Barista",
        location: "Adelaide, SA",
        description: "Join our coffee team and create amazing beverages while delivering excellent customer service.",
        requirements: [
            "Previous barista experience is a plus.",
            "Friendly and professional demeanor.",
            "Willingness to learn and grow."
        ]
    },
    {
        title: "Shift Manager",
        location: "Adelaide, SA",
        description: "Lead a dynamic team during shifts, ensuring smooth operations and outstanding service.",
        requirements: [
            "Experience in team management.",
            "Strong leadership skills.",
            "Passion for coffee and hospitality."
        ]
    }
];

// Populate Job Listings
const jobListings = document.getElementById('job-listings');

jobs.forEach((job) => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');

    jobCard.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800">${job.title}</h3>
        <p class="text-gray-600">${job.location}</p>
        <p class="mt-4">${job.description}</p>
        <ul class="mt-4 text-sm text-gray-600">
            ${job.requirements.map((req) => `<li>• ${req}</li>`).join('')}
        </ul>
    `;

    jobListings.appendChild(jobCard);
});

// Populate Position Dropdown
const positionDropdown = document.getElementById('position');
jobs.forEach((job) => {
    const option = document.createElement('option');
    option.value = job.title;
    option.textContent = job.title;
    positionDropdown.appendChild(option);
});

// Form Submission
const form = document.getElementById('application-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const message = document.getElementById('message').value;

    alert(`Thank you, ${name}! Your application for ${position} has been submitted.`);
    form.reset();
});
