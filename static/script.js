// document.addEventListener('DOMContentLoaded', function() {
//     // Function to fetch a random movie from TMDB
//     function fetchRandomMovie(titleElement) {
//         // Use the provided TMDB API key
//         const apiKey = '66b309a9a99a994c040c6dca2a34d606';
//
//         // Make an API request to TMDB to get a random movie
//         fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
//             .then(response => response.json())
//             .then(data => {
//                 // Get a random movie from the response
//                 const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
//                 if (randomMovie) {
//                     // Update the recommendation item with the fetched movie data
//                     titleElement.textContent = randomMovie.title;
//                     titleElement.setAttribute('data-title', randomMovie.title);
//                     titleElement.setAttribute('data-distance', 'Random');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching movie:', error);
//             });
//     }
//
//     const recommendationItems = document.querySelectorAll('.recommendation-item');
//
//     recommendationItems.forEach(item => {
//         item.addEventListener('click', () => {
//             const titleElement = item.querySelector('.recommendation-title');
//             fetchRandomMovie(titleElement);
//         });
//     });
// });
//

document.querySelector('.btn-search').addEventListener('click', function () {
    let searchTerm = document.querySelector('input[type="text"]').value;

    if (searchTerm) {
        // Fetch the movie posters from TMDB API
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=66b309a9a99a994c040c6dca2a34d606&query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Display the movie posters in the scroll container
                let scrollContainer = document.querySelector('.scroll-container');
                scrollContainer.innerHTML = '';

                data.results.forEach(movie => {
                    let img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    img.alt = movie.title;
                    scrollContainer.appendChild(img);
                });
            });
    }
});

document.querySelector('.contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve the form data
    let formData = new FormData(event.target);

    // Send the form data to the server
    fetch('your_server_endpoint', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully');
            } else {
                alert('Error sending message');
            }
        });
});