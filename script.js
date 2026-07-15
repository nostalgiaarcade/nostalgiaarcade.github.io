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

/* ==========================================================
   PROTECCIÓN WEB - NOSTALGIA ARCADE
========================================================== */

(() => {

    // Bloquear menú contextual (botón derecho)
    document.addEventListener("contextmenu", e => {
        e.preventDefault();
    });

    // Bloquear selección de texto
    document.addEventListener("selectstart", e => {
        e.preventDefault();
    });

    // Bloquear arrastrar imágenes
    document.addEventListener("dragstart", e => {
        if (e.target.tagName === "IMG") {
            e.preventDefault();
        }
    });

    // Bloquear copiar
    document.addEventListener("copy", e => {
        e.preventDefault();
    });

    // Bloquear atajos habituales
    document.addEventListener("keydown", e => {

        const key = e.key.toUpperCase();

        // F12
        if (e.key === "F12") {
            e.preventDefault();
        }

        // Ctrl + U
        if (e.ctrlKey && key === "U") {
            e.preventDefault();
        }

        // Ctrl + Shift + I
        if (e.ctrlKey && e.shiftKey && key === "I") {
            e.preventDefault();
        }

        // Ctrl + Shift + J
        if (e.ctrlKey && e.shiftKey && key === "J") {
            e.preventDefault();
        }

        // Ctrl + Shift + C
        if (e.ctrlKey && e.shiftKey && key === "C") {
            e.preventDefault();
        }

    });

})();
