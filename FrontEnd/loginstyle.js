const isLoggedIn = !!localStorage.getItem("token");

function showEditModeBanner() {
    const banner = document.createElement("div");
    banner.classList.add("edit-mode-banner");
    banner.innerHTML = `
    <p>🖊 Mode édition</p>
  `;
    document.body.prepend(banner);
}

function updateLoginLink() {
    const loginLink = document.querySelector(".menu-link");

    loginLink.textContent = "Logout";
    loginLink.href = "#";

    loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "index.html";
    });
}

function hideFilters() {
    const filters = document.querySelector(".filters");
    if (filters) {
        filters.style.display = "none";
    }
}

function showEditButton() {
    const portfolio = document.querySelector("#portfolio h2");
    const modal = document.querySelector("#modal1");
    if (!portfolio || !modal) return;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "🖊 Modifier";

    editButton.addEventListener("click", () => {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
    });

    portfolio.appendChild(editButton);
}

function handleEditMode() {
    const token = localStorage.getItem("token");

    if (token) {
        showEditModeBanner();
        updateLoginLink();
        hideFilters();
        showEditButton();
    }
}

export { handleEditMode };