/* script.js */
const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const shootingStars = [];
const starCount = 150;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2;
        this.alpha = Math.random();
        this.fade = Math.random() * 0.02;
    }
    update() {
        this.alpha += this.fade;
        if (this.alpha <= 0 || this.alpha >= 1) {
            this.fade = -this.fade;
        }
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ShootingStar {
    constructor() {
        this.x = random(canvas.width * 0.3, canvas.width);
        this.y = random(0, canvas.height * 0.5);
        this.length = random(50, 100);
        this.speed = random(5, 10);
        this.alpha = 1;
    }
    update() {
        this.x -= this.speed;
        this.y += this.speed;
        this.alpha -= 0.02;
    }
    draw() {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y - this.length);
        ctx.stroke();
    }
}

// Create Stars
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Create Moon
const moon = document.createElement("div");
moon.classList.add("moon");
document.body.appendChild(moon);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Twinkling Stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Shooting Stars
    shootingStars.forEach((s, index) => {
        s.update();
        s.draw();
        if (s.alpha <= 0) shootingStars.splice(index, 1);
    });

    if (Math.random() < 0.01) {
        shootingStars.push(new ShootingStar());
    }

    requestAnimationFrame(animate);
}

animate();

// Resize event
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
