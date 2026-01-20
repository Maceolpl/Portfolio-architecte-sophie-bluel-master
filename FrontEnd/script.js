import { getAndShowWorks } from "./api.js";

async function init() {
    try {
        await getAndShowWorks ();
    }
    catch (error){
        console.error("erreur lors de l'initialisation de la page",error)
    }
};

init();

function filterWorks(categoryId) {
    if (categoryId === 0) {
        displayWorks(allWorks);
        return;
    }

    const filtered = allWorks.filter(
        work => work.categoryId === categoryId
    );

    displayWorks(filtered);
}

const filterTitles = document.querySelectorAll(".filtres h3");

filterTitles.forEach(title => {
    title.addEventListener("click", () => {
        const categoryId = Number(title.dataset.id);

        // gestion visuelle
        filterTitles.forEach(t => t.classList.remove("active"));
        title.classList.add("active");

        // filtrage
        filterWorks(categoryId);
    });
});

filterTitles.forEach(h3 => {
    h3.setAttribute("role", "button");
    h3.setAttribute("tabindex", "0");
});