; 
var audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
var playButton = document.querySelector('.ob-button--play');

playButton.onclick = playRadio;
var isPlaying = false;

function playRadio() {
    if (audio && !isPlaying) {
        audio.play();
        isPlaying = true;
    } else if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;
    }
}

// playRadio();