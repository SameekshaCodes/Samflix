const API_KEY = "f98efc29"; // Replace this with your OMDb API Key

const trendingTitles = ["Barbie", "Oppenheimer", "Inception", "Avengers", "Titanic"];
const topRatedTitles = ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction"];
const upcomingTitles = ["Dune: Part Two", "Deadpool 3", "Wonka", "Napoleon"];

function loadSection(titles, sectionId) {
  titles.forEach(title => fetchMovie(title, sectionId));
}

function fetchMovie(title, sectionId) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") displayMovie(data, sectionId);
    });
}

function displayMovie(movie, sectionId) {
  const container = document.getElementById(sectionId);

  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.innerHTML = `
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}" alt="${movie.Title}" />
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Genre}</p>
      <p>⭐ ${movie.imdbRating}</p>
    </div>
  `;
  container.appendChild(card);
}

// Load movies
loadSection(trendingTitles, "trending");
loadSection(topRatedTitles, "top-rated");
loadSection(upcomingTitles, "upcoming");

// Search functionality
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (query !== "") {
      document.getElementById("trending").innerHTML = "";
      fetchMovie(query, "trending");
    }
  }
});
