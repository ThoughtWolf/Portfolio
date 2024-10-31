const canvas = document.querySelector("canvas")
const scoreEl = document.querySelector("#scoreEl")
const endGameEl = document.querySelector("#endGameEl")
const endGameScoreEl = document.querySelector("#endGameScoreEl")
const endGameYesBtn = document.querySelector("#endGameYesBtn")
const endGameNoBtn = document.querySelector("#endGameNoBtn")
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        )
        ctx.fillStyle = this.color
        ctx.fill()
    }
};

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath() 
        ctx.arc(
            this.x, 
            this.y, 
            this.radius, 
            0, 
            Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
};

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath()
        ctx.arc(
            this.x, 
            this.y, 
            this.radius, 
            0, 
            Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
};

const friction = 0.98

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(
            this.x, 
            this.y, 
            this.radius, 
            0, 
            Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
    }
};

const xMid = canvas.width / 2
const yMid = canvas.height / 2

let player = new Player(
    xMid, 
    yMid, 
    10, 
    "white"
)
let particles = []
let projectiles = []
let enemies = []
let frames = 0
let animationId
let intervalId
let score = 0

function spawnEnemies() {
    intervalId = setInterval(() => {
        const radius = (Math.random() * 30) + 6

        let x
        let y

        if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        }

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(
            yMid - y, 
            xMid - x
        )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

        enemies.push(new Enemy(x, y, radius, color, velocity))

        console.log(enemies)
    }, (Math.random() * 500) + 1000)
};

function init() {
    player = new Player(
        xMid, 
        yMid, 
        10, 
        "white"
    )
    enemies = []
    projectiles = []
    score = 0
    scoreEl.innerHTML = 0
    animationId
}

function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()

    // --- particle update + splice ---
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        if (particle.alpha <= 0) {
            particles.splice(i, 1)
        } else {
            particle.update()
        }
    }

    // --- Projectile Update ---
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update()

        // --- remove from screen edges ---
        if (projectile.x + projectile.radius < 0
            || projectile.x - projectile.radius > canvas.width
            || projectile.y + projectile.radius < 0
            || projectile.y - projectile.radius > canvas.height
        ) {
                projectiles.splice(i, 1)
        }
    }

    // --- Enemy Update ---
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()

        //--- enemy hit player detection ---
        const dist = Math.hypot(
                player.x - enemy.x, 
                player.y - enemy.y)

        // --- End Game ---
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            clearInterval(intervalId)
            endGameEl.style.display = "block"
            endGameScoreEl.innerHTML = score + " pts"
        }

        // --- projectile hit enemy detection ---
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j]
            const dist = Math.hypot(
                projectile.x - enemy.x, 
                projectile.y - enemy.y)
            
            if (dist - enemy.radius - projectile.radius < 1) {

                //--- Creating Particles ---
                for (let k = 0; k < enemy.radius * 2; k++) {
                    particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        (Math.random() * (2.5)) + 0.5,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }
                    ))
                }

                //--- shrink enemy ---
                if (enemy.radius - 15 > 5) {
                    projectiles.splice(j, 1)
                    gsap.to(enemy, {
                        radius: enemy.radius - 15
                    })
                    score += 100
                    scoreEl.innerHTML = " " + score
                //--- remove enemy ---
                } else {
                    score += 150
                    scoreEl.innerHTML = " " + score
                    enemies.splice(i, 1)
                    projectiles.splice(j, 1)
                }
            }
        }
    }
};

addEventListener("click", (event) => {
    const angle = Math.atan2(
        event.clientY - yMid, 
        event.clientX - xMid
    )
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(
        xMid,
        yMid,
        3,
        "white",
        velocity
    ))
});

endGameYesBtn.addEventListener("click", () => {
    init()
    animate()
    spawnEnemies()
    endGameEl.style.display = "none"
});

animate()
spawnEnemies()
