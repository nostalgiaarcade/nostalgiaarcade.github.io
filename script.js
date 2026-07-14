/* ==========================================================
   NOSTALGIA ARCADE v2.0
   script.js
   ========================================================== */

/* ===========================
   ELEMENTOS DEL DOM
=========================== */

const gamesContainer = document.getElementById("games");
const featuredContainer = document.getElementById("featuredGame");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const gameCounter = document.getElementById("gameCounter");


/* ===========================
   VARIABLES
=========================== */

let currentCategory = "Todos";
let currentSearch = "";


/* ===========================
   ICONOS DE CATEGORÍA
=========================== */

const categoryIcons = {

    "Acción":"accion",
    "Peleas":"peleas",
    "Aviones":"aviones",
    "Deportes":"deportes",
    "Puzles":"puzles",
    "Todos":"todos"

};


/* ===========================
   JUEGO DESTACADO
=========================== */

function renderFeatured(){

    if(games.length===0){

        featuredContainer.innerHTML="";

        return;

    }

    const game=games[0];

    const icon=categoryIcons[game.categoria];

    featuredContainer.innerHTML=`

    <div class="featured">

        <img
        src="${game.imagen}"
        alt="${game.nombre}">

        <div class="featured-info">

            <h2>${game.nombre}</h2>

            <div class="categoria">

                <img
                src="iconos/${icon}.png"
                alt="${game.categoria}">

                <span>${game.categoria}</span>

            </div>

            <p class="players">

                👥 ${game.jugadores} jugadores

            </p>

            <p class="fecha">

                📅 ${game.fecha}

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

}


/* ===========================
   FILTRAR JUEGOS
=========================== */

function getFilteredGames(){

    return games.filter(game=>{

        const categoriaOK=

            currentCategory==="Todos" ||

            game.categoria===currentCategory;

        const textoOK=

            game.nombre
            .toLowerCase()
            .includes(currentSearch.toLowerCase());

        return categoriaOK && textoOK;

    });

}/* ===========================
   MOSTRAR CATÁLOGO
=========================== */

function renderGames(){

    gamesContainer.innerHTML="";

    const filteredGames=getFilteredGames();

    gameCounter.textContent=filteredGames.length;

    if(filteredGames.length===0){

        gamesContainer.innerHTML=`

        <p style="
        grid-column:1/-1;
        text-align:center;
        font-size:22px;
        color:#999;
        ">

        No se encontraron juegos.

        </p>

        `;

        return;

    }

    filteredGames.forEach(game=>{

        const icon=categoryIcons[game.categoria];

        gamesContainer.innerHTML+=`

        <div class="card">

            <img
            src="${game.imagen}"
            alt="${game.nombre}">

            <div class="card-content">

                <h3>${game.nombre}</h3>

                <div class="categoria">

                    <img
                    src="iconos/${icon}.png"
                    alt="${game.categoria}">

                    <span>${game.categoria}</span>

                </div>

                <p class="players">

                    👥 ${game.jugadores} jugadores

                </p>

                <p class="fecha">

                    📅 ${game.fecha}

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


/* ===========================
   BUSCADOR
=========================== */

searchInput.addEventListener("input",()=>{

    currentSearch=searchInput.value;

    renderGames();

});


/* ===========================
   BOTONES DE CATEGORÍA
=========================== */

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentCategory=button.dataset.category;

        renderGames();

    });

});/* ===========================
   INICIALIZAR WEB
=========================== */

function init(){

    if(typeof games==="undefined"){

        console.error("No se ha encontrado games.js");

        return;

    }

    renderFeatured();

    renderGames();

}


/* ===========================
   INICIAR
=========================== */

init();
