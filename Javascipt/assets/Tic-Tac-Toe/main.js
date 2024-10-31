const box1 = document.getElementById("box1")
const box2 = document.getElementById("box2")
const box3 = document.getElementById("box3")
const box4 = document.getElementById("box4")
const box5 = document.getElementById("box5")
const box6 = document.getElementById("box6")
const box7 = document.getElementById("box7")
const box8 = document.getElementById("box8")
const box9 = document.getElementById("box9")
const grid = document.getElementById("grid")
const modal = document.getElementById("modalContainer")
const restart = document.getElementById("restart")
const gameWinner = document.getElementById("endGame")

let count = 1

let gridBox = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]

box1.addEventListener('click', () => {
    if (box1.innerHTML != "" || gameEnd === true) {
        box1.innerHTML = box1.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box1.innerHTML = "O"
        count += 1
        gridBox[0] = "O"
    } else {
        box1.innerHTML = "X"
        count += 1
        gridBox[0] = "X"
    }
    checkAcross(0)
    checkDown(0)
    checkDiagL(0)
});

box2.addEventListener('click', () => {
    if (box2.innerHTML != "" || gameEnd === true) {
        box2.innerHTML = box2.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box2.innerHTML = "O"
        count += 1
        gridBox[1] = "O"
    } else {
        box2.innerHTML = "X"
        count += 1
        gridBox[1] = "X"
    }
    checkAcross(0)
    checkDown(1)
});

box3.addEventListener('click', () => {
    if (box3.innerHTML != "" || gameEnd === true) {
        box3.innerHTML = box3.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box3.innerHTML = "O"
        count += 1
        gridBox[2] = "O"
    } else {
        box3.innerHTML = "X"
        count += 1
        gridBox[2] = "X"
    }
    checkAcross(0)
    checkDown(2)
    checkDiagR(2)
});

box4.addEventListener('click', () => {
    if (box4.innerHTML != "" || gameEnd === true) {
        box4.innerHTML = box4.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box4.innerHTML = "O"
        count += 1
        gridBox[3] = "O"
    } else {
        box4.innerHTML = "X"
        count += 1
        gridBox[3] = "X"
    }
    checkAcross(3)
    checkDown(0)
});

box5.addEventListener('click', () => {
    if (box5.innerHTML != "" || gameEnd === true) {
        box5.innerHTML = box5.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box5.innerHTML = "O"
        count += 1
        gridBox[4] = "O"
    } else {
        box5.innerHTML = "X"
        count += 1
        gridBox[4] = "X"
    }
    checkAcross(3)
    checkDown(1)
    checkDiagL(0)
    checkDiagR(2)
});

box6.addEventListener('click', () => {
    if (box6.innerHTML != "" || gameEnd === true) {
        box6.innerHTML = box6.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box6.innerHTML = "O"
        count += 1
        gridBox[5] = "O"
    } else {
        box6.innerHTML = "X"
        count += 1
        gridBox[5] = "X"
    }
    checkAcross(3)
    checkDown(2)
});

box7.addEventListener('click', () => {
    if (box7.innerHTML != "" || gameEnd === true) {
        box7.innerHTML = box7.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box7.innerHTML = "O"
        count += 1
        gridBox[6] = "O"
    } else {
        box7.innerHTML = "X"
        count += 1
        gridBox[6] = "X"
    }
    checkAcross(6)
    checkDown(0)
    checkDiagR(2)
});

box8.addEventListener('click', () => {
    if (box8.innerHTML != "" || gameEnd === true) {
        box8.innerHTML = box8.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box8.innerHTML = "O"
        count += 1
        gridBox[7] = "O"
    } else {
        box8.innerHTML = "X"
        count += 1
        gridBox[7] = "X"
    }
    checkAcross(6)
    checkDown(1)
});

box9.addEventListener('click', () => {
    if (box9.innerHTML != "" || gameEnd === true) {
        box9.innerHTML = box9.innerHTML
        count += 0
    }
    else if (count % 2 === 0) {
        box9.innerHTML = "O"
        count += 1
        gridBox[8] = "O"
    } else {
        box9.innerHTML = "X"
        count += 1
        gridBox[8] = "X"
    }
    checkAcross(6)
    checkDown(2)
    checkDiagL(0)
});

//---- WIN CHECKING -----

let gameEnd = false

let win = false

function checkAcross(i) {
    if (!gameEnd) {
        if (gridBox[i] === "X" && gridBox[i+1] === "X" && gridBox[i+2] === "X") {
            modal.style.display = "block"
            gameWinner.innerHTML = "X Wins"
            return win = true
        } else if (gridBox[i] === "O" && gridBox[i+1] === "O" && gridBox[i+2] === "O") {
            modal.style.display = "block"
            gameWinner.innerHTML = "O Wins"
            return win = true
        } else {
            return win = false
        }
    } else {
        return
    }
};

function checkDown(i) {
    if (!gameEnd) {
        if (gridBox[i] === "X" && gridBox[i+3] === "X" && gridBox[i+6] === "X") {
            modal.style.display = "block"
            gameWinner.innerHTML = "X Wins"
            return win = true
        } else if (gridBox[i] === "O" && gridBox[i+3] === "O" && gridBox[i+6] === "O") {
            modal.style.display = "block"
            gameWinner.innerHTML = "O Wins"
            return win = true
        } else {
            return win = false
        }
    } else {
        return
    }
};

function checkDiagL(i) {
    if (!gameEnd) {
        if (gridBox[i] === "X" && gridBox[i+4] === "X" && gridBox[i+8] === "X") {
            modal.style.display = "block"
            gameWinner.innerHTML = "X Wins"
            return win = true
        } else if (gridBox[i] === "O" && gridBox[i+4] === "O" && gridBox[i+8] === "O") {
            modal.style.display = "block"
            gameWinner.innerHTML = "O Wins"
            return win = true
        } else {
            return win = false
        }
    } else {
        return
    }
};

function checkDiagR(i) {
    if (!gameEnd) {
        if (gridBox[i] === "X" && gridBox[i+2] === "X" && gridBox[i+4] === "X") {
            modal.style.display = "block"
            gameWinner.innerHTML = "X Wins"
            return win = true
        } else if (gridBox[i] === "O" && gridBox[i+2] === "O" && gridBox[i+4] === "O") {
            modal.style.display = "block"
            gameWinner.innerHTML = "O Wins"
            return win = true
        } else {
            return win = false
        }
    } else {
        return
    }
};

let frame = 0

function animate() {
    let go = requestAnimationFrame(animate)

    frame++

    if (win === true) {
        cancelAnimationFrame(go)
        gameEnd = true
    }

    if (!gameEnd && count >= 10) {
        gameEnd = true
        modal.style.display = "block"
        gameWinner.innerHTML = "Tie Game"
        cancelAnimationFrame(go)
    }
};

animate()

function restartGame() {
    gridBox = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]

    box1.innerHTML = ""
    box2.innerHTML = ""
    box3.innerHTML = ""
    box4.innerHTML = ""
    box5.innerHTML = ""
    box6.innerHTML = ""
    box7.innerHTML = ""
    box8.innerHTML = ""
    box9.innerHTML = ""

    modal.style.display = "none"
    count = 1
    gameEnd = false
    win = false
    animate()
    console.log(count)
}

restart.addEventListener("click", () => {
    restartGame()
})
