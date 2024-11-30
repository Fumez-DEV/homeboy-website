// Fetch and render events dynamically
const eventsContainer = document.getElementById('events');

// Sample events data
const eventsData = [
    {
        title: "Latte Art Workshop",
        date: "2024-12-10",
        description: "Learn the art of creating beautiful latte designs with our expert baristas.",
        image: "images/latte.jpg",
        link: "#"
    },
    {
        title: "Open Mic Night",
        date: "2024-12-15",
        description: "Showcase your talent or enjoy performances by local artists.",
        image: "images/open-mic.jpg",
        link: "#"
    },
    {
        title: "Holiday Coffee Tasting",
        date: "2024-12-20",
        description: "Sample our special holiday blends and discover your new favorite.",
        image: "images/coffee-tasting.jpg",
        link: "#"
    }
];

// Render events
eventsData.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <a href="${event.link}">Learn More</a>
    `;
    eventsContainer.appendChild(eventCard);
});
