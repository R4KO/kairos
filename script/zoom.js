var path = "";
const chemin = "./img/body/";
const bodySection = document.getElementsByTagName('svg');
const humanBody = document.querySelector('#avatar'); // avatar svg
const imageSection = document.querySelector('#img'); // section vide qui contiendra les images après le click
const buttons = document.querySelectorAll('.button'); // type d'autocontact
const colors = { // pour les boutons
    C: '#3acf6e',
    D: '#3a73cf',
    F: '#c5cf3a'
};

const definitions = {
    mouvement: {
        C: "microcaresses",
        D: "microdemangeaison",
        F: "microfixation"
    }
}

const bodyParts = {
    head: [
        "tete/head_face.png",
        //"tete/head_back.png",
        //"tete/head_right.png"
    ],

    // attention au cou

    shoulder: [
        "epaule/epaule_face.png"
    ],

    cheast: [
        "torse/torse_face.png",
        //"torse/torse_back.png"
    ],

    arm: [
        "bras/bras_face.png",
        //"bras/bras_back.png"
    ],

    hands: [
        "mains/mains_face.png",
        "mains/mains_back.png"
    ],

    // attention au bassin

    stomach: [
        "ventre/ventre_face.png",
        //"ventre/ventre_back.png"
    ],

    legs: [
        "jambes/jambes_face.png",
        //"jambes/jambes_back.png",
        //"jambes/jambes_right.png"
    ]
};

// les sous-objets représentent le nom du dossier
const zones = {
    tete: {

    },

    epaule: {

    },

    torse: {
        "2_P10": [54, 81],

    },

    bras: {

    },

    ventre: {

    },

    mains: {

    },

    jambes: {
        "72_++_++_++": [31, 14],
        "73_++_++_++": [32, 39],
        "74_++_++_++": [30, 55],
        "75_++_++_++": [31, 83],
        "76_++_++_++": [30, 95],
        "82_++_++_++": [69, 14],
        "83_++_++_++": [66, 39],
        "84_++_++_++": [70, 57],
        "85_++_++_++": [67, 82],
        "86_++_++_++": [70, 95],
    }
};


function Values() {
    this.action = null;
    this.body1 = null;

}

/**
 Values.prototype.Setaction = function (Action) {
   this.action = Action;
};

 Values.prototype.getaction = function () {
    return this.action;
};**/

var valeurs = new Values();

/** Fonctions primordiales */

document.addEventListener("DOMContentLoaded", init);

document.addEventListener("DOMContentLoaded", function addclick() {
    let button;

    // on récupère les boutons relatifs au type d'autocontact
    buttons.forEach(function(target) {
        target.onclick = function(t) {

            // rendre tous les boutons blancs
            buttons.forEach(function(target) {
                target.style.background = 'white';
            });

            let id = t.target.id;
            let mouvement = definitions.mouvement[id];

            // attribuer la bonne couleur de fond
            t.target.style.background = colors[id];

            // Pour changer le path des images il faut altérer le path
            path = chemin + mouvement + "/";

            button = t.target.id;
            if (button === 'C' || button === 'D' || button === 'F') {
                valeurs.action = button;
                console.log(valeurs.action); // --> ça marche
            } else {
                getButtonValue();
            }
        }
    });
});

function init() {
    Array.from(bodySection).forEach(addClickAttribute);
}

function addClickAttribute(part, index) {
    // part représente une section svg du corps humain
    part.onclick = function(t) {
        if (path === "") {
            // aucun bouton n'a été cliqué
            window.alert("Sélectionnez le type d'autocontact");
        } else {

            // On supprime la div #avatar
            humanBody.parentNode.removeChild(humanBody);

            // récupérer la section cliquée
            let element = t.target.getAttribute('data-position');

            if (element == null) {
                // au cas où on clique au mauvais endroit
                element = t.target.parentElement.getAttribute('data-position');
            }

            valeurs.body1 = converteur(element);

            // chercher les paths des images correspondantes
            if (bodyParts[element]) {
                bodyParts[element].forEach(insertImage);
            }

        }
    }
}

function insertImage(part, index) {
    // part représente le path contenu dans l'object bodyParts

    // créée l'image
    var image = document.createElement('img');
    image.src = path + part;
    image.className = "bodyImage";
    image.id = part.match(/.*\//)[0].replace("/", ""); // pour récupérer le nom de la partie du corps

    // Pour récupérer les coordonnées
    image.addEventListener('click', printPosition);

    // placer l'image dans la div #img
    imageSection.appendChild(image);
}

function printPosition(t) {
    var position = document.getElementById('position');

    position.innerHTML = getPosition(t);
}

function getPosition(e) {
    var posXR = getMousePositionX(e);
    var posYR = getMousePositionY(e);

    // pour récupérer la bonne partie du corps
    getZoneFrom(zones[e.target.id], posXR, posYR);

    return 'Image ' + e.target.id + '<br />Position X: ' + posXR + ' %<br />Position Y: ' + posYR + ' %';
}

function getZoneFrom(zone, x, y) {
    var marge = 5; // en pourcentage de l'image

    // On retourne l'objet en récupérant que les tableaux de coordonnées
    Object.values(zone).some((arr) => {
        // on vérifie que les coordonnées du click correspondent à une zone définie dans l'objet zone
        if (checkMarge(x, arr[0], marge) && checkMarge(y, arr[1], marge)) {
            // la zone existe donc on récupère sa key dans l'objet
            let key = getKeyByValue(zone, arr);
            valeurs.body1 = key;
            console.log(key);
        }
    });
}


/** Fonctions utilitaires */

function getMousePositionX(event) {
    var rect = event.target.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var width = event.target.offsetWidth;

    // on divise par la largeur et hauteur et on arrondie à la 2ème décimale
    return Math.round((x / width) * 100 * 100) / 100;
}


function getMousePositionY(event) {
    var rect = event.target.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var height = event.target.offsetHeight;

    // on divise par la largeur et hauteur et on arrondie à la 2ème décimale
    return Math.round((y / height) * 100 * 100) / 100;
}

function getKeyByValue(object, value) {
    // ce qui est important c'est que ça fonctionne
    return Object.keys(object).find(key => object[key] === value);
}

// marge représente la marge d'erreur admise
function checkMarge(number, reference, marge) {
    // on créée un intervalle
    return (number > (reference - marge)) && (number < (reference + marge))
}

function getButtonValue() {
    window.location.assign("test.php?action=" + valeurs.action + "&&test=" + valeurs.body1);

}