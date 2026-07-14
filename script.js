/* ======================================
   NOSTALGIA ARCADE v2.0
====================================== */

// Elementos
const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const gameCounter = document.getElementById("gameCounter");

// Estado
let currentCategory = "Todos";
let currentSearch = "";

/* ======================================
   Colores categorías
====================================== */

function getCategoryClass(categoria) {

    switch (categoria) {

        case "Acción":
            return "amarillo";

        case "Peleas":
            return "rojo";

        case "Aviones":
            return "azul";

        case "Deportes":
            return "verde";

        case "Puzles":
            return "morado";

        default:
            return "blanco";
    }

}

/* ======================================
   Pintar juegos
====================================== */

function renderGames() {

    const filteredGames = games.filter(game => {

        const categoryOk =
            currentCategory === "Todos" ||
            game.categoria === currentCategory;

        const searchOk =
            game.nombre
                .toLowerCase()
                .includes(currentSearch.toLowerCase());

        return categoryOk && searchOk;

    });

    gameCounter.textContent = filteredGames.length;

    if (!filteredGames.length) {

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

    let html = "";

    filteredGames.forEach(game => {

        html += `

        <div class="card">

            <img
                src="${game.imagen}"
                alt="${game.nombre}">

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
                    target="_blank">

                    Descargar

                </a>

            </div>

        </div>

        `;

    });

    gamesContainer.innerHTML = html;

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
   Inicio
====================================== */

renderGames();
