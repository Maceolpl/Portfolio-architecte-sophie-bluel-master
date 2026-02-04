import { getAndShowWorks } from "./api.js";
import { displayCategories } from "./filters.js";
import { handleEditMode } from "./loginstyle.js";
import { setupModalClose } from "./loginstyle.js";
import { displayWorksInModal } from "./modal.js";
import { setActiveButton } from "./filters.js"


async function init() {
    try {
        await getAndShowWorks();
        await displayCategories(); // Affiche les boutons dynamiques
        handleEditMode();
        setupModalClose();
        displayWorksInModal();
        setActiveButton();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page :", error);
    }
}

init();