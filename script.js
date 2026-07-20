/* ==========================================================
 NOSTALGIA ARCADE
 SCRIPT.JS v3.1
========================================================== */

/* ==========================================================
 CONFIGURACIÓN
========================================================== */

const LAST_UPDATE = "20 de julio de 2026";

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
 CONTADOR SUPERIOR
========================================================== */

function updateGameCounter() {

    if (!gameCounter) return;

    const total = getFilteredGames().length;

    // Quitar colores anteriores
   gameCounter.classList.remove(
  "naranja",
  "amarillo",
  "rojo",
  "azul",
  "verde",
  "morado",
  "blanco"
);

    if (currentCategory === "Todos") {

        gameCounter.classList.add("naranja");

        gameCounter.textContent =
            `🎮 ${total} Portables disponibles`;

    } else {

        // Añadir el color correspondiente
        gameCounter.classList.add(getCategoryClass(currentCategory));

        gameCounter.textContent =
            `🎮 ${total} juegos de ${currentCategory}`;

    }
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

    updateGameCounter();

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

renderGames();

/* ==========================================================
 PROTECCIÓN WEB
========================================================== */

(() => {

    document.addEventListener("contextmenu", e => e.preventDefault());

    document.addEventListener("selectstart", e => e.preventDefault());

    document.addEventListener("dragstart", e => {
        if (e.target.tagName === "IMG") e.preventDefault();
    });

    document.addEventListener("copy", e => e.preventDefault());

    document.addEventListener("keydown", e => {

        const key = e.key.toUpperCase();

        if (e.key === "F12") e.preventDefault();

        if (e.ctrlKey && key === "U") e.preventDefault();

        if (e.ctrlKey && e.shiftKey && key === "I") e.preventDefault();

        if (e.ctrlKey && e.shiftKey && key === "J") e.preventDefault();

        if (e.ctrlKey && e.shiftKey && key === "C") e.preventDefault();

    });

})();
