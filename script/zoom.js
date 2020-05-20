const chemin = "./img/body/";
const bodySection = document.getElementsByTagName('svg');
const humanBody = document.querySelector('#avatar');
const imageSection = document.querySelector('#img');
const buttons = document.querySelectorAll('.button');


function Values(){
    this.action=null ;
    this.body1=null;

}
/**
 Values.prototype.Setaction = function (Action) {
   this.action = Action;
};

 Values.prototype.getaction = function () {
    return this.action;
};**/
var valeurs =  new Values();

const colors = {
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

var path = "";

var bodyParts = {
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

    hand: [
        "mains/mains_face.png"
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

const zones = {
    jambes: {
        72: [31, 14],
        73: [32, 39],
    },
};

/*
var pointless = {
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

    hand: [
        "mains/mains_face.png"
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

var fixation = {

};

var caresse = {

};

var demangeaison = {

};


var bodyParts = pointless;

*/

document.addEventListener("DOMContentLoaded", init);

function init() {
    Array.from(bodySection).forEach(addClickAttribute);
}

function addClickAttribute(part, index) {
    //console.log(part);

    part.onclick = function(t) {
        if (path === "") {
            window.alert("Sélectionnez le type d'autocontact");
        }

        else {

            // On supprime la div #avatar
            humanBody.parentNode.removeChild(humanBody);

            // récupérer la section cliquée
            let element = t.target.getAttribute('data-position');
            if (element == null) {
                // au cas où on clique au mauvais endroit
                element = t.target.parentElement.getAttribute('data-position');
            }

            //console.log(element);
            valeurs.body1= converteur(element);
            // chercher les paths des images correspondantes
            if (bodyParts[element]) {
                bodyParts[element].forEach(insertImage);
            }

        }
    }
}

function insertImage(part, index) {
    // créée l'image
    var image = document.createElement('img');
    image.src = path + part;
    image.className = "bodyImage";
    image.id = part.match(/.*\//)[0].replace("/", ""); // pour récupérer le nom de la partie du corps
    image.addEventListener('click', printPosition);

    imageSection.appendChild(image);
}

function printPosition(t) {
    var position = document.getElementById('position');

    position.innerHTML = getPosition(t);
}


function getPosition(e) {
    var posXR = getMousePositionX(e);
    var posYR = getMousePositionY(e);

    //console.log(getZoneFrom(posXR, posYR));
    // pour récupérer la bonne partie du corps
    getZoneFrom(zones[e.target.id] , posXR, posYR);

    return 'Image ' + e.target.id + '<br />Position X: ' + posXR + ' %<br />Position Y: ' + posYR + ' %';
}

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

function getZoneFrom(zone, x, y) {
    Object.values(zone).some((arr) => {
        //console.log(arr);

        // 5% de marge d'erreur
        if (checkMarge(x, arr[0], 5) && checkMarge(y, arr[1], 5)) {

            // get zone number
            console.log(getKeyByValue(zone, arr));
        }
    });
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// marge représente la marge d'erreur en %
function checkMarge(number, reference, marge) {
    return (number > (reference - marge)) && (number < (reference + marge))
}

document.addEventListener("DOMContentLoaded", function addclick() {
    let button;
    buttons.forEach(function(target) {
        target.onclick = function(t) {
            // rendre les boutons blancs
            buttons.forEach(function(target) {
                target.style.background = 'white';
            });

            let id = t.target.id;
            let mouvement = definitions.mouvement[id];

            t.target.style.background = colors[id];
            
            // Pour changer le path des images
            path = chemin + mouvement + "/";
            button = t.target.id;
            if (button === 'C' || button === 'D' || button === 'F'){
                valeurs.action = button;
                console.log(valeurs.action) ; // --> ça marche
            }else{
                getButtonValue();
            }
        }
    });
});



function getButtonValue() {
    window.location.assign("test.php?action="+valeurs.action+"&&test="+valeurs.body1);

}
