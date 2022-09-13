'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
});

popUpRefresh.addEventListener('click', () => {
	startGame();
	hidePopup();
});

function startGame() {
	started = true;
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
	playSound(bgSound);
}

function stopGame() {
	started = false;
	stopGameTimer();
	hideGameButton();
	showPopUpWithText('REPLAY❓');
	playSound(alertSound);
	stopSound(bgSound);
}

function finishGame(win) {
	started = false;
	hideGameButton();
	if (win) {
		playSound(winSound);
	} else {
		playSound(bugSound);
	}
	stopGameTimer();
	stopSound(bgSound);
	showPopUpWithText(win ? 'YOU WON 🥳' : 'YOU LOST 💩');
}

function showStopButton() {
	const icon = gameBtn.querySelector('.fas');
	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');
	gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
	gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
	gameTimer.style.visibility = 'visible';
	gameScore.style.visibility = 'visible';
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			finishGame(CARROT_COUNT === score);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
	popUpText.innerText = text;
	popUp.classList.remove('pop-up--hide');
}

function hidePopup() {
	popUp.classList.add('pop-up--hide');
}

function initGame() {
	score = 0;
	field.innerHTML = '';
	gameScore.innerText = CARROT_COUNT;
	// 벌레와 당근을 생성한 뒤 field에 추가해줌
	addItem('carrot', CARROT_COUNT, 'img/carrot.png');
	addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
	if (!started) {
		return;
	}
	const target = event.target;
	if (target.matches('.carrot')) {
		// 당근!
		target.remove();
		score++;
		playSound(carrotSound);
		updateScoreBoard();
		if (score === CARROT_COUNT) {
			finishGame(true);
		}
	} else if (target.matches('.bug')) {
		finishGame(false);
	}
}

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

function stopSound(sound) {
	sound.pause();
}

function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - CARROT_SIZE;
	const y2 = fieldRect.height - CARROT_SIZE;
	for (let i = 0; i < count; i++) {
		const item = document.createElement('img');
		item.setAttribute('class', className);
		item.setAttribute('src', imgPath);
		item.style.position = 'absolute';
		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

/*
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

*/
