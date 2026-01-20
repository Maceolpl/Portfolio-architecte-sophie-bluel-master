async function getAndShowWorks() {
    const gallery = document.querySelector(".gallery");
    // Appel à l'API pour récuperer l'ensemble des projects
    await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(projects => {
        const gallery = document.querySelector(".gallery");

        projects.forEach(project => {
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = project.imageUrl;
            img.alt = project.title;

            const figcaption = document.createElement("figcaption");
            figcaption.textContent = project.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement des projets :", error);
    });
}


export { getAndShowWorks }