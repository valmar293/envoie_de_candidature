let candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];

const addBtn = document.getElementById("addBtn");
const formSection = document.getElementById("formSection");
const form = document.getElementById("candidatureForm");
const cancelBtn = document.getElementById("cancelBtn");
const cardsContainer = document.getElementById("cardsContainer");

addBtn.onclick = () => formSection.classList.remove("hidden");
cancelBtn.onclick = () => formSection.classList.add("hidden");

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

            <button class="btn-edit" onclick="edit(${index})">Modifier</button>
            <button class="btn-delete" onclick="remove(${index})">Supprimer</button>
        `;

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

function remove(index) {
    candidatures.splice(index, 1);
    save();
    render();
}

function edit(index) {
    const c = candidatures[index];

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
}

render();
