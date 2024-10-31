const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submit")
const cName = document.getElementById("Cname")
const portFeedback = document.getElementById("PortFeedback")
const learningText = document.getElementById("Learning")
const email = document.getElementById("email")
const betterFitText = document.getElementById("BetterFit")


// --- Canvas Boilerplate ---
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.addEventListener("DOMContentLoaded", (e) => {
    gsap.fromTo("#body", {
        opacity: 0,
    },{
        opacity: 1,
        duration: 1,
        ease: "power1",
    });
});

prevBtn.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "../SQL/index.html";
        },
    });
});

nextBtn.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "../homepage/index.html";
        },
    });
});

let stars = []

for (let i = 0; i < 150; i++) {
        let randBool = Math.random() < 0.8
        stars.push(
            new Star({
                position: {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                radius: Math.random() + 0.1,
                color: particleColorStars,
                fades: randBool
            })
        )
};

addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    stars.forEach((star, i) => {
        if (mouseX > canvas.width / 2) star.position.x += 0.1
        if (mouseX < canvas.width / 2) star.position.x -= 0.1
        if (mouseY > canvas.height / 2) star.position.y += 0.1
        if (mouseY < canvas.height / 2) star.position.y -= 0.1
        else star.position = star.position
    })
});

function init() {
    frames = 0
};

init();

function animate() {
    requestAnimationFrame(animate)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    stars.forEach((star, i) => {
        star.update()
    }) 
    
    frames++
};

animate();

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const templateParams = {
        from_name: cName.value,
        message_one: portFeedback.value,
        message_two: learningText.value,
        message_three: betterFitText.value,
        from_email: email.value
    }

    emailjs.send('service_m7fcwp9', 'template_cj4rpkl', templateParams).then(
        (result) => {
            console.log("Success")
            console.log(templateParams.from_name)
            alert("Thank you for your feedback.")
        }, 
        (error) => {
            console.log("Failed...")
            alert("error")
        })

    cName.value = ""
    portFeedback.value = ""
    learningText.value = ""
    email.value = ""
    betterFitText.value = ""
});
