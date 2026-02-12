import { allWorks } from "./api.js";
import { deleteWork } from "./api.js"
import { getAndShowWorks } from "./api.js"

function displayWorksInModal() {
  const gallery = document.querySelector(".modal-gallery");
  gallery.innerHTML = "";

  allWorks.forEach(work => {
    const item = document.createElement("div");
    item.classList.add("modal-item");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete-icon");

    deleteBtn.addEventListener("click", async () => {
      await deleteWork(work.id);
      displayWorksInModal();
      getAndShowWorks();
    });

    item.appendChild(deleteBtn);
    item.appendChild(img);
    gallery.appendChild(item);
  });
}

export { displayWorksInModal };


