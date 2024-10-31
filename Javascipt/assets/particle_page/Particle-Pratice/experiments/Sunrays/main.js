const canvas = document.getElementById('canvas1')
const cx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gradient = cx.createLinearGradient(0, 0, canvas.width, canvas.height)
gradient.addColorStop(0, 'whitesmoke')
gradient.addColorStop(1, 'black')
cx.fillStyle = gradient
cx.strokeStyle = gradient

class Particle {
    constructor(effect, index){
        this.effect = effect
        this.index = index
        this.radius = Math.floor(Math.random() * 10 + 5)
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2)
        this.vx = Math.random() * 2 - 1
        this.vy = Math.random() * 2 - 1
        this.pushX = 0
        this.pushY = 0
        this.friction = 0.9
    }

    draw(context){
        if (this.index % 5 === 0){
            context.save()
            context.globalAlpha = 0.5
            context.beginPath()
            context.moveTo(this.x, this.y)
            context.lineTo(this.effect.mouse.x, this.effect.mouse.y)
            context.stroke()
            context.restore()
        }
        context.beginPath()
        context.arc(this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        )
        context.fill()
        context.stroke()
    }
    update() {
        if (this.effect.mouse.pressed){
            const dx = this.x - this.effect.mouse.x
            const dy = this.y - this.effect.mouse.y
            const distance = Math.hypot(dx, dy)
            const force = this.effect.mouse.radius / distance
            if (distance < this.effect.mouse.radius){
                const angle = Math.atan2(dy, dx)
                this.pushX += Math.cos(angle) * force
                this.pushY += Math.sin(angle) * force
            }
        }

        this.x += (this.pushX *= this.friction) + this.vx
        this.y += (this.pushY *= this.friction) + this.vy

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
        this.numberOfParticles = 300
        this.createParticles()

        this.mouse = {
            x: this.width / 2,
            y: this.height / 2,
            pressed: false,
            radius: 120
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
            this.particles.push(new Particle(this, i))
        }
    }
    handleParticles(context){
        this.connectParticles(context)
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
        this.context.fillStyle = 'blue'
        const gradient = this.context.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, 'whitesmoke')
        gradient.addColorStop(1, 'black')
        this.context.fillStyle = gradient
        this.context.strokeStyle = gradient
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