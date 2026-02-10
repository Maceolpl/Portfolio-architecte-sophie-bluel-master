import { getCategories } from "./api.js";
import { getAndShowWorks } from "./api.js";

const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

const addPhotoBtn = document.querySelector(".add-photo-btn");
const closeButtons = document.querySelectorAll(".close-icon");

const form = document.getElementById("add-work-form");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const submitBtn = document.querySelector(".submit-btn");
const errorMsg = document.querySelector(".form-error");

const token = localStorage.getItem("token")
localStorage.getItem("token")

/* MODALEs*/

addPhotoBtn.addEventListener("click", () => {
    modal1.style.display = "none";
    modal2.style.display = "flex";
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        modal1.style.display = "none";
        modal2.style.display = "none";
        resetForm();
    });
});

window.addEventListener("click", (e) => {
    if (e.target === modal1 || e.target === modal2) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        resetForm();
    }
});

const backButton = document.querySelector("#modal2 .back-icon");

backButton.addEventListener("click", () => {
    modal2.style.display = "none";
    modal1.style.display = "flex";
});

/* CATEGORIES */

async function loadCategories() {
    const categories = await getCategories();

    // On garde l'option "Choisir une catégorie"
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
}

loadCategories();

/* ---------------- PREVIEW IMAGE ---------------- */

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display = "block";

    validateForm();
});

/* ---------------- VALIDATION ---------------- */

function validateForm() {
    const isValid =
        imageInput.files.length > 0 &&
        titleInput.value.trim() !== "" &&
        categorySelect.value !== "";

    submitBtn.disabled = !isValid;

    if (isValid) {
        submitBtn.classList.add("active");
    } else {
        submitBtn.classList.remove("active");
    }
}

titleInput.addEventListener("input", validateForm);
categorySelect.addEventListener("change", validateForm);

/* ---------------- SUBMIT ---------------- */

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!token) {
        errorMsg.textContent = "Utilisateur non authentifié.";
        errorMsg.style.display = "block";
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l’envoi du formulaire");
        }

        // Mise à jour galerie sans reload
        await getAndShowWorks();

        modal2.style.display = "none";
        resetForm();

    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
    }
});


/* ---------------- RESET ---------------- */

function resetForm() {
    form.reset();
    imagePreview.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.classList.remove("active");
    errorMsg.style.display = "none";
}