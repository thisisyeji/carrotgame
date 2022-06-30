const playBtn = document.querySelector(".play__btn");
const timer = document.querySelector(".timer");
const number = document.querySelector(".number");
const audio = document.querySelector(".audio");
const content = document.querySelector(".play__content");

playBtn.addEventListener("click", () => {
    audio.play();
    setTimer();

})



function setTimer() {
    let timeLeft = 10;
    const timeLoading = setInterval(function () {
        if (timeLeft <= 0) {
            timer.innerText = "00 : 00"
            audio.pause();
            audio.currentTime = 0;
            clearInterval(timeLoading)
        } else if (timeLeft < 10) {
            timer.innerText = `00 : 0${timeLeft}`
        }
        timeLeft -= 1;
    }, 1000);
}

function