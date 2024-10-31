const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const poi = document.getElementById("poi-1")
const poii = document.getElementById("poi-2")
const poiii = document.getElementById("poi-3")
const poiv = document.getElementById("poi-4")

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
            window.location.href = "../Javascipt/index.html";
        },
    });
});

nextBtn.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "../questionaire/index.html";
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
                radius: Math.random(),
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

poi.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "./assets/Relational_Database.PNG";
        },
    });
});

poii.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "./assets/Full Stack - Backend and database Development.pdf";
        },
    });
});

poiii.addEventListener("click", (e) => {
    gsap.to("#body", {
        opacity: 0,
        duration: 1,
        ease: "power1.in",
        onComplete: () => {
            window.location.href = "./assets/Full Stack - CalTech.pdf";
        },
    });
});
