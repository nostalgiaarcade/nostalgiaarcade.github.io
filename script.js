/* ==========================================================
   NOSTALGIA ARCADE
   SCRIPT.JS v3.0
========================================================== */

/* ==========================================================
   CONFIGURACIÓN
========================================================== */

const LAST_UPDATE = "15 de julio de 2026";

/* ==========================================================
   ELEMENTOS DEL DOM
========================================================== */

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const gameCounter = document.getElementById("gameCounter");

/* ==========================================================
   ESTADO
========================================================== */

let currentCategory = "Todos";
let currentSearch = "";

/* ==========================================================
   COLORES DE CATEGORÍA
========================================================== */

const categoryColors = {

    "Acción": "amarillo",
    "Peleas": "rojo",
    "Aviones": "azul",
    "Deportes": "verde",
    "Puzles": "morado"

};

function getCategoryClass(category) {

    return categoryColors[category] || "blanco";

}

/* ==========================================================
   CONTADOR SUPERIOR
========================================================== */

function updateGameCounter() {

    if (!gameCounter) return;

    gameCounter.textContent = `🎮 ${games.length} Portables disponibles`;

}

/* ==========================================================
   FILTRADO
========================================================== */

function getFilteredGames() {

    return games.filter(game => {

        const categoryMatch =
            currentCategory === "Todos" ||
            game.categoria === currentCategory;

        const searchMatch =
            game.nombre
                .toLowerCase()
                .includes(currentSearch.toLowerCase());

        return categoryMatch && searchMatch;

    });

}

/* ==========================================================
   TARJETA
========================================================== */

function createGameCard(game) {

    return `
        <article class="card">

            <img
                src="${game.imagen}"
                alt="${game.nombre}"
                loading="lazy">

            <div class="card-content">

                <h3>${game.nombre}</h3>

                <p class="game-category ${getCategoryClass(game.categoria)}">
                    ${game.categoria}
                </p>

                <p class="game-date">
                    📅 ${game.fecha}
                </p>

                <p class="players">
                    👥 ${game.jugadores}
                </p>

                <a
                    class="download"
                    href="${game.link}"
                    target="_blank"
                    rel="noopener">

                    Descargar

                </a>

            </div>

        </article>
    `;

}

/* ==========================================================
   MENSAJE SIN RESULTADOS
========================================================== */

function renderEmptyMessage() {

    gamesContainer.innerHTML = `
        <p style="
            text-align:center;
            grid-column:1/-1;
            font-size:22px;
            color:#999;">
            No se encontraron juegos.
        </p>
    `;

}

/* ==========================================================
   RENDER
========================================================== */

function renderGames() {

    const filteredGames = getFilteredGames();

    if (!filteredGames.length) {

        renderEmptyMessage();
        return;

    }

    gamesContainer.innerHTML = filteredGames
        .map(createGameCard)
        .join("");

}

/* ==========================================================
   BUSCADOR
========================================================== */

function handleSearch(event) {

    currentSearch = event.target.value.trim();

    renderGames();

}

/* ==========================================================
   CATEGORÍAS
========================================================== */

function handleCategory(event) {

    categoryButtons.forEach(button =>
        button.classList.remove("active")
    );

    event.currentTarget.classList.add("active");

    currentCategory = event.currentTarget.dataset.category;

    renderGames();

}

/* ==========================================================
   EVENTOS
========================================================== */

searchInput.addEventListener("input", handleSearch);

categoryButtons.forEach(button => {

    button.addEventListener("click", handleCategory);

});

/* ==========================================================
   INICIO
========================================================== */

updateGameCounter();

renderGames();
