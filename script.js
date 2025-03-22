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

//  Fonction pour changer les couleurs des FONDS uniquement
function updateFondColor(idInput, idColumn, idCode) {
    document.getElementById(idInput).addEventListener("input", function () {
        const column = document.querySelector(`#svgBackground #${idColumn}`);
        if (column) {
            column.querySelectorAll("path, rect").forEach(el => {
                el.setAttribute("fill", this.value);
                el.setAttribute("fill-opacity", "1");  //  Force la couleur sans transparence
            });
        }
        document.getElementById(idCode).innerText = `Fond ${idColumn} : ${this.value}`;
    });
}

//  Fonction pour changer les couleurs des TEXTES uniquement
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

// Capture d'écran avec html2canvas
document.getElementById("saveBtn").addEventListener("click", function () {
    html2canvas(document.getElementById("captureZone")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ma-selection.png";
        link.click();
    });
});

document.getElementById("templateSelect").addEventListener("change", function () {
    const value = this.value;

    const templates = {
        nude: {
            fond1: "#c6acaf",
            text1: "#ffffff",
            fond2: "#9f7b7b",
            text2: "#ffffff",
            fond3: "#e4d6d6",
            text3: "#9f7b7b"
        },
        vert: {
            fond1: "#a3d1c6",
            text1: "#ffffff",
            fond2: "#6a9c89",
            text2: "#ffffff",
            fond3: "#d4ebc6",
            text3: "#6a9c89"
        },

        bleu: {
            fond1: "#bee3fe",
            text1: "#7298c9",
            fond2: "#2382ee",
            text2: "#ffffff",
            fond3: "#7298c9",
            text3: "#ffffff"
        },
        violet1: {
            fond1: "#cdc1ff",
            text1: "#ffffff",
            fond2: "#8967b3",
            text2: "#ffffff",
            fond3: "#fde9ff",
            text3: "#8967b3"
        },
        rose1: {
            fond1: "#faaac8",
            text1: "#ffffff",
            fond2: "#ec7fa9",
            text2: "#ffffff",
            fond3: "#ffdeea",
            text3: "#ec7fa9"
        }

    };

    if (templates[value]) {
        const t = templates[value];

        // Appliquer les couleurs aux inputs
        document.getElementById("fond1").value = t.fond1;
        document.getElementById("fond2").value = t.fond2;
        document.getElementById("fond3").value = t.fond3;
        document.getElementById("textColor1").value = t.text1;
        document.getElementById("textColor2").value = t.text2;
        document.getElementById("textColor3").value = t.text3;

        // Déclencher les événements "input" pour appliquer au SVG
        document.getElementById("fond1").dispatchEvent(new Event("input"));
        document.getElementById("fond2").dispatchEvent(new Event("input"));
        document.getElementById("fond3").dispatchEvent(new Event("input"));
        document.getElementById("textColor1").dispatchEvent(new Event("input"));
        document.getElementById("textColor2").dispatchEvent(new Event("input"));
        document.getElementById("textColor3").dispatchEvent(new Event("input"));
    }
});
