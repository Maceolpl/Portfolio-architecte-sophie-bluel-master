function setupModalNavigation() {
    const modal1 = document.getElementById("modal1");
    const modal2 = document.getElementById("modal2");

    const addPhotoBtn = document.querySelector(".add-photo-btn");
    const closeButtons = document.querySelectorAll(".close-icon");
    const backButton = document.querySelector("#modal2 .back-icon");

    if (!modal1 || !modal2) return;

    // Aller de la modale 1 vers la modale 2
    addPhotoBtn.addEventListener("click", () => {
        modal1.style.display = "none";
        modal2.style.display = "flex";
    });

    // Boutons de fermeture (X)
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modal1.style.display = "none";
            modal2.style.display = "none";
        });
    });

    // Clic sur l’overlay
    window.addEventListener("click", (e) => {
        if (e.target === modal1 || e.target === modal2) {
            modal1.style.display = "none";
            modal2.style.display = "none";
        }
    });

    // Retour vers la modale 1
    backButton.addEventListener("click", () => {
        modal2.style.display = "none";
        modal1.style.display = "flex";
    });
}

export { setupModalNavigation };