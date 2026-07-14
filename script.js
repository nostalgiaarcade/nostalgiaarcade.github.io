/* ======================================
   NOSTALGIA ARCADE
   script.js
====================================== */

// Contenedores
const gamesContainer = document.getElementById("games");
const featuredContainer = document.getElementById("featuredGame");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const gameCounter = document.getElementById("gameCounter");

let currentCategory = "Todos";
let currentSearch = "";

/* ======================================
   Juego destacado
====================================== */
function renderFeatured() {
    if (games.length === 0) return;

    const game = games[0];

    featuredContainer.innerHTML = `
    <div class="featured">
        <img src="${game.imagen}" alt="${game.nombre}">

        <div class="featured-info">
            <h2>${game.nombre}</h2>

            <p>${game.descripcion}</p>

            <p><strong>Categoría:</strong> ${game.categoria}</p>

            <p><strong>Jugadores:</strong> ${game.jugadores}</p>

            <a
                class="download"
                href="${game.link}"
                target="_blank">
                Descargar
            </a>
        </div>
    </div>
    `;
}

/* ======================================
   Catálogo
====================================== */
function renderGames() {

    gamesContainer.innerHTML = "";

    // Mostrar u ocultar el juego destacado
    if (currentSearch !== "" || currentCategory !== "Todos") {
        featuredContainer.style.display = "none";
    } else {
        featuredContainer.style.display = "block";
    }

    const filteredGames = games.filter(game => {

        const categoryOk =
            currentCategory === "Todos" ||
            game.categoria === currentCategory;

        const textOk =
            game.nombre
                .toLowerCase()
                .includes(currentSearch.toLowerCase());

        return categoryOk && textOk;

    });

    gameCounter.textContent = filteredGames.length;

    if (filteredGames.length === 0) {

        gamesContainer.innerHTML = `
        <p style="
            text-align:center;
            grid-column:1/-1;
            font-size:22px;
            color:#999;">
            No se encontraron juegos.
        </p>
        `;

        return;
    }

    filteredGames.forEach(game => {

        gamesContainer.innerHTML += `
        <div class="card">

            <img
                src="${game.imagen}"
                alt="${game.nombre}">

            <div class="card-content">

                <h3>${game.nombre}</h3>

                <p class="game-category">
                    ${game.categoria}
                </p>

                <p class="players">
                    👥 ${game.jugadores}
                </p>

                <a
                    class="download"
                    href="${game.link}"
                    target="_blank">
                    Descargar
                </a>

            </div>

        </div>
        `;

    });

}

/* ======================================
   Buscador
====================================== */
searchInput.addEventListener("input", function () {

    currentSearch = this.value;

    renderGames();

});

/* ======================================
   Categorías
====================================== */
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory = button.dataset.category;

        renderGames();

    });

});

/* ======================================
   Inicializar
====================================== */

renderFeatured();
renderGames();
