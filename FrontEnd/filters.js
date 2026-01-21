import { getCategories, allWorks } from "./api.js";

function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

function filterByCategory(categoryId) {
    const filteredWorks = allWorks.filter(work => work.categoryId === categoryId);
    displayWorks(filteredWorks);
}

async function displayCategories() {
    const filters = document.querySelector(".filters");
    const categories = await getCategories();

    // Bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("filter-button");
    allButton.addEventListener("click", () => displayWorks(allWorks));
    
    filters.appendChild(allButton);

    // Boutons pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.id = category.id;
        button.classList.add("filter-button");
        button.addEventListener("click", () => filterByCategory(category.id));
        filters.appendChild(button);
    });
}

export { displayCategories, displayWorks };