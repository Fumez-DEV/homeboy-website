// Load reviews dynamically from reviews.json
const reviewsContainer = document.getElementById('reviews');
const loadMoreButton = document.getElementById('load-more');
let currentIndex = 0;
const reviewsPerPage = 3;

// Fetch reviews from the JSON file
fetch('assets/reviews.json')
    .then(response => response.json())
    .then(data => {
        const reviews = data.reviews;

        // Function to render reviews
        const renderReviews = () => {
            const nextReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);
            nextReviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <h3>${review.name}</h3>
                    <p>${review.text}</p>
                `;
                reviewsContainer.appendChild(reviewCard);
            });

            currentIndex += reviewsPerPage;

            // Hide the button if all reviews are loaded
            if (currentIndex >= reviews.length) {
                loadMoreButton.style.display = 'none';
            }
        };

        // Initial render
        renderReviews();

        // Load more reviews on button click
        loadMoreButton.addEventListener('click', renderReviews);
    })
    .catch(error => console.error('Error loading reviews:', error));
