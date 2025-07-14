const API_KEY = "e10794d4";
const API_URL = `https://www.omdbapi.com/?apikey=e10794d4&s=`;
const API_URL_SEARCH = `https://www.omdbapi.com/?apikey=e10794d4&i=`;

const searchInput = document.getElementById("search_input");
const cardContainer = document.querySelector(".movie-cards");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchMovies(query);
});

async function fetchMovies(query) {
    try {
        const resp = await fetch(API_URL + query);
        const data = await resp.json();
        cardContainer.innerHTML = "";

        if (data.Response === "True" && data.Search) {
            renderMovies(data.Search);
        } else {
            showMessage("No movies found.");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        showMessage("Something went wrong. Please try again.");
    }
}

function showMessage(msg) {
    cardContainer.innerHTML = `<div class="no-results">${msg}</div>`;
}

function renderMovies(movies) {
    movies.forEach(async (movie) => {
        const res = await fetch(API_URL_SEARCH + movie.imdbID);
        const details = await res.json();
        displayMovie(details);
    });
}

function displayMovie(movie) {
    const poster = movie.Poster !== "N/A"
        ? movie.Poster
        : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
        <div class="card">
            <img src="${poster}" alt="Poster" width="300" height="300"
     onerror="this.src='https://dummyimage.com/300x300/cccccc/000000&text=No+Image';" />

            <div class="movie-description">
                <span class="movie-title"><b>Title:</b> <span class="value">${movie.Title}</span></span><br>
                <span class="movie-title"><b>Rating:</b> <span class="value">${movie.imdbRating}</span></span><br>
                <span class="movie-title"><b>Director:</b> <span class="value">${movie.Director}</span></span><br>
                <span class="movie-title"><b>Released:</b> <span class="value">${movie.Released}</span></span><br>
                <span class="movie-title"><b>Genre:</b> <span class="value">${movie.Genre}</span></span>
            </div>
        </div>
    `;

    cardContainer.appendChild(movieCard);

   
}


    
   

