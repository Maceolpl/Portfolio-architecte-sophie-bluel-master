import { getAndShowWorks } from "./api.js";
import { displayCategories } from "./filtersbtn.js";
import { handleEditMode } from "./loginstyle.js";
import { setupModalClose } from "./openmodal1.js";
import { displayWorksInModal } from "./modal1.js";
import { setupModalNavigation } from "./openmodal2.js";


async function init() {
    try {
        await getAndShowWorks();
        await displayCategories(); // Affiche les boutons dynamiques
        handleEditMode();
        setupModalClose();
        displayWorksInModal();
        setupModalNavigation();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la page :", error);
    }
}

init();