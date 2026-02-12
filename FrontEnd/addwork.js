import { getCategories } from "./api.js";
import { getAndShowWorks } from "./api.js";

function setupAddWorkForm() {
const modal2 = document.getElementById("modal2");
const form = document.getElementById("add-work-form");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const submitBtn = document.querySelector(".submit-btn");
const errorMsg = document.querySelector(".form-error");

const token = localStorage.getItem("token")

async function loadCategories() {
    const categories = await getCategories();

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
    });
}

loadCategories();

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 4 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        errorMsg.textContent = "Format d'image non autorisé (JPG ou PNG uniquement";
        errorMsg.style.display = "block";
        imageInput.value = "";
        return;
    }

    if (file.size > maxSize) {
        errorMsg.textContent = "L’image ne doit pas dépasser 4 Mo";
        errorMsg.style.display = "block";
        imageInput.value = "";
        return;
    }

    errorMsg.style.display = "none";
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display = "block";

    validateForm();
});

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

        await getAndShowWorks();

        modal2.style.display = "none";
        resetForm();

    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
    }
});

function resetForm() {
    form.reset();
    imagePreview.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.classList.remove("active");
    errorMsg.style.display = "none";
}
}

export { setupAddWorkForm };