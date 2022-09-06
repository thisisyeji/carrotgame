# Carrot Game 🥕

This is a toy project using HTML, CSS and JavaScript.

## Table of contents

-   [Overview](#overview)
    -   [Function](#function)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
-   [Author](#author)

## Overview

### Function

Users should be able to:

-   Pull all carrots within 10 seconds
-   Avoid pulling bugs

### Screenshot

![screenshot](./img/screenshot.png)
![screenshot__Win](./img/screenshot_win.png)
![screenshot__Lose](./img/screenshot_lose.png)

### Links

-   Live Site URL: [https://thisisyeji.github.io/carrotgame/](https://thisisyeji.github.io/carrotgame/)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS
-   JavaScript

### What I learned

-   clearInterval

```js
function resetTimer() {
	clearInterval(timeLoading);
	timeLeft = 10;
}
```

-   removeEventListener

```js
function removeEvent() {
	for (let i = 0; i < carrot.length; i++) {
		carrot[i].removeEventListener('click', win);
	}
	for (let i = 0; i < bug.length; i++) {
		bug[i].removeEventListener('click', lose);
	}
}
```

## Author

-   Website - [Yeji Kim](https://github.com/yjkim0109)
