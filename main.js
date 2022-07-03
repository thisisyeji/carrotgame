const playBtn = document.querySelector(".fa-play");
const stopBtn = document.querySelector(".fa-square");
const playbox = document.querySelector(".playbox");
const replaybox = document.querySelector(".replaybox");

const bgSound = document.querySelector(".bg__sound");
const timer = document.querySelector(".timer");
const number = document.querySelector(".number");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup p");

const content = document.querySelector(".play__content");
const carrot = document.querySelectorAll(".carrot__img");
const bug = document.querySelectorAll(".bug__img");

const HIDDEN_CLASSNAME = "hidden";
const INVISIBLE_CLASSNAME = "invisible";



playBtn.addEventListener("click", () => {
    resetTimer();
    setTimer();
    random();
    startEvent();

    playBtn.classList.add(HIDDEN_CLASSNAME);
    stopBtn.classList.remove(HIDDEN_CLASSNAME);
});

stopBtn.addEventListener("click", () => {
    resetTimer();
    popUp();
    const alertSound = document.querySelector(".alert__sound");
    alertSound.play();
    replaybox.addEventListener("click", replay);
});



// Timer
let timeLeft = 10;
let timeLoading;
function setTimer() {
    timeLoading = setInterval(start, 1000);
};

function resetTimer() {
    clearInterval(timeLoading);
    timeLeft = 10;
}

function start() {
    timeLeft -= 1;
    if (timeLeft <= 0) {
        lose();
        replaybox.addEventListener("click", replay);
    } else if (timeLeft >= 1 || timeLeft <= 9) {
        timer.innerText = `00 : ${timeLeft}`
    }
};


// Game Start
function startEvent() {
    for (let i = 0; i < carrot.length; i++) {
        carrot[i].addEventListener("click", win);
    };

    for (let i = 0; i < bug.length; i++) {
        bug[i].addEventListener("click", lose);
    };
};


// Game End
function removeEvent() {
    for (let i = 0; i < carrot.length; i++) {
        carrot[i].removeEventListener("click", win);
    };
    for (let i = 0; i < bug.length; i++) {
        bug[i].removeEventListener("click", lose);
    };
};


// Random
function random() {
    const winSound = document.querySelector(".win__sound");
    if (winSound.play) {
        winSound.pause();
        winSound.currentTime = 0;
    };
    bgSound.play();
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
};


// Pop up box
function popUp() {
    number.innerText = ` ${carrot.length}`;
    resetTimer();
    bgSound.pause();
    bgSound.currentTime = 0;
    playbox.classList.add(INVISIBLE_CLASSNAME);
    popup.classList.remove(HIDDEN_CLASSNAME);
    replaybox.addEventListener("click", replay);
    removeEvent();
};

function replay() {
    timer.innerText = "00 : 10";
    resetTimer();
    setTimer();
    random();
    startEvent();
    playbox.classList.remove(INVISIBLE_CLASSNAME);
    popup.classList.add(HIDDEN_CLASSNAME);
    popupText.innerText = `REPLAY ❓`;
}

function lose() {
    resetTimer();
    timer.innerText = "00 : 00";
    const bugSound = document.querySelector(".bug__sound");
    bugSound.play();
    popUp();
    popupText.innerText = `YOU LOSE 🥲`;
};


// Pull carrots or bugs 
let num = carrot.length;
function win(event) {
    const carrotSound = document.querySelector(".carrot__sound");
    if (carrotSound.play) {
        carrotSound.pause();
        carrotSound.currentTime = 0;
    };
    carrotSound.play();
    let e = event.target
    e.classList.add(HIDDEN_CLASSNAME);

    const hidden = document.querySelectorAll(".carrot__img.hidden")
    num = carrot.length - hidden.length;

    number.innerText = ` ${num}`;

    if (num === 0) {
        popUp();
        popupText.innerText = `YOU WIN 🎉`
        const winSound = document.querySelector(".win__sound");
        winSound.play();
    };
};