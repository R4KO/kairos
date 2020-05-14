const path = "./img/body/";
const bodySection = document.getElementsByTagName('svg');
const humanBody = document.querySelector('#avatar');
const imageSection = document.querySelector('#img');
const buttons = document.querySelectorAll('.button');



function Values(){
   this.action ;
}

Values.prototype.Setaction = function (Action) {
   this.action = Action;
};

Values.prototype.getaction = function () {
    return this.action;
};
 var valeurs =  new Values();

const colors = {
    C: '#3acf6e',
    D: '#3a73cf',
    F: '#c5cf3a'
}

var bodyParts = {
    head: [
        "tete/head_face.png",
        "tete/head_back.png",
        "tete/head_right.png"
    ],


    // attention au cou

    cheast: [
        "torse/torse_face.png",
        "torse/torse_back.png"
    ],

    arm: [
        "bras/bras_face.png",
        "bras/bras_back.png"
    ],

    // attention au bassin

    stomach: [
        "ventre/ventre_face.png",
        "ventre/ventre_back.png"
    ],

    legs: [
        "jambes/jambes_face.png",
        "jambes/jambes_back.png",
        "jambes/jambes_right.png"
    ]
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    Array.from(bodySection).forEach(addClickAttribute);
}

function addClickAttribute(part, index) {
    console.log(part);

    part.onclick = function(t) {

        // On supprime la div #avatar
        humanBody.parentNode.removeChild(humanBody);

        // récupérer la section cliquée
        let element = t.target.getAttribute('data-position');
        if (element == null) {
            // au cas où on clique au mauvais endroit
            element = t.target.parentElement.getAttribute('data-position');
        }

        console.log(element);

        // chercher les paths des images correspondantes
        if (bodyParts[element]) {
            bodyParts[element].forEach(insertImage);
        }
    }
}

function insertImage(part, index) {
    console.log(part);

    // créée l'image
    var image = document.createElement('img');
    image.src = path + part;
    image.className = "bodyImage " + part;
    image.id = index + 1; // pour avoir le numéro de l'image'
    image.addEventListener('click', printPosition);

    imageSection.appendChild(image);
}

function printPosition(t) {
    var position = document.getElementById('position');

    position.innerHTML = getPosition(t);
}


function getPosition(e) {
    console.log(e.target);

    var rect = e.target.getBoundingClientRect();

    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var width = e.target.offsetWidth;
    var height = e.target.offsetHeight;

    // on divise par la largeur et hauteur et on arrondie à la 2ème décimale
    var posXR = Math.round((x / width) * 100 * 100) / 100;
    var posYR = Math.round((y / height) * 100 * 100) / 100;

    return 'Image ' + e.target.id + '<br />Position X: ' + posXR + ' %<br />Position Y: ' + posYR + ' %';
}

document.addEventListener("DOMContentLoaded", function addclick() {

    buttons.forEach(function(target) {
        target.onclick = function(t) {
            // rendre les boutons blancs
            buttons.forEach(function(target) {
                target.style.background = 'white';

            });
            t.target.style.background = colors[t.target.id];
            button = t.target.id;
            if (button === 'C' || button === 'D' || button === 'F'){
                valeurs.Setaction(button);
                console.log(valeurs.getaction()) ; // --> ça marche
            }else{
                getButtonValue();
            }

        }
    });
});


function getButtonValue() {
         window.location.assign("test.php?action="+valeurs.getaction());

}

