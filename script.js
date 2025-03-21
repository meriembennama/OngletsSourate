// Charger les SVG avec un callback
async function loadSVG(file, containerId, callback) {
    const response = await fetch(file);
    const svgText = await response.text();
    document.getElementById(containerId).innerHTML = svgText;
    if (callback) callback();
}

// Charger les SVG et initialiser les couleurs
loadSVG("fondOnglets.svg", "svgBackground", initFondColors);
loadSVG("textOnglet.svg", "svgText", initTextColors);

// ✅ Fonction pour changer les couleurs des FONDS uniquement
function updateFondColor(idInput, idColumn, idCode) {
    document.getElementById(idInput).addEventListener("input", function () {
        const column = document.querySelector(`#svgBackground #${idColumn}`);
        if (column) {
            column.querySelectorAll("path, rect").forEach(el => {
                el.setAttribute("fill", this.value);
                el.setAttribute("fill-opacity", "1");  // 🔥 Force la couleur sans transparence
            });
        }
        document.getElementById(idCode).innerText = `Fond ${idColumn} : ${this.value}`;
    });
}

// ✅ Fonction pour changer les couleurs des TEXTES uniquement
function updateTextColor(idInput, idTextGroup, idCode) {
    document.getElementById(idInput).addEventListener("input", function () {
        const textGroup = document.querySelector(`#svgText #${idTextGroup}`);
        if (textGroup) {
            textGroup.querySelectorAll("path").forEach(el => {
                el.setAttribute("fill", this.value);
            });
        }
        document.getElementById(idCode).innerText = `Texte ${idTextGroup} : ${this.value}`;
    });
}

// Initialiser les fonctions après le chargement des SVG
function initFondColors() {
    updateFondColor("fond1", "colonne1", "codeFond1");
    updateFondColor("fond2", "colonne2", "codeFond2");
    updateFondColor("fond3", "colonne3", "codeFond3");
}

function initTextColors() {
    updateTextColor("textColor1", "text1", "codeText1");
    updateTextColor("textColor2", "text2", "codeText2");
    updateTextColor("textColor3", "text3", "codeText3");
}

// 📸 Capture d'écran avec html2canvas
document.getElementById("saveBtn").addEventListener("click", function () {
    html2canvas(document.getElementById("captureZone")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ma-selection.png";
        link.click();
    });
});

