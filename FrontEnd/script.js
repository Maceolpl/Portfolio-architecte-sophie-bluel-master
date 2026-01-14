// URL de l'API
const apiUrl = "http://localhost:5678/api/projects"; // adapte selon ta route

// Sélection du conteneur
const gallery = document.querySelector(".gallery");

// Appel à l'API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des projets");
    }
    return response.json();
  })
  .then(projects => {
    // Vider la galerie si elle contient du contenu statique
    gallery.innerHTML = "";

    // Parcourir les projets
    projects.forEach(project => {
      const figure = document.createElement("figure");

      figure.innerHTML = `
        <img src="assets/images/${project.image}" alt="${project.title}">
        <figcaption>${project.title}</figcaption>
      `;

      gallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error("Erreur fetch :", error);
    gallery.innerHTML = "<p>Impossible de charger les projets pour le moment.</p>";
  });