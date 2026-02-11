import { getAndShowWorks } from "./api.js";
import { displayCategories } from "./filtersbtn.js";
import { handleEditMode } from "./loginstyle.js";
import { setupModalClose } from "./loginstyle.js";
import { displayWorksInModal } from "./modal.js";


async function init() {
    try {
        await getAndShowWorks();
        await displayCategories(); // Affiche les boutons dynamiques
        handleEditMode();
        setupModalClose();
        displayWorksInModal();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page :", error);
    }
}

init();