; 
var audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
var audio;
var playButton = document.getElementById('ob-play-button');
var muteButton = document.getElementById('ob-mute-button');

var isPlaying = false;
playButton.onclick = playRadio;
var volume = 1;
var isMuted = false;
muteButton.onclick = muteRadio;

function playRadio() {
    if (audio && !isPlaying) {
        audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
        audio.play();
        isPlaying = true;

    } else if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;
    }
}

function muteRadio() {
    isMuted = !isMuted;
    if (isMuted) {
        audio.volume = 0;
    } else {
        audio.volume = volume;
    }
}