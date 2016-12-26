var barLevel = document.getElementById('ob-volume-bar__level');
var barSlider = document.getElementById('ob-volume-bar__slider');

var isMouseDown = false;
var mousePageX;
// var mousePageY;
var barX;

barSlider.addEventListener('mousedown', sliderMouseDown);

barSlider.addEventListener('mouseleave', function() {
    barSlider.style.top = '-10px';
});

barSlider.addEventListener('mouseover', function() {
    barSlider.style.top = '-17px';
});

function sliderMouseDown (event) {
    isMouseDown = true;
    mousePageX = event.pageX;
    // mousePageY = event.pageY;
    barX = barSlider.offsetLeft;
    document.addEventListener('mousemove', docMouseMove);
    document.addEventListener('mouseup', docMouseUp, false);
}

function docMouseMove(event) {
    if (isMouseDown) {
        let dX = event.pageX - mousePageX + barX;
        barSlider.style.left = dX + 'px';
        barSlider.style.top = '-17px';
    }
}

function docMouseUp() {
    barSlider.style.top = '-10px';
    document.removeEventListener('mousemove', docMouseMove, false);
    document.removeEventListener('mouseup', docMouseUp, false);
}

function updateSlider() {
    requestAnimationFrame(function() {
        console.log(document.querySelector('body').clientLeft);
        updateSlider();
    }) 
}

updateSlider();

