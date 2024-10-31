const canvas = document.querySelector("canvas")
const cx = canvas.getContext("2d")

const CANVAS_WIDTH = canvas.width = 300
const CANVAS_HEIGHT = canvas.height = 300

const playerImage = new Image()
playerImage.src = "./img/charlieTheCapybaraAnimationSheet.png"

let n = 0

let gameFrame = 0

const spriteWidth = 64
const spriteHeight = 64

const playerStates = [
    {
        name: "idle",
        maxFrames: 8,
        y: 0,
        staggerFrames: 16
    },
    {
        name: "sitDown",
        maxFrames: 3,
        y: 1,
        staggerFrames: 33
    },
    {
        name: "sittingIdle",
        maxFrames: 8,
        y: 2,
        staggerFrames: 16
    },
    {
        name: "standUp",
        maxFrames: 3,
        y: 3,
        staggerFrames: 33
    },
    {
        name: "leanDown",
        maxFrames: 4,
        y: 4,
        staggerFrames: 31
    },
    {
        name: "munchGrass",
        maxFrames: 8,
        y: 5,
        staggerFrames: 16
    },
    {
        name: "leanUp",
        maxFrames: 4,
        y: 6,
        staggerFrames: 26
    },
    {
        name: "walk",
        maxFrames: 8,
        y: 7,
        staggerFrames: 16
    },
];

playerStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({x: positionX, y: positionY})
    }
})


function animate() {
    if (n < 0 || n > 7) n = 0

    cx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / playerStates[n].staggerFrames) % playerStates[n].maxFrames
    frameX = spriteWidth * position
    
    cx.drawImage(
        playerImage,
        frameX, 
        (n * spriteHeight) + 65, 
        spriteWidth, 
        spriteHeight, 
        (CANVAS_WIDTH / 2) - (spriteWidth / 2), 
        (CANVAS_HEIGHT / 2) - (spriteHeight / 2), 
        spriteWidth, 
        spriteHeight )

        gameFrame++
    requestAnimationFrame(animate)

};

animate()

addEventListener("keydown", ({ key }) => {
    switch (key) {
        case 'ArrowLeft' :
            n += -1
            console.log(playerStates[n].name)
            break
        case 'ArrowRight' :
            n += 1
            console.log(playerStates[n].name)
            break
    }
});