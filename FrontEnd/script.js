import { getAndShowWorks, displayCategories } from "./api.js";

async function init() {
    try {
        await getAndShowWorks();
        await displayCategories(); // Affiche les boutons dynamiques
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page :", error);
    }
}

init();