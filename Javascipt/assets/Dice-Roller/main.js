const rollBtn = document.getElementById("rollBtn")
const diceSprite = document.getElementById("diceImg")

let num = null

function diceAnimate() {
    diceSprite.src = "./img/Dice/Dice/diceGreen1.png"
    setTimeout(() => {
        diceSprite.src = "./img/Dice/Dice/diceGreen2.png"
    }, 100)
    setTimeout(() => {
        diceSprite.src = "./img/Dice/Dice/diceGreen3.png"
    }, 200)
    setTimeout(() => {
        diceSprite.src = "./img/Dice/Dice/diceGreen4.png"
    }, 300)
    setTimeout(() => {
        diceSprite.src = "./img/Dice/Dice/diceGreen5.png"
    }, 400)
    setTimeout(() => {
        diceSprite.src = "./img/Dice/Dice/diceGreen6.png"
    }, 500)
};

function randomNum() {
    num = Math.floor((Math.random() * 6) + 1)
    if (num === 1) diceSprite.src = "./img/Dice/Dice/diceGreen1.png"
    if (num === 2) diceSprite.src = "./img/Dice/Dice/diceGreen2.png"
    if (num === 3) diceSprite.src = "./img/Dice/Dice/diceGreen3.png"
    if (num === 4) diceSprite.src = "./img/Dice/Dice/diceGreen4.png"
    if (num === 5) diceSprite.src = "./img/Dice/Dice/diceGreen5.png"
    if (num === 6) diceSprite.src = "./img/Dice/Dice/diceGreen6.png"
};

//-------- AUDIO --------

Howler.volume(0.3)

const sound = new Howl({
    src: ["./audio/click_2.mp3"]
})

//-------- EVENTS ---------

rollBtn.addEventListener('click',(e) => {
    sound.play()
    diceAnimate()
    setTimeout(() => {
        randomNum()
    }, 600)
    console.log(num)
});