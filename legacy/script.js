document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // Profile Logic
    // -------------------------
    const profileForm = document.getElementById("profileForm");
    const profilesList = document.getElementById("profilesList");

    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const roleInput = document.getElementById("role");
        const bioInput = document.getElementById("bio");

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const bio = bioInput.value.trim();

        const card = document.createElement("div");
        card.className = "resulting-card";
        // Ya no tienen display:none al crearse
        card.classList.remove("hidden");
        card.innerHTML = `
            <h3>${name}</h3>
            <p style="color: var(--primary-color); font-weight: 600; margin-bottom: 0.5rem;">${role}</p>
            <p><i>"${bio}"</i></p>
        `;
        profilesList.prepend(card);

        // Limpiar formulario para permitir nuevos
        nameInput.value = '';
        roleInput.value = '';
        bioInput.value = '';

        document.getElementById("research").classList.remove("hidden");
    });

    // -------------------------
    // Research Log Logic
    // -------------------------
    const researchImageInput = document.getElementById("researchImage");
    const fileNameDisplay = document.getElementById("fileName");
    const addResearchBtn = document.getElementById("addResearchBtn");
    const researchTitle = document.getElementById("researchTitle");
    const researchContent = document.getElementById("researchContent");
    const researchContact = document.getElementById("researchContact");
    const researchFeed = document.getElementById("researchFeed");

    let currentImageBase64 = null;

    if (researchImageInput) {
        researchImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                const reader = new FileReader();
                reader.onload = function (event) {
                    currentImageBase64 = event.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                fileNameDisplay.textContent = "Ninguna imagen seleccionada";
                currentImageBase64 = null;
            }
        });
    }

    if (researchContent) {
        researchContent.addEventListener('input', function() {
            if (this.innerHTML === '<br>' || this.innerHTML === '<div><br></div>') {
                this.innerHTML = '';
            }
        });

        researchContent.addEventListener('paste', (e) => {
            const items = (e.clipboardData || window.clipboardData).items;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.kind === 'file') {
                    e.preventDefault();
                    const blob = item.getAsFile();
                    if (!blob) continue;
                    
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const img = document.createElement("img");
                        img.src = event.target.result;
                        img.style.maxWidth = "100%";
                        img.style.borderRadius = "8px";
                        img.style.display = "block";
                        img.style.margin = "0.5rem 0";

                        const selection = window.getSelection();
                        if (selection.rangeCount > 0 && researchContent.contains(selection.anchorNode)) {
                            selection.deleteFromDocument();
                            selection.getRangeAt(0).insertNode(img);
                            selection.collapseToEnd();
                        } else {
                            researchContent.appendChild(img);
                        }
                    };
                    reader.readAsDataURL(blob);
                }
            }
        });
    }

    if (addResearchBtn) {
        addResearchBtn.addEventListener("click", () => {
            const title = researchTitle.value.trim();
            const content = researchContent.innerHTML.trim();
            const hasContent = researchContent.textContent.trim().length > 0 || content.includes('<img');
            const contact = researchContact.value.trim();

            if (title && hasContent) {
                const entry = document.createElement("div");
                entry.className = "research-entry";

                let imgHtml = '';
                if (currentImageBase64) {
                    imgHtml = `<img src="${currentImageBase64}" class="research-img-preview" alt="Evidencia Visual">`;
                }

                let contactHtml = '';
                if (contact) {
                    contactHtml = `<div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--glass-border);">
                        <strong style="color: var(--highlight);">📬 Contacto del Investigador:</strong> <span style="color: #e4f5eb;">${contact}</span>
                    </div>`;
                }

                entry.innerHTML = `
                    <h4>${title}</h4>
                    <p>${content}</p>
                    ${imgHtml}
                    ${contactHtml}
                    <span style="font-size: 0.8rem; color: #8bb39c; display: block; margin-top: 1rem;">
                        Registrado el: ${new Date().toLocaleString()}
                    </span>
                `;

                researchFeed.prepend(entry);

                // clear form
                researchTitle.value = '';
                researchContent.innerHTML = '';
                researchContact.value = '';
                researchImageInput.value = '';
                fileNameDisplay.textContent = "Ninguna imagen seleccionada";
                currentImageBase64 = null;
            } else {
                alert("Por favor inserta un título/token y el contenido para tu investigación.");
            }
        });
    }
});
