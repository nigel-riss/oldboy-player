; 

function playRadio() {
    var audio = new Audio("http://radio.oldboybarbershop.com:8000/radio");
    audio.play();
    audio.volume = 0.01;
}

playRadio();