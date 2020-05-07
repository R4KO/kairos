const path = "./img/body/";
const bodySection = document.getElementsByTagName('svg');
const humanBody = document.querySelector('#human-body');

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
		
		// vider le div human-body
		while(humanBody.firstChild) {
			humanBody.removeChild(humanBody.firstChild);
		}

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
	humanBody.appendChild(image);
}