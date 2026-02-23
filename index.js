/* ===================== */
/* 🎆 BIG FIREWORKS */
/* ===================== */
const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");

fwCanvas.width = innerWidth;
fwCanvas.height = innerHeight;

window.addEventListener("resize", () => {
  fwCanvas.width = innerWidth;
  fwCanvas.height = innerHeight;
});

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.colors = ["#ff4d6d", "#ffd166", "#ff9f1c", "#ff6ec7", "#70e1f5"];

    for (let i = 0; i < 120; i++) {   // 🔥 MORE PARTICLES = BIGGER
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4; // 🔥 STRONGER EXPLOSION
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: Math.random() * 3 + 2 // 🔥 BIGGER SPARKS
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.alpha -= 0.012;
    });
  }

  draw() {
    this.particles.forEach(p => {
      fwCtx.globalAlpha = p.alpha;
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fwCtx.fillStyle = p.color;
      fwCtx.fill();
    });
    fwCtx.globalAlpha = 1;
  }
}

function launchFirework() {
  const x = innerWidth / 2 + (Math.random() * 300 - 150);
  const y = innerHeight * 0.55 + (Math.random() * 100 - 50);
  fireworks.push(new Firework(x, y));
}

setInterval(launchFirework, 1200);

function animateFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(i, 1);
    }
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();


/* ===================== */
/* 🌸 FLOWER PETALS */
/* ===================== */
const petalCanvas = document.getElementById("petals");
const petalCtx = petalCanvas.getContext("2d");

petalCanvas.width = innerWidth;
petalCanvas.height = innerHeight;

window.addEventListener("resize", () => {
  petalCanvas.width = innerWidth;
  petalCanvas.height = innerHeight;
});

let petals = [];

class Petal {
  constructor() {
    this.x = Math.random() * innerWidth;
    this.y = -20;
    this.size = Math.random() * 8 + 6;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    petalCtx.save();
    petalCtx.translate(this.x, this.y);
    petalCtx.rotate(this.rotation * Math.PI / 180);
    petalCtx.globalAlpha = this.opacity;

    petalCtx.fillStyle = "#ffb7c5";
    petalCtx.beginPath();
    petalCtx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
    petalCtx.fill();

    petalCtx.restore();
  }
}

function createPetal() {
  if (petals.length < 80) { // 🌸 density
    petals.push(new Petal());
  }
}

function animatePetals() {
  petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.y > innerHeight + 20) petals.splice(i, 1);
  });
  requestAnimationFrame(animatePetals);
}

setInterval(createPetal, 200);
animatePetals();