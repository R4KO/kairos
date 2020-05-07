const buttons = document.querySelectorAll('.button');

const colors = {
	caresse: '#3acf6e',
	déman: '#3a73cf',
	fix: '#c5cf3a'
}


document.addEventListener("DOMContentLoaded", function addclick() {
	buttons.forEach(function(target) {
		target.onclick = function(t) {
			// rendre les boutons blancs
			buttons.forEach(function(target) {
				target.style.background = 'white';
			});
			t.target.style.background = colors[t.target.id];
		}
	});
});
