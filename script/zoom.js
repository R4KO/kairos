const path = "./img/body/";
const bodySection = document.getElementsByTagName('svg');
const humanBody = document.querySelector('#avatar');
const imageSection = document.querySelector('#img');

console.log(humanBody);

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
		if(element == null) {
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
	image.className = "bodyImage";
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