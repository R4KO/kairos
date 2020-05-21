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
        //Front
        "0_F_.._P0": [49, 32],
        "0_F_.._P2": [58, 35],
        "0_F_.._P1": [38, 36],
        //Sourcils
        "0_S_.._P0": [49, 44],
        "0_S_.._P1": [38, 43],
        "0_S_.._P2": [59, 41],
        "0_S_.._P1P2": [43, 43],
        "0_S_.._P1P2_t": [54, 43],
        //yeux
        "0_Y_.._P1": [41, 51],
        "0_Y_.._P2": [56, 50],
        //Nez
        "0_N_.._P0": [50, 65],
        "0_N_.._P1": [47, 62],
        "0_N_.._P2": [51, 62],
        //Oreilles
        "0_O_.._P1": [33, 60],
        "0_O_.._P2": [65, 56],
        //Joue
        "0_J_.._P1": [39, 72],
        "0_J_.._P2": [61, 71],
        "0_J_.._P0": [49, 83],

        //Moustache (Ou la zone avec un M j'suis pas sur)
        "0_M_.._P0": [50, 71],
        "0_M_.._P1": [46, 71],
        "0_M_.._P2": [53, 71],

        //Bouche
        "0_B_.._P0": [50, 75],
        "0_B_.._P1": [47, 75],
        "0_B_.._P2": [51, 75],
        "0_B_1_P1P2": [45, 74],
        "0_B_1_P1P2_t": [55, 75],

        //Cou

        "1_.._.._P0": [50, 98],
        "1_.._.._P1": [44, 90],
        "1_.._.._P2": [55, 89],

        "5_.._.._..": [39, 97],
        "6_.._.._..": [60, 98],

        //Micro-démangeaisons
        //front
        "0_F_10_.._a": [48, 33],

        "0_F_0_..": [49, 22],
        "0_F_1_P1": [39, 35],
        "0_F_1_P2": [57, 32],

        //Sourcils
        "0_S_1_P1": [61, 41],
        "0_S_2_P1": [53, 45],
        "0_S_1_P2": [35, 44],
        "0_S_2_P2": [44, 45],

        //Yeux
        "0_Y_2_P2": [57, 48],
        "0_Y_2_P1": [41, 48],
        "0_Y_3_P2": [55, 53],
        "0_Y_3_P1": [42, 55],
        "0_Y_1_P2": [52, 56],
        "0_Y_1_P1": [45, 56],
        "0_Y_4_P2": [53, 58],
        "0_Y_4_P1": [45, 58],
        "0_Y_6_P2": [61, 55],
        "0_Y_6_P1": [38, 58],
        "0_Y_5_P2": [56, 59],
        "0_Y_5_P1": [43, 59],

        //Nez
        "0_N_1_P1": [47, 57],
        "0_N_1_P2": [51, 57],
        "0_N_0_..": [49, 62],
        "0_N_3_P1": [45, 65],
        "0_N_3_P2": [53, 65],
        "0_N_2_P1": [47, 62],
        "0_N_2_P2": [51, 62],
        "0_N_10_..": [50, 65],
        "0_N_40_..": [48, 64],
        "0_N_40_.._t": [51, 64],
        "0_N_30_..": [49, 66],
        "0_N_20_..": [50, 69],
        "0_N_20_.._t": [50, 69],
        "0_N_20_P2": [51, 68],
        "0_N_20_P1": [48, 68],
        "0_N_4_P2": [53, 67],
        "0_N_4_P1": [46, 67],

        //Moustache
        "0_M_0_..": [49, 70],
        "0_M_1_P1": [46, 70],
        "0_M_1_P2": [53, 70],

        //Bouche
        "0_B_0_..": [49, 73],
        "0_B_1_P1": [46, 74],
        "0_B_1_P2": [53, 74],

        //Joue
        "0_J_1_P1": [43, 80],
        "0_J_1_P2": [56, 80],
        "0_J_0_..": [49, 83],
        "0_J_10_..": [49, 86],

        //Oreilles
        "0_O_1_P1": [43, 80],
        "0_O_1_P2": [32, 54],
        "0_O_2_P1": [32, 60],
        "0_O_2_P2": [65, 57],
        "0_O_0_P1": [34, 61],
        "0_O_0_P2": [65, 59],
        "0_O_4_P1": [36, 61],
        "0_O_4_P2": [63, 60],
        "0_O_3_P1": [35, 68],
        "0_O_3_P2": [63, 65],


        //Cou
        "6_.._.._.._t": [63, 97],
        "1_.._.._P0_t": [50, 95],
        "1_.._.._P1_t": [45, 90],
        "1_.._.._P2_t": [50, 98],


        //Micro-caresse
        //Sourcils
        "0_S_.._P1P2": [41, 43],
        "0_S_.._P1P2_t": [54, 43],
        "0_S_.._P2": [59, 43],

        //Oreilles

        //Nez
        "0_N_.._P0": [49, 58],
        "0_N_.._P1": [47, 63],
        "0_N_.._P2": [52, 63],
        "0_N_20_P2": [49, 67],

        //Joue/visage
        "0_V_.._P2": [58, 60],
        "0_V_.._P1": [42, 62],
        "0_J_.._P1P2": [58, 75],
        "0_J_.._P1P2_t": [41, 75],
        "0_J_.._P1": [62, 67],
        "0_J_.._P2": [37, 67],

        //Cou
        "6_.._.._.._t": [62, 98],

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


        // Main gauche
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
    //var position = document.getElementById('position');

    getPosition(t);
}

function getPosition(e) {
    var posXR = getMousePositionX(e);
    var posYR = getMousePositionY(e);

    // pour récupérer la bonne partie du corps
    getZoneFrom(zones[e.target.id], posXR, posYR);

   // return 'Image ' + e.target.id + '<br />Position X: ' + posXR + ' %<br />Position Y: ' + posYR + ' %';
}

function getZoneFrom(zone, x, y) {
    var marge =1; // en pourcentage de l'image

    // On retourne l'objet en récupérant que les tableaux de coordonnées
    Object.values(zone).some((arr) => {
        // on vérifie que les coordonnées du click correspondent à une zone définie dans l'objet zone
        if (checkMarge(x, arr[0], marge) && checkMarge(y, arr[1], marge)) {
            // la zone existe donc on récupère sa key dans l'objet
            let key = getKeyByValue(zone, arr);
            valeurs.strV = key;
            console.log(key);
            window.location.assign("test.php?action=" + valeurs.action + "&&test=" + valeurs.strV);
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
