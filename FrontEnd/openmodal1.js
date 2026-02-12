function openModal(modal) {
    if (!modal) return;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

function setupModalClose(modal) {
    if (!modal) return;

    const closeButton = modal.querySelector(".close-icon");

    // Bouton X
    closeButton.addEventListener("click", () => {
        closeModal(modal);
    });

    // Clic sur l’overlay
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

export { openModal, closeModal, setupModalClose };