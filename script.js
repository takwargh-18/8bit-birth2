const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

let step = 0;
let showText = false;
const message = "สุขสันต์วันเกิด บัง พลอย ซู่ลิ่ง 🎉";
const textColor = "#ffc0cb"; // pink pastel

// 💧 Rain
const raindrops = Array.from({ length: 150 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  len: Math.random() * 20 + 10,
  speed: Math.random() * 2 + 1
}));

// 🎆 Fireworks
let fireworks = [];

function triggerFireworks() {
  for (let i = 0; i < 10; i++) {
    const fx = Math.random() * W;
    const fy = Math.random() * H * 0.5;
    for (let j = 0; j < 30; j++) {
      fireworks.push({
        x: fx,
        y: fy,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 1,
        radius: 0,
        life: 0,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`
      });
    }
  }
}

// 🎂 เค้ก strawberry 1 ชั้น
function drawCake() {
  const baseX = W / 2 - 60;
  const baseY = H - 150;

  // เค้กชั้นล่าง
  ctx.fillStyle = "#ffb6c1"; // strawberry pink
  ctx.fillRect(baseX, baseY, 120, 40);

  // วิปครีมด้านบน
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(baseX + 20 * i + 10, baseY, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // เทียน
  ctx.fillStyle = "#ff0";
  ctx.fillRect(W / 2 - 5, baseY - 30, 10, 30);

  // เปลวไฟ
  ctx.beginPath();
  ctx.arc(W / 2, baseY - 35, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#f90";
  ctx.fill();
}

// 🏙️ Background pixel-like
function drawBackground() {
  ctx.fillStyle = "#0a0a23";
  ctx.fillRect(0, 0, W, H);

  // ตึก
  const count = 10;
  for (let i = 0; i < count; i++) {
    const bw = W / count * 0.9;
    const bh = 150 + Math.random() * 100;
    const x = i * (W / count) + 10;
    const y = H - bh;
    ctx.fillStyle = "#2a3c58";
    ctx.fillRect(x, y, bw, bh);

    // หน้าต่าง
    for (let j = 0; j < 4; j++) {
      const wx = x + 10 + j * 20;
      const wy = y + 20;
      ctx.fillStyle = Math.random() > 0.5 ? "#4faaff" : "#1c2a45";
      ctx.fillRect(wx, wy, 10, 10);
    }
  }

  // พระจันทร์
  ctx.beginPath();
  ctx.arc(W - 60, 80, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#ddd";
  ctx.fill();
}

// 🌧️ ฝน
function drawRain() {
  ctx.strokeStyle = "#4a6ea9";
  ctx.lineWidth = 1;
  raindrops.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x, r.y + r.len);
    ctx.stroke();
    r.y += r.speed;
    if (r.y > H) {
      r.y = -r.len;
      r.x = Math.random() * W;
    }
  });
}

// 🎆 Fireworks
function drawFireworks() {
  fireworks.forEach(p => {
    const dx = Math.cos(p.angle) * p.speed;
    const dy = Math.sin(p.angle) * p.speed;
    p.x += dx;
    p.y += dy;
    p.life++;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });

  fireworks = fireworks.filter(p => p.life < 60);
}

// 📝 ข้อความ
function drawText() {
  ctx.fillStyle = textColor;
  ctx.font = "28px 'Courier New'";
  ctx.textAlign = "center";
  ctx.fillText(message, W / 2, H / 2 + 160);
}

// ⏱️ Animation Main Loop
function animate() {
  ctx.clearRect(0, 0, W, H);
  drawBackground();
  drawRain();

  if (step < 100) {
    drawCake();
  }

  if (step === 100) {
    triggerFireworks();
  }

  if (step >= 100) {
    drawFireworks();
  }

  if (step > 160) {
    showText = true;
  }

  if (showText) {
    drawText();
  }

  step++;
  requestAnimationFrame(animate);
}

animate();

