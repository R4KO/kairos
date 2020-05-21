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
        //"mains/mains_back.png"
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
        //La on va s'amuser avec la tête

        // Micro-caresse
        "0_F_.._P0": [49, 32],
        "0_F_.._P2": [58, 35],
        "0_F_.._P1": [38, 36],

    },

    epaule: {

    },

    torse: {
        // Micro-caresse
        "2_.._.._P0": [51, 36],
        "2_.._.._P1": [17, 52],
        "2_.._.._P2": [90, 53],

        "2_.._.._P10": [54, 82],
        "2_.._.._P3": [22, 93],
        "2_.._.._P4": [83, 94],

        // Micro-démangeaisons
        "2_.._.._P0_x": [50, 27],
        "2_.._.._P1_x": [18, 41],
        "2_.._.._P2_x": [83, 42],

        "2_.._.._P10_x": [51, 65],
        "2_.._.._P3_x": [20, 71],
        "2_.._.._P4_x": [82, 71],

        // Micro-fixations
        "2_.._.._P0_y": [50, 32],
        "2_.._.._P1_y": [18, 49],
        "2_.._.._P2_y": [87, 48],

        "2_.._.._P10_y": [53, 66],
        "2_.._.._P3_y": [22, 83],
        "2_.._.._P4_y": [85, 82],


    },

    bras: {
        // Bras droit
        "51_.._.._P1": [33, 4],
        "51_.._.._P2": [27, 14],
        "51_.._.._P3": [34, 20],

        "52_.._.._..": [29, 38],
        "53_.._.._..": [27, 54],
        "54_.._.._..": [21, 79],

        // Bras gauche
        "61_.._.._P1": [67, 2],
        "61_.._.._P2": [73, 11],
        "61_.._.._P3": [67, 20],

        "62_.._.._..": [72, 40],
        "63_.._.._..": [75, 57],
        "64_.._.._..": [79, 77],
    },

    ventre: {
        // Micro-caresses
        "3_.._.._P0": [53, 17],
        "3_.._.._P1": [27, 32],
        "3_.._.._P2": [78, 32],

        "4_.._.._P1": [18, 60],
        "4_.._.._P2": [83, 58],
        "4_.._.._P0": [50, 76],

        "71_.._.._..": [17, 81],
        "81_.._.._..": [83, 82],

        // Micro-Démangeaisons

        "3_.._.._P0_x": [52, 27],
        "3_.._.._P1_x": [34, 33],
        "3_.._.._P2_x": [70, 34],

        "4_.._.._P1_x": [28, 52],
        "4_.._.._P2_x": [74, 51],
        "4_.._.._P0_x": [52, 65],

        "71_.._.._.._x": [24, 82],
        "81_.._.._.._x": [78, 82],

        // Micro-fixations

        "3_.._.._P0_y": [51, 18],
        "3_.._.._P1_y": [32, 23],
        "3_.._.._P2_y": [73, 24],

        "4_.._.._P1_y": [22, 52],
        "4_.._.._P2_y": [78, 53],
        "4_.._.._P0_y": [52, 58],

        "71_.._.._.._y": [20, 83],
        "81_.._.._.._y": [81, 86],

        "4_.._.._P1P2 ": [80, 58],
        "4_.._.._P1P2": [20, 58],
    },

    mains: {
        // Main droite

        // Micro-caresse
        "55_.._.._..": [36, 14],
        "56_.._.._..": [27, 43],
        "56_01_.._..": [6, 36],
        "56_02_.._..": [6, 82],
        "56_03_.._..": [15, 93],
        "56_04_.._..": [27, 87],
        "56_05_.._..": [38, 79],

        // Micro-démangeaisons
        "55_.._.._.._x": [36, 13],
        "56_.._.._.._x": [30, 42],
        "56_01_.._.._x": [7, 36],
        "56_02_.._.._x": [9, 74],
        "56_03_.._.._x": [17, 83],
        "56_04_.._.._x": [28, 84],
        "56_05_.._.._x": [38, 78],

        // Micro-caresse
        "55_.._.._.._y": [39, 11],
        "56_.._.._.._y": [29, 39],
        "56_01_.._.._y": [5, 33],
        "56_02_.._.._y": [10, 73],
        "56_03_.._.._y": [18, 78],
        "56_04_.._.._y": [29, 78],
        "56_05_.._.._y": [40, 75],


        // Main gauch..
        // Micro-caresse
        "65_.._.._..": [67, 20],
        "66_.._.._..": [70, 41],
        "66_01_.._..": [96, 38],
        "66_02_.._..": [95, 83],
        "66_03_.._..": [86, 95],
        "66_04_.._..": [74, 94],
        "66_05_.._..": [62, 82],

        // Micro-démangeaisons
        "65_.._.._.._x": [64, 18],
        "66_.._.._.._x": [71, 43],
        "66_01_.._.._x": [91, 34],
        "66_02_.._.._x": [92, 76],
        "66_03_.._.._x": [84, 87],
        "66_04_.._.._x": [72, 87],
        "66_05_.._.._x": [63, 77],

        // Micro-caresse
        "65_.._.._.._y": [62, 13],
        "66_.._.._.._y": [70, 40],
        "66_01_.._.._y": [89, 34],
        "66_02_.._.._y": [89, 69],
        "66_03_.._.._y": [81, 76],
        "66_04_.._.._y": [70, 79],
        "66_05_.._.._y": [61, 72],
    },

    jambes: {

        // Jambe droite
        "72_.._.._..": [31, 14],
        "73_.._.._..": [32, 39],
        "74_.._.._..": [30, 55],
        "75_.._.._..": [31, 83],
        "76_.._.._..": [30, 95],

        // Jambe gauche
        "82_.._.._..": [69, 14],
        "83_.._.._..": [66, 39],
        "84_.._.._..": [70, 57],
        "85_.._.._..": [67, 82],
        "86_.._.._..": [70, 95],
    }
};


function Values() {
    this.action = null;
    this.strV = null;
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
            }else if( button === 'back'){
                window.location.assign("index.html");
            }
            else {
                window.location.assign("test.php?action=" + valeurs.action + "&&test=" + valeurs.strV);
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
            valeurs.strV = key;
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
