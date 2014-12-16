$(".video").vide("assets/video/grecha");
var music = document.getElementById('music'); // id for audio element
var pButton = document.getElementById('pButton');
//Play and Pause

function pause() {
	console.log(music.paused);
	// start music
	if (music.paused) {
		music.play();
		// remove play, add pause
		pButton.className = "ion-volume-high";
	} else { // pause music
		music.pause();
		// remove pause, add play
		pButton.className = "ion-android-volume-mute";
	}
}

