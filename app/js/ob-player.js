; 

var playButton = $('#ob-play-button');
var muteButton = $('#ob-mute-button');
var volumeBar = $('#ob-volume-bar');
var loadingIndicator = $('#ob-player-loading');

var isPlaying = false;
var volume = 0.5;
var isMuted = false;
var audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
// var audio;


playButton.click(playRadio);
muteButton.click(muteRadio);

volumeBar.change(function(event) {
    setVolume(event.target.value / 100);
});

volumeBar.on('input', function(event) {
    setVolume(event.target.value / 100);
});

function playRadio() {
    if (audio && !isPlaying) {
        audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
        audio.play();
        audio.addEventListener('canplay', onCanPlay);
        playButton.off('click');
        loadingIndicator.show();
        playButton.toggleClass('ob-button--play');
        
    } else if (audio && isPlaying) {
        audio.pause();
        // clearInterval(songInfoInterval);
        isPlaying = false;
        playButton.toggleClass('ob-button--play');
        playButton.toggleClass('ob-button--pause');
    }
}

function muteRadio() {
    isMuted = !isMuted;
    if (isMuted) {
        audio.volume = 0;
    } else {
        audio.volume = volume;
    }
    muteButton.toggleClass('ob-button--sound-up');
    muteButton.toggleClass('ob-button--mute');
}

var songInfoInterval;

function onCanPlay() {
    audio.volume = volume;
    isPlaying = true;
    playButton.toggleClass('ob-button--pause');
    loadingIndicator.hide();
    playButton.click(playRadio);
}

function setVolume(newVolume) {
    volume = newVolume;
    audio.volume = volume;
}

function updateSongInfo() {
    $.ajax({
        url: "http://radio.oldboybarbershop.com:8080/api/history/?server=1&limit=1&callback=callback&format=jsonp",
        jsonp: "callback", 
        dataType: "jsonp",
        method: "GET", 
        success: function(response) {
            setSongInfo(
                response.objects[0].author,
                response.objects[0].title
            );
        }
    });
}

var authorField = $('.ob-player__author');
var songTitleField = $('.ob-player__song');
function setSongInfo(author, songName) {
    authorField.html(author);
    songTitleField.html(songName);
}

updateSongInfo();
songInfoInterval = setInterval(updateSongInfo, 5000);