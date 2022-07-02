const playBtn = document.querySelector(".fa-play");
const stopBtn = document.querySelector(".fa-square");
const playbox = document.querySelector(".playbox")
const replaybox = document.querySelector(".replaybox")

const timer = document.querySelector(".timer");
const audio = document.querySelector(".audio");
const number = document.querySelector(".number");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup p");
const content = document.querySelector(".play__content");

const carrot = document.querySelectorAll(".carrot__img");
const bug = document.querySelectorAll(".bug__img");

const HIDDEN_CLASSNAME = "hidden";
const INVISIBLE_CLASSNAME = "invisible";



playBtn.addEventListener("click", () => {
    audio.play();
    clearInterval(timeLoading);
    timeLoading = setInterval(setTimer, 1000)
    random();
    playBtn.classList.add(HIDDEN_CLASSNAME);
    stopBtn.classList.remove(HIDDEN_CLASSNAME);
});

stopBtn.addEventListener("click", () => {
    // clearInterval(timeLoading);
    audio.pause();
    audio.currentTime = 0;
    playbox.classList.add(INVISIBLE_CLASSNAME);
    popup.classList.remove(HIDDEN_CLASSNAME);

    replaybox.addEventListener("click", replay);
});


for (let i = 0; i < carrot.length; i++) {
    carrot[i].addEventListener("click", win);
}

for (let i = 0; i < bug.length; i++) {
    bug[i].addEventListener("click", lose);
}




let timeLeft = 10;
let timeLoading
function setTimer() {
    timeLeft -= 1;
    if (timeLeft <= 0) {
        lose();
        replaybox.addEventListener("click", replay);
    } else if (timeLeft >= 1 || timeLeft <= 9) {
        timer.innerText = `00 : ${timeLeft}`
    }
};


function random() {
    for (let i = 0; i < carrot.length; i++) {
        const element = carrot[i];
        element.classList.remove(HIDDEN_CLASSNAME);
        const width = content.clientWidth - 60;
        const height = content.clientHeight - 60;
        const heightValue = Math.floor(Math.random() * width);
        const widthValue = Math.floor(Math.random() * height);

        element.style.top = `${widthValue}px`;
        element.style.left = `${heightValue}px`;
    }
    for (let i = 0; i < bug.length; i++) {
        const element = bug[i];
        element.classList.remove(HIDDEN_CLASSNAME);
        const width = content.clientWidth - 60;
        const height = content.clientHeight - 60;
        const heightValue = Math.floor(Math.random() * width);
        const widthValue = Math.floor(Math.random() * height);

        element.style.top = `${widthValue}px`;
        element.style.left = `${heightValue}px`;
    }
}

function replay() {
    timer.innerText = "00 : 10"
    setTimer();
    random();
    audio.play();
    playbox.classList.remove(INVISIBLE_CLASSNAME);
    popup.classList.add(HIDDEN_CLASSNAME);
}


function lose() {
    timer.innerText = "00 : 00"
    audio.pause();
    audio.currentTime = 0;
    clearInterval(timeLoading)

    popup.classList.remove(HIDDEN_CLASSNAME);
    playbox.classList.add(INVISIBLE_CLASSNAME);
    popupText.innerText = `YOU LOSE 🥲`
};




function win(event) {
    let parent = [...event.target.parentElement.children];
    let num = parent.length;
    let e = event.target;
    console.log(e);
    e.remove();

    number.innerText = ` ${num - 1}`;

    if (num - 1 === 0) {
        audio.pause();
        audio.currentTime = 0;
        playbox.classList.add(INVISIBLE_CLASSNAME);
        popup.classList.remove(HIDDEN_CLASSNAME);
        popupText.innerText = `YOU WIN 🎉`
    }
};
