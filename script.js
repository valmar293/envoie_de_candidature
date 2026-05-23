window.addEventListener("DOMContentLoaded", () => {
    let candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];

    const addBtn = document.getElementById("addBtn");
    const formSection = document.getElementById("formSection");
    const form = document.getElementById("candidatureForm");
    const cancelBtn = document.getElementById("cancelBtn");
    const cardsContainer = document.getElementById("cardsContainer");

    const entreprise = document.getElementById("entreprise");
    const poste = document.getElementById("poste");
    const lieu = document.getElementById("lieu");
    const typeCandidature = document.getElementById("typeCandidature");
    const contrat = document.getElementById("contrat");
    const dateEnvoi = document.getElementById("dateEnvoi");
    const statut = document.getElementById("statut");
    const dateRelance = document.getElementById("dateRelance");
    const lien = document.getElementById("lien");
    const notes = document.getElementById("notes");

    addBtn.onclick = () => {
        formSection.classList.remove("hidden");
    };

    cancelBtn.onclick = () => {
        formSection.classList.add("hidden");
        form.reset();
    };

    function save() {
        localStorage.setItem("candidatures", JSON.stringify(candidatures));
    }

    function render() {
        cardsContainer.innerHTML = "";
        candidatures.forEach((c, index) => {
            const card = document.createElement("div");
            card.className = `card statut-${c.statut}`;

            card.innerHTML = `
                <h3>${c.entreprise} — ${c.poste}</h3>
                <p><strong>Lieu :</strong> ${c.lieu}</p>
                <p><strong>Type :</strong> ${c.typeCandidature}</p>
                <p><strong>Contrat :</strong> ${c.contrat}</p>
                <p><strong>Date d’envoi :</strong> ${c.dateEnvoi}</p>
                <p><strong>Statut :</strong> ${c.statut}</p>
                <p><strong>Date de relance :</strong> ${c.dateRelance}</p>
                <p><strong>Lien :</strong> <a href="${c.lien}" target="_blank">${c.lien}</a></p>
                <p><strong>Notes :</strong> ${c.notes}</p>
                <button class="btn-edit">Modifier</button>
                <button class="btn-delete">Supprimer</button>
            `;

            const editBtn = card.querySelector(".btn-edit");
            const deleteBtn = card.querySelector(".btn-delete");

            deleteBtn.onclick = () => {
                candidatures.splice(index, 1);
                save();
                render();
            };

            editBtn.onclick = () => {
                entreprise.value = c.entreprise;
                poste.value = c.poste;
                lieu.value = c.lieu;
                typeCandidature.value = c.typeCandidature;
                contrat.value = c.contrat;
                dateEnvoi.value = c.dateEnvoi;
                statut.value = c.statut;
                dateRelance.value = c.dateRelance;
                lien.value = c.lien;
                notes.value = c.notes;

                formSection.classList.remove("hidden");
                candidatures.splice(index, 1);
                save();
            };

            cardsContainer.appendChild(card);
        });
    }

    form.onsubmit = (e) => {
        e.preventDefault();

        const newC = {
            entreprise: entreprise.value,
            poste: poste.value,
            lieu: lieu.value,
            typeCandidature: typeCandidature.value,
            contrat: contrat.value,
            dateEnvoi: dateEnvoi.value,
            statut: statut.value,
            dateRelance: dateRelance.value,
            lien: lien.value,
            notes: notes.value
        };

        candidatures.push(newC);
        save();
        render();
        form.reset();
        formSection.classList.add("hidden");
    };

    render();
});
