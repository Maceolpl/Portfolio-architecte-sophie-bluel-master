import { displayWorks } from "./filters.js";

let allWorks = [];

async function getAndShowWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        allWorks = await response.json();
        displayWorks(allWorks);
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'affichage des catégories :", error);
    }
}

export { getAndShowWorks, getCategories, allWorks };
