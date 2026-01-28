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

async function deleteWork(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
        }

        allWorks = allWorks.filter(work => work.id !== id);
    } catch (error) {
        console.error(error);
    }
}

export { getAndShowWorks, getCategories, allWorks, deleteWork };
