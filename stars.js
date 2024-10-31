const velocityProbability = Math.random()

let starVelocity = 0

if (velocityProbability < 0.9) starVelocity = 0
    else starVelocity = Math.random() * 0.5

// --- Particle color for stars ---
let particleColorStars = Math.random()
if (particleColorStars < 0.15) {
    particleColorStars = "rgba(255, 255, 255, 0.3)"
} else if (particleColorStars >= 0.15 && particleColorStars < 0.3) {
    particleColorStars = "rgba(255, 255, 255, 0.6)"
} else {
    particleColorStars = "rgba(255, 255, 255, 0.9)"
}

class Star {
    constructor({ position, velocity, radius, color, fades }) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
        }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, 
            this.position.y, 
            this.radius, 0, 
            Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.fades) {
            if (this.opacity < 0.01) this.opacity = 0.6
            else this.opacity -= (0.0001 * (Math.random * 0.001))
        }
    }
};