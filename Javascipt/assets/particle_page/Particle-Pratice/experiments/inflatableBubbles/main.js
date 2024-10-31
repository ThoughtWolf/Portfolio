const canvas = document.getElementById('canvas1')
const cx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gradient = cx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, 'pink')
gradient.addColorStop(0.3, 'red')
gradient.addColorStop(0.6, 'magenta')
gradient.addColorStop(1, 'darkorchid')
cx.fillStyle = gradient

class Particle {
    constructor(effect){
        this.effect = effect
        this.radius = Math.floor(Math.random() * 10 + 6)
        this.minRadius = this.radius
        this.maxRadius = this.radius * 5
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
        this.vx = Math.random() * 0.2 - 0.1
        this.vy = Math.random() * 0.2 - 0.1
    }

    draw(context){
        context.fillStyle = gradient
        context.beginPath()
        context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        )
        context.fill()
        context.stroke()

        context.fillStyle = 'white'
        context.beginPath()
        context.arc(
            this.x - this.radius * 0.2,
            this.y - this.radius * 0.3,
            this.radius * 0.6,
            0,
            Math.PI * 2
        )
        context.fill()
    }
    update() {
        if (this.effect.mouse.pressed){
            const dx = this.x - this.effect.mouse.x
            const dy = this.y - this.effect.mouse.y
            const distance = Math.hypot(dx, dy)
            if (distance < this.effect.mouse.radius && this.radius < this.maxRadius){
                this.radius += 2
            }
        }

        if (this.radius > this.minRadius) this.radius -= 0.1

        this.x += this.vx
        this.y += this.vy

        if (this.x < this.radius){
            this.x = this.radius
            this.vx *= -1
        } else if (this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius
            this.vx *= -1
        }

        if (this.y < this.radius){
            this.y = this.radius
            this.vy *= -1
        } else if (this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius
            this.vy *= -1
        }
    }
    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
    }
};

class Effect {
    constructor(canvas, context){
        this.canvas = canvas
        this.context = context
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = []
        this.numberOfParticles = 700
        this.createParticles()

        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 60
        }

        addEventListener('resize', (e) => {
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
        })
        
        addEventListener('mousemove', (e) => {
            if (this.mouse.pressed){
                this.mouse.x = e.x
                this.mouse.y = e.y
            }
        })

        addEventListener('mousedown', (e) => {
            this.mouse.pressed = true
            this.mouse.x = e.x
            this.mouse.y = e.y
        })

        addEventListener('mouseup', (e) => {
            this.mouse.pressed = false
        })
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this))
        }
    }
    handleParticles(context){
        //this.connectParticles(context)
        this.particles.forEach((particle) => {
            particle.draw(context)
            particle.update()
        })
    }
    connectParticles(context){
        const maxDistance = 100
        for (let a = 0; a < this.particles.length; a++){
            for (let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x
                const dy = this.particles[a].y - this.particles[b].y
                const distance = Math.hypot(dx, dy)
                if (distance < maxDistance){
                    context.save()
                    const opacity = 1 - (distance / maxDistance)
                    context.globalAlpha = opacity
                    context.beginPath()
                    context.moveTo(this.particles[a].x, this.particles[a].y)
                    context.lineTo(this.particles[b].x, this.particles[b].y)
                    context.stroke()
                    context.restore()
                }
            }
        }
    }
    resize(width, height){
        this.canvas.width = width
        this.canvas.height = height
        this.width = width
        this.height = height
        const gradient = cx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'pink')
        gradient.addColorStop(0.3, 'red')
        gradient.addColorStop(0.6, 'magenta')
        gradient.addColorStop(1, 'darkorchid')
        this.context.fillStyle = gradient
        this.particles.forEach((particle) => {
            particle.reset()
        })
    }
};

const effect = new Effect(canvas, cx)
effect.handleParticles(cx)

function animate(){
    requestAnimationFrame(animate)
    cx.clearRect(0, 0, canvas.width, canvas.height)

    effect.handleParticles(cx)
};

animate()