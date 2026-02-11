import { getCategories, allWorks } from "./api.js";
import { displayWorks, filterByCategory } from "./filters.js";

function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll(".filter-button");
    buttons.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

async function displayCategories() {
    const filters = document.querySelector(".filters");
    const categories = await getCategories();

    // Bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("filter-button");
    allButton.addEventListener("click", () => {
        displayWorks(allWorks);
        setActiveButton(allButton);
    });

    filters.appendChild(allButton);

    // Boutons pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.id = category.id;
        button.classList.add("filter-button");
        button.addEventListener("click", () => {
            filterByCategory(category.id);
            setActiveButton(button);
        });
        filters.appendChild(button);
    });
}

export { displayCategories };