/* ==========================================================
   NOSTALGIA ARCADE
   Funcionalidad de catálogo, enlaces y compartido
   ========================================================== */

const CONFIG = Object.freeze({
    DONATE_LINK: "https://www.paypal.com/donate/?hosted_button_id=XJSCL7BK6GJW6",
    SITE_URL: "https://nostalgiaarcade.es/",
    SHARE_TEXT: "Descubre Nostalgia Arcade"
});

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");
const gameCounter = document.getElementById("gameCounter");
const toast = document.getElementById("toast");

const categoryColors = {
    "Acción": "amarillo",
    Peleas: "rojo",
    Aviones: "azul",
    Deportes: "verde",
    Puzles: "morado"
};

const SHARE_PROVIDERS = {
    whatsapp: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    telegram: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: url => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: (url, text) => `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
};

let currentCategory = "Todos";
let currentSearch = "";
let toastTimer;

function getCategoryClass(category) {
    return categoryColors[category] || "blanco";
}

function getFilteredGames() {
    const normalizedSearch = currentSearch.toLocaleLowerCase();

    return games.filter(game => {
        const categoryMatch = currentCategory === "Todos" || game.categoria === currentCategory;
        const searchMatch = game.nombre.toLocaleLowerCase().includes(normalizedSearch);

        return categoryMatch && searchMatch;
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
    }[character]));
}

function shareIcon(name, path, url) {
    return `<a class="share-button" data-share="${name}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Compartir por ${name}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg></a>`;
}

function createShareButtons() {
    const projectUrl = CONFIG.SITE_URL;
    const sharedText = CONFIG.SHARE_TEXT;

    return [
        shareIcon("whatsapp", "M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.2.3 11.7c0 2.1.5 4.1 1.5 5.9L.1 24l6.6-1.7a11.7 11.7 0 0 0 5.4 1.3h.1c6.5 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6-3.4-8.2ZM12.1 21.6a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.3c-.3-.1-1.8-.9-2-1s-.4-.1-.6.1c-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.4-3.9-3.2-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.7.4s-1 1-1 2.5 1 2.9 1.1 3.1c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.8.6.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3Z", SHARE_PROVIDERS.whatsapp(projectUrl, sharedText)),
        shareIcon("telegram", "M21.7 3.2 18.4 20c-.2 1.2-.9 1.5-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.3L5.8 13.6 1 12.1c-1-.3-1-1 .2-1.5L20 3.3c.9-.3 1.7.2 1.7-.1Z", SHARE_PROVIDERS.telegram(projectUrl, sharedText)),
        shareIcon("facebook", "M14 8h3V4h-3c-3.3 0-6 2.7-6 6v2H5v4h3v8h4v-8h3l1-4h-4v-2c0-1.1.9-2 2-2Z", SHARE_PROVIDERS.facebook(projectUrl)),
        shareIcon("x", "M18.9 2H22l-6.8 7.8 8 10.2H17l-4.8-6.1L6.9 20H3.8l7.3-8.4L3.4 2h6.3l4.3 5.5L18.9 2Zm-1.1 16h1.7L8.8 3.9H7L17.8 18Z", SHARE_PROVIDERS.x(projectUrl, sharedText)),
        `<button class="share-button" type="button" data-share="copy" aria-label="Copiar enlace"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4C2.3 1 1 2.3 1 4v12h3V4h12V1Zm4 5H8c-1.7 0-3 1.3-3 3v12c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V9c0-1.7-1.3-3-3-3Zm0 15H8V9h12v12Z"></path></svg></button>`
    ].join("");
}

function createGameCard(game) {
    return `
        <article class="card">
            <img src="${escapeHtml(game.imagen)}" alt="${escapeHtml(game.nombre)}" loading="lazy">
            <div class="card-content">
                <h3>${escapeHtml(game.nombre)}</h3>
                <p class="game-category ${getCategoryClass(game.categoria)}">${escapeHtml(game.categoria)}</p>
                <p class="game-date">📅 ${escapeHtml(game.fecha)}</p>
                <p class="players">👥 ${escapeHtml(game.jugadores)}</p>
                <a class="download" href="${escapeHtml(game.link)}" target="_blank" rel="noopener">Descargar</a>
                <a class="donate" href="${CONFIG.DONATE_LINK}" target="_blank" rel="noopener">☕ Invítame a un café</a>
                <div class="share-section">
                    <p>Comparte este proyecto</p>
                    <div class="share-actions">${createShareButtons()}</div>
                </div>
            </div>
        </article>`;
}

function updateGameCounter() {
    if (!gameCounter) return;

    const total = getFilteredGames().length;
    gameCounter.classList.remove("amarillo", "rojo", "azul", "verde", "morado", "blanco", "naranja");
    gameCounter.classList.add(currentCategory === "Todos" ? "naranja" : getCategoryClass(currentCategory));
    gameCounter.textContent = currentCategory === "Todos"
        ? `🎮 ${total} Portables disponibles`
        : `🎮 ${total} juegos de ${currentCategory}`;
}

function renderEmptyMessage() {
    gamesContainer.innerHTML = '<p class="empty-message">No se encontraron juegos.</p>';
}

function renderGames() {
    const filteredGames = getFilteredGames();
    updateGameCounter();
    gamesContainer.innerHTML = filteredGames.length
        ? filteredGames.map(createGameCard).join("")
        : "";

    if (!filteredGames.length) renderEmptyMessage();
}

function showToast(message) {
    if (!toast) return;

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

async function copyGameLink(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast("✅ Enlace copiado");
    } catch {
        showToast("No se pudo copiar el enlace");
    }
}

function handleCardAction(event) {
    const action = event.target.closest("[data-share]");
    if (!action || !gamesContainer.contains(action)) return;

    const url = CONFIG.SITE_URL;
    const provider = action.dataset.share;

    if (provider === "copy") {
        copyGameLink(url);
        return;
    }

}

function handleSearch(event) {
    currentSearch = event.target.value.trim();
    renderGames();
}

function handleCategory(event) {
    categoryButtons.forEach(button => button.classList.remove("active"));
    event.currentTarget.classList.add("active");
    currentCategory = event.currentTarget.dataset.category;
    renderGames();
}

function applyGlobalLinks() {
    document.querySelectorAll("[data-donate-link]").forEach(link => {
        link.href = CONFIG.DONATE_LINK;
    });
}

searchInput.addEventListener("input", handleSearch);
categoryButtons.forEach(button => button.addEventListener("click", handleCategory));
gamesContainer.addEventListener("click", handleCardAction);

applyGlobalLinks();
renderGames();

/* Protección web existente. */
(() => {
    document.addEventListener("contextmenu", event => event.preventDefault());
    document.addEventListener("selectstart", event => event.preventDefault());
    document.addEventListener("dragstart", event => {
        if (event.target.tagName === "IMG") event.preventDefault();
    });
    document.addEventListener("copy", event => event.preventDefault());
    document.addEventListener("keydown", event => {
        const key = event.key.toUpperCase();
        if (event.key === "F12" || (event.ctrlKey && ["U"].includes(key)) || (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(key))) {
            event.preventDefault();
        }
    });
})();
