const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0, lives = 3, level = 1, gameRunning = false;
let gameStarted = false;
let notifications = [];
let playerRicochetChance = 0;
let stars = [];
let bullets = [];
let enemyBullets = [];
let enemies = [];
let explosions = [];
let powerups = [];
let skillEnergy = 0;
const skillEnergyMax = 100;
let skillSpaceWasDown = false;
let keys = {};
let lastEnemySpawn = 0;
let enemySpawnInterval = 1500;
const maxEnemies = 7;
let lastShot = 0;
const baseShootInterval = 400;
let playerAtkSpeed = 1.0;
let playerBulletSpeed = 5;
let playerEnergyRegenEfficiency = 1.0;
let playerPierceChance = 0;

// 玩家飞机（使用 Claude logo）
const player = {
	x: canvas.width / 2,
	y: canvas.height - 80,
	w: 56,
	h: 56,
	speed: 1,
	img: new Image(),
	imgLoaded: false,
	bulletCount: 1,
	ricochetChance: 0,
	shieldActive: false,
	shieldHits: 0,
	shieldExpiry: 0,
	parryActive: false,
	parryStart: 0,
	parryCooldownUntil: 0,
	tilt: 0,
	targetTilt: 0
};

// 加载 Claude logo
player.img.crossOrigin = 'anonymous';
player.img.onload = () => { player.imgLoaded = true; };
player.img.onerror = () => { player.imgLoaded = false; };
player.img.src = 'assets/textures/claude.png';

// 生成星空背景
for (let i = 0; i < 120; i++) {
	stars.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		r: Math.random() * 1.5 + 0.3,
		speed: Math.random() * 1.5 + 0.3,
		brightness: Math.random()
	});
}

document.addEventListener('keydown', e => {
	keys[e.key] = true;
	if (!gameStarted && (e.key === 'Enter' || e.key === ' ' || e.key === 'Space' || e.key === 'Spacebar')) {
		beginGame();
	}
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
canvas.addEventListener('click', () => {
	if (!gameStarted) beginGame();
});

function spawnEnemy() {
	let spawnPool;
	if (level < 2) {
		spawnPool = ['normal'];
	} else if (level < 4) {
		spawnPool = ['normal', 'fast'];
	} else if (level < 6) {
		spawnPool = ['normal', 'fast', 'tank'];
	} else {
		// 降低哨兵生成权重：从原本约 25% 降到约 12.5%
		spawnPool = ['normal', 'normal', 'fast', 'fast', 'tank', 'tank', 'tank', 'sentry'];
	}
	const type = spawnPool[Math.floor(Math.random() * spawnPool.length)];
	const lvlBonus = Math.floor((level - 1) / 2);
	const tankHp = 3 + lvlBonus * 2 * 2;
	let cfg = {
		normal: { w: 40, h: 40, hp: 1 + lvlBonus * 2, speed: 0.6 + level * 0.08, color: '#e74c3c', score: 10, shootChance: 0.003 },
		fast: { w: 30, h: 30, hp: 1 + lvlBonus, speed: 1.2 + level * 0.12, color: '#e67e22', score: 20, shootChance: 0.002 },
		tank: { w: 52, h: 52, hp: tankHp, speed: 0.4 + level * 0.04, color: '#8e44ad', score: 40, shootChance: 0.004 },
		sentry: { w: 58, h: 58, hp: tankHp * 1.5, speed: 0, color: '#16a085', score: 80, shootChance: 0.008, shootInterval: 1250, aimedShot: true, guaranteedDrop: true }
	}[type];
	enemies.push({
		x: Math.random() * (canvas.width - cfg.w) + cfg.w / 2,
		y: type === 'sentry' ? cfg.h / 2 + 18 : -cfg.h,
		...cfg, type,
		maxHp: cfg.hp,
		lastShot: -Infinity
	});
}

function drawThrusterFlame(x, y, direction, size, color) {
	const time = performance.now() * 0.012;
	const flicker = 0.75 + Math.sin(time + x * 0.05) * 0.18 + Math.random() * 0.16;
	const flameLength = size * (1.1 + flicker * 0.9);
	const flameWidth = size * (0.45 + flicker * 0.25);
	const tipX = x + Math.cos(direction) * flameLength;
	const tipY = y + Math.sin(direction) * flameLength;
	const sideAngle = direction + Math.PI / 2;

	ctx.save();
	ctx.globalCompositeOperation = 'lighter';
	ctx.shadowColor = '#ff8c00';
	ctx.shadowBlur = 16;

	// 外层推进火焰
	ctx.beginPath();
	ctx.moveTo(x + Math.cos(sideAngle) * flameWidth, y + Math.sin(sideAngle) * flameWidth);
	ctx.lineTo(tipX, tipY);
	ctx.lineTo(x - Math.cos(sideAngle) * flameWidth, y - Math.sin(sideAngle) * flameWidth);
	ctx.closePath();
	const outer = ctx.createRadialGradient(x, y, 0, tipX, tipY, flameLength);
	outer.addColorStop(0, '#fff4a3');
	outer.addColorStop(0.35, '#ffae00');
	outer.addColorStop(1, 'rgba(255, 64, 0, 0)');
	ctx.fillStyle = outer;
	ctx.fill();

	// 内层高亮焰心
	ctx.beginPath();
	ctx.moveTo(x + Math.cos(sideAngle) * flameWidth * 0.42, y + Math.sin(sideAngle) * flameWidth * 0.42);
	ctx.lineTo(x + Math.cos(direction) * flameLength * 0.62, y + Math.sin(direction) * flameLength * 0.62);
	ctx.lineTo(x - Math.cos(sideAngle) * flameWidth * 0.42, y - Math.sin(sideAngle) * flameWidth * 0.42);
	ctx.closePath();
	ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
	ctx.fill();

	ctx.restore();
}

function drawPlayer() {
	drawThrusterFlame(player.x, player.y + player.h / 2 - 4, Math.PI / 2 + player.tilt * 0.25, player.w * 0.32, '#d97706');
	ctx.save();
	ctx.translate(player.x, player.y);
	ctx.rotate(player.tilt);
	if (player.imgLoaded) {
		// 发光效果
		ctx.shadowColor = '#d97706';
		ctx.shadowBlur = 18;
		ctx.drawImage(player.img, -player.w / 2, -player.h / 2, player.w, player.h);
	} else {
		// 备用：橙色六边形
		ctx.shadowColor = '#d97706'; ctx.shadowBlur = 18;
		ctx.fillStyle = '#d97706';
		ctx.beginPath();
		for (let i = 0; i < 6; i++) {
			const a = (Math.PI / 3) * i - Math.PI / 6;
			ctx.lineTo(Math.cos(a) * 24, Math.sin(a) * 24);
		}
		ctx.closePath(); ctx.fill();
	}
	ctx.restore();
	// 格挡护盾视觉
	if (player.parryActive) {
		const now = performance.now();
		const elapsed = now - player.parryStart;
		const perfect = elapsed < 200;
		const alpha = perfect ? 0.45 : 0.22;
		const fillColor = perfect ? `rgba(0,255,255,${alpha})` : `rgba(80,160,255,${alpha})`;
		const glowColor = perfect ? '#00ffff' : '#50a0ff';
		const outerR = player.w * 0.7;
		const innerR = player.w * 0.6;
		const centralAngle = 120;
		const startAngle = (-90 - centralAngle / 2) * Math.PI / 180;  // -190° = 170°
		const endAngle = (-90 + centralAngle / 2) * Math.PI / 180;  // +10°
		ctx.save();
		ctx.shadowColor = glowColor;
		ctx.shadowBlur = perfect ? 28 : 14;
		ctx.beginPath();
		ctx.arc(player.x, player.y, outerR, startAngle, endAngle);
		ctx.arc(player.x, player.y, innerR, endAngle, startAngle, true);
		ctx.closePath();
		ctx.fillStyle = fillColor;
		ctx.fill();
		ctx.strokeStyle = glowColor;
		ctx.lineWidth = perfect ? 2.5 : 1.5;
		ctx.stroke();
		ctx.restore();
	}
}

function drawEnemy(e) {
	drawThrusterFlame(e.x, e.y - e.h / 2 + 4, -Math.PI / 2, e.w * 0.28, e.color);
	ctx.save();
	ctx.shadowColor = e.color; ctx.shadowBlur = 10;
	// 机身
	ctx.fillStyle = e.color;
	ctx.beginPath();
	ctx.moveTo(e.x, e.y + e.h / 2);
	ctx.lineTo(e.x - e.w / 2, e.y - e.h / 2);
	ctx.lineTo(e.x, e.y - e.h / 4);
	ctx.lineTo(e.x + e.w / 2, e.y - e.h / 2);
	ctx.closePath(); ctx.fill();
	// 血条（所有敌人，hp > 1 或已受伤时显示）
	if (e.maxHp > 1 || e.hp < e.maxHp) {
		const bw = e.w, bh = 5;
		const ratio = e.hp / e.maxHp;
		const barColor = ratio > 0.5 ? '#2ecc71' : ratio > 0.25 ? '#f39c12' : '#e74c3c';
		ctx.fillStyle = '#333';
		ctx.fillRect(e.x - bw / 2, e.y - e.h / 2 - 9, bw, bh);
		ctx.fillStyle = barColor;
		ctx.fillRect(e.x - bw / 2, e.y - e.h / 2 - 9, bw * ratio, bh);
	}
	ctx.restore();
}

function drawBullet(b, color) {
	ctx.save();
	ctx.shadowColor = color;
	ctx.shadowBlur = b._missile ? 16 : 8;
	ctx.fillStyle = color;
	ctx.translate(b.x, b.y);
	ctx.rotate(b.angle || 0);
	ctx.beginPath();
	if (b._missile) {
		ctx.moveTo(0, -14);
		ctx.lineTo(8, 8);
		ctx.lineTo(0, 4);
		ctx.lineTo(-8, 8);
		ctx.closePath();
	} else {
		ctx.roundRect(-3, -10, 6, 20, 3);
	}
	ctx.fill();
	ctx.restore();
}

function addSkillEnergy(amount) {
	const readyed = skillEnergy >= skillEnergyMax;
	skillEnergy = Math.min(skillEnergyMax, skillEnergy + amount * playerEnergyRegenEfficiency);
	if (!readyed && skillEnergy >= skillEnergyMax) {
		showNotification("🌟弹射陨星 已就绪！");
	}
}

function fireHomingMissiles() {
	const spread = Math.PI / 3;
	const count = 5 + player.bulletCount;
	for (let i = 0; i < count; i++) {
		const t = count > 1 ? i / (count - 1) - 0.5 : 0;
		bullets.push({
			x: player.x,
			y: player.y - player.h / 2,
			angle: t * spread,
			_missile: true,
			damage: 5,
			speed: 6.5,
			turnRate: 0.14
		});
	}
}

function drawSkillIcon() {
	const x = canvas.width / 2;
	const y = canvas.height - 50;
	const r = 24;
	const ready = skillEnergy >= skillEnergyMax;
	const progress = skillEnergy / skillEnergyMax;

	ctx.save();
	ctx.shadowColor = ready ? '#ffe066' : '#555';
	ctx.shadowBlur = ready ? 22 : 4;
	ctx.fillStyle = ready ? 'rgba(255, 224, 102, 0.22)' : 'rgba(0, 0, 0, 0.45)';
	ctx.strokeStyle = ready ? '#ffe066' : '#666';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = ready ? '#fff4a3' : '#4dabf7';
	ctx.lineWidth = 4;
	ctx.arc(x, y, r + 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
	ctx.stroke();

	ctx.font = '22px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('🚀', x, y - 1);

	ctx.font = 'bold 10px sans-serif';
	ctx.fillStyle = ready ? '#ffe066' : '#bbb';
	ctx.fillText(ready ? 'SPACE' : `${Math.round(skillEnergy)}/${skillEnergyMax}`, x, y + 34);
	ctx.restore();
}

function drawStartMenu() {
	ctx.save();
	ctx.fillStyle = 'rgba(5, 10, 26, 0.72)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const cx = canvas.width / 2;
	const panelW = Math.min(520, canvas.width - 70);
	const panelH = 400;
	const panelX = cx - panelW / 2;
	const panelY = canvas.height / 2 - panelH / 2;

	ctx.shadowColor = '#d97706';
	ctx.shadowBlur = 28;
	ctx.fillStyle = 'rgba(12, 18, 42, 0.88)';
	ctx.strokeStyle = '#d97706';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.roundRect(panelX, panelY, panelW, panelH, 22);
	ctx.fill();
	ctx.stroke();

	ctx.shadowBlur = 18;
	ctx.fillStyle = '#ffe066';
	ctx.font = 'bold 42px sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('Claude VS Thunder', cx, panelY + 72);

	ctx.shadowBlur = 0;
	ctx.fillStyle = '#e6edf7';
	ctx.font = '18px sans-serif';
	const instructions = [
		'操作说明',
		'WSAD：移动',
		'J：射击',
		'K：格挡',
		'空格：释放技能，需要消耗能量',
		'攻击命中敌人、触发完美格挡、受击时都会获得能量'
	];
	instructions.forEach((text, i) => {
		ctx.font = i === 0 ? 'bold 22px sans-serif' : '17px sans-serif';
		ctx.fillStyle = i === 0 ? '#4dabf7' : '#e6edf7';
		ctx.fillText(text, cx, panelY + 132 + i * 30);
	});

	ctx.shadowColor = '#ffe066';
	ctx.shadowBlur = 16;
	ctx.fillStyle = 'rgba(255, 224, 102, 0.16)';
	ctx.strokeStyle = '#ffe066';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.roundRect(cx - 110, panelY + 296, 220, 48, 24);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = '#ffe066';
	ctx.font = 'bold 20px sans-serif';
	ctx.fillText('开始游戏', cx, panelY + 320);

	ctx.shadowBlur = 0;
	ctx.fillStyle = '#9fb3c8';
	ctx.font = '13px sans-serif';
	ctx.fillText('按 Enter / 空格 或点击开始', cx, panelY + 360);
	ctx.restore();
}

function drawExplosion(ex) {
	const progress = ex.frame / ex.maxFrame;
	const alpha = 1 - progress;
	ex.particles.forEach(p => {
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.fillStyle = p.color;
		ctx.beginPath();
		ctx.arc(ex.x + p.dx * progress * 60, ex.y + p.dy * progress * 60, p.r * (1 - progress * 0.5), 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});
}

function createExplosion(x, y, big) {
	const colors = ['#ff4500', '#ff8c00', '#ffd700', '#fff', '#ff6347'];
	const count = big ? 20 : 10;
	explosions.push({
		x, y, frame: 0, maxFrame: big ? 40 : 25,
		particles: Array.from({ length: count }, () => ({
			dx: (Math.random() - 0.5) * 2,
			dy: (Math.random() - 0.5) * 2,
			r: Math.random() * (big ? 8 : 4) + 2,
			color: colors[Math.floor(Math.random() * colors.length)]
		}))
	});
}

// 火花粒子池
const sparks = [];

const bgm = new Audio('assets/sounds/Another Disaster.mp3');
bgm.loop = true;
let bgmStarted = false;
function startBgmAfterInteraction() {
	if (bgmStarted) return;
	bgmStarted = true;
	bgm.play().catch(() => {
		bgmStarted = false;
	});
}
['keydown', 'mousedown', 'touchstart'].forEach(eventName => {
	window.addEventListener(eventName, startBgmAfterInteraction, { passive: true });
});
const sfxPerfectParry = new Audio('assets/sounds/perfect-parry.wav');
const sfxUnexactParry = new Audio('assets/sounds/unexact-parry.wav');
const sfxPowerup = new Audio('assets/sounds/powerup.mp3');
const sfxPewPool = Array.from({ length: 10 }, () => new Audio('assets/sounds/pew.wav'));
const sfxHurt = new Audio('assets/sounds/hurt.wav');
const sfxDie = new Audio('assets/sounds/die.wav');

let shockwaves = [];

function createParrySparks(x, y, perfect) {
	const colors = perfect
		? ['#00ffff', '#ffffff', '#aaffff', '#80ffff']
		: ['#50a0ff', '#ffffff', '#aad4ff', '#ffd700'];
	const count = perfect ? 18 : 10;
	// 完美格挡：在格挡点生成一圈向外扩散的冲击波
	if (perfect) {
		shockwaves.push({ x, y, r: 6, maxR: 70, life: 1 });
	}
	for (let i = 0; i < count; i++) {
		// 完美格挡：火花朝玩家前方（上方）锥形喷射；普通格挡保持四散
		const angle = perfect
			? -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 2 / 3)
			: Math.random() * Math.PI * 2;
		const speed = Math.random() * (perfect ? 4.5 : 3) + (perfect ? 2.5 : 1.5);
		sparks.push({
			x, y,
			vx: Math.cos(angle) * speed,
			vy: Math.sin(angle) * speed,
			life: 1,
			decay: perfect ? (Math.random() * 0.008 + 0.004) : (Math.random() * 0.02 + 0.01),
			r: Math.random() * (perfect ? 3 : 2) + 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
}

function updateAndDrawSparks() {
	for (let i = sparks.length - 1; i >= 0; i--) {
		const s = sparks[i];
		s.x += s.vx;
		s.y += s.vy;
		s.vy += 0.08; // 重力
		s.life -= s.decay;
		if (s.life <= 0) { sparks.splice(i, 1); continue; }
		ctx.save();
		ctx.globalAlpha = s.life;
		ctx.fillStyle = s.color;
		ctx.shadowColor = s.color;
		ctx.shadowBlur = 6;
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
	// 冲击波：快速向外扩张的圆环，随生命衰减淡出
	for (let i = shockwaves.length - 1; i >= 0; i--) {
		const sw = shockwaves[i];
		sw.r += (sw.maxR - sw.r) * 0.15;
		sw.life -= 0.04;
		if (sw.life <= 0) { shockwaves.splice(i, 1); continue; }
		ctx.save();
		ctx.globalAlpha = sw.life;
		ctx.strokeStyle = '#aaffff';
		ctx.shadowColor = '#00ffff';
		ctx.shadowBlur = 12;
		ctx.lineWidth = 3 * sw.life;
		ctx.beginPath();
		ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();
	}
}

function update(timestamp) {
	if (!gameRunning) return;

	// 移动玩家
	const movingLeft = keys['ArrowLeft'] || keys['a'];
	const movingRight = keys['ArrowRight'] || keys['d'];
	if (movingLeft && player.x - player.w / 2 > 0) player.x -= player.speed;
	if (movingRight && player.x + player.w / 2 < canvas.width) player.x += player.speed;
	if ((keys['ArrowUp'] || keys['w']) && player.y - player.h / 2 > 0) player.y -= player.speed;
	if ((keys['ArrowDown'] || keys['s']) && player.y + player.h / 2 < canvas.height) player.y += player.speed;

	// 左右移动时平滑倾斜，最大 20°
	const maxTilt = 20 * Math.PI / 180;
	player.targetTilt = movingLeft && !movingRight ? -maxTilt : movingRight && !movingLeft ? maxTilt : 0;
	player.tilt += (player.targetTilt - player.tilt) * 0.16;

	// 射击
	if ((keys['j'] || keys['J']) && timestamp - lastShot > baseShootInterval / playerAtkSpeed) {
		const count = player.bulletCount;
		const spacing = count > 1 ? Math.min(15, 100 / (count - 1)) : 0;
		const totalWidth = spacing * (count - 1);
		for (let i = 0; i < count; i++) {
			const bx = player.x - totalWidth / 2 + spacing * i;
			bullets.push({ x: bx, y: player.y - player.h / 2, angle: 0, damage: 1 });
		}
		lastShot = timestamp;

		let pew = sfxPewPool.find(a => a.paused || a.ended);
		if (!pew) {
			pew = new Audio('assets/sounds/pew.wav');
			if (sfxPewPool.length < 30) sfxPewPool.push(pew);
		}
		pew.currentTime = 0;
		pew.play().catch(() => { });
	}

	// 空格技能：能量满 50 后发射 5 枚追踪导弹
	const skillKeyDown = keys[' '] || keys['Space'] || keys['Spacebar'];
	if (skillKeyDown && !skillSpaceWasDown && skillEnergy >= skillEnergyMax) {
		skillEnergy -= skillEnergyMax;
		fireHomingMissiles();
		showNotification('🌟 Fire！');
	}
	skillSpaceWasDown = skillKeyDown;

	// 护盾计时
	if (player.shieldActive && timestamp > player.shieldExpiry) {
		player.shieldActive = false;
		player.shieldHits = 0;
	}

	// K键格挡
	if (keys['k'] || keys['K']) {
		if (!player.parryActive && timestamp >= player.parryCooldownUntil) {
			player.parryActive = true;
			player.parryStart = timestamp;
		}
	} else {
		if (player.parryActive) {
			// 格挡结束时开始计算冷却
			player.parryCooldownUntil = timestamp + 500;
		}
		player.parryActive = false;
	}
	// 超时自动结束：最大维持时间受能量再生效率影响；格挡后冷却受攻击速度影响
	const totalParryWindow = 500 * playerEnergyRegenEfficiency;
	if (player.parryActive && timestamp - player.parryStart > totalParryWindow) {
		player.parryActive = false;
		player.parryCooldownUntil = timestamp + 500 / playerAtkSpeed;
	}

	// 生成敌人：场上最多同时存在 7 个敌人
	const interval = Math.max(500, enemySpawnInterval - (level - 1) * 150);
	if (timestamp - lastEnemySpawn > interval && enemies.length < maxEnemies) {
		spawnEnemy();
		lastEnemySpawn = timestamp;
	}

	// 更新星星
	stars.forEach(s => { s.y += s.speed; if (s.y > canvas.height) s.y = 0; });

	// 更新子弹
	bullets = bullets.filter(b => b.y > -30 && b.y < canvas.height + 30 && b.x > -30 && b.x < canvas.width + 30);
	bullets.forEach(b => {
		if (b._missile) {
			const target = enemies.reduce((nearest, e) => {
				if (!nearest) return e;
				const nd = (nearest.x - b.x) ** 2 + (nearest.y - b.y) ** 2;
				const ed = (e.x - b.x) ** 2 + (e.y - b.y) ** 2;
				return ed < nd ? e : nearest;
			}, null);
			if (target) {
				const targetAngle = Math.atan2(target.x - b.x, -(target.y - b.y));
				let diff = targetAngle - (b.angle || 0);
				diff = Math.atan2(Math.sin(diff), Math.cos(diff));
				const turn = b.turnRate || 0.12;
				b.angle = (b.angle || 0) + Math.max(-turn, Math.min(turn, diff));
			}
			const speed = b.speed || 6.5;
			b.x += Math.sin(b.angle || 0) * speed;
			b.y -= Math.cos(b.angle || 0) * speed;
		} else {
			b.x += Math.sin(b.angle || 0) * playerBulletSpeed;
			b.y -= Math.cos(b.angle || 0) * playerBulletSpeed;
		}
	});

	// 敌方子弹
	enemyBullets = enemyBullets.filter(b => b.y < canvas.height + 20 && b.y > -20 && b.x > -20 && b.x < canvas.width + 20);
	enemyBullets.forEach(b => {
		if (typeof b.vx === 'number' && typeof b.vy === 'number') {
			b.x += b.vx;
			b.y += b.vy;
		} else {
			b.y += 3;
		}
	});

	// 更新敌人
	enemies.forEach(e => {
		e.y += e.speed;
		// 敌人射击，哨兵攻速更快且会瞄准玩家
		if (timestamp - e.lastShot >= (e.shootInterval || 2500)) {
			if (e.aimedShot) {
				const dx = player.x - e.x;
				const dy = player.y - e.y;
				const dist = Math.hypot(dx, dy) || 1;
				const bulletSpeed = 3.2;
				const vx = dx / dist * bulletSpeed;
				const vy = dy / dist * bulletSpeed;
				enemyBullets.push({ x: e.x, y: e.y + e.h / 2, vx, vy, angle: Math.atan2(vx, -vy), shooter: e });
			} else {
				enemyBullets.push({ x: e.x, y: e.y + e.h / 2, angle: 0, shooter: e });
			}
			e.lastShot = timestamp;
		}
	});
	enemies = enemies.filter(e => e.y < canvas.height + 60);

	// 生成道具
	powerups.forEach(p => p.y += 1.5);
	powerups = powerups.filter(p => p.y < canvas.height + 40);

	// 玩家拾取道具
	powerups = powerups.filter(p => {
		if (Math.abs(p.x - player.x) < player.w / 2 + 14 && Math.abs(p.y - player.y) < player.h / 2 + 14) {
			sfxPowerup.currentTime = 0;
			sfxPowerup.play();
			if (p.type === 'multishot') {
				player.bulletCount = Math.min(player.bulletCount + 1, 20);
				showNotification('⚔️ 多重射击 +1');
			} else if (p.type === 'ricochet') {
				player.ricochetChance = Math.min(1, player.ricochetChance + 0.1);
				showNotification('🔀 折射 +10%');
			} else if (p.type === 'heal') {
				lives += 1;
				document.getElementById('lives').textContent = lives;
				showNotification('❤️ 生命值 +1');
			} else if (p.type === 'atkspeed') {
				playerAtkSpeed = Math.min(10, playerAtkSpeed + 0.15);
				showNotification('🔥 攻击速度 +15%');
			} else if (p.type === 'bulletspeed') {
				playerBulletSpeed = Math.min(playerBulletSpeed + 0.25, 35);
				showNotification('🧨 子弹速度 +1');
			} else if (p.type === 'movespeed') {
				player.speed = Math.min(player.speed + 0.07, 6);
				showNotification('🚀 移动速度 +1');
			} else if (p.type === 'shield') {
				player.shieldActive = true;
				player.shieldHits = 1;
				player.shieldExpiry = timestamp + 30000;
				showNotification('🛡️ 力墙护盾已激活！');
			} else if (p.type === 'energyregen') {
				playerEnergyRegenEfficiency = Math.min(3, playerEnergyRegenEfficiency + 0.05);
				showNotification('🎈 能量再生效率 +5%');
			} else if (p.type === 'pierce') {
				playerPierceChance = Math.min(1, playerPierceChance + 0.05);
				showNotification('🌀 穿透 +5%');
			}
			return false;
		}
		return true;
	});

	// 更新通知
	notifications = notifications.filter(n => timestamp - n.born < 2200);

	// 碰撞：玩家子弹击中敌人
	bullets.forEach((b) => {
		if (b._dead) return;
		enemies.forEach((e, ei) => {
			if (b._dead) return;
			if (Math.abs(b.x - e.x) < e.w / 2 && Math.abs(b.y - e.y) < e.h / 2) {
				if (Math.random() >= playerPierceChance) {
					b._dead = true;
				}
				if (Math.random() < 1 / player.bulletCount) {
					addSkillEnergy(1);
				}
				const damage = b.damage ?? (b._missile ? 5 : 1);
				e.hp -= damage;
				// 折射判定
				if (Math.random() < player.ricochetChance) {
					const others = enemies.filter((_, j) => j !== ei);
					if (others.length > 0) {
						let nearest = others.reduce((a, c) => {
							const da = (a.x - b.x) ** 2 + (a.y - b.y) ** 2, dc = (c.x - b.x) ** 2 + (c.y - b.y) ** 2;
							return dc < da ? c : a;
						});
						// 预测敌人位置：根据子弹飞行帧数估算敌人届时的坐标
						const dist = Math.hypot(nearest.x - b.x, nearest.y - b.y);
						const travelFrames = dist / playerBulletSpeed;
						const predX = nearest.x;
						const predY = nearest.y + nearest.speed * travelFrames;
						const angle = Math.atan2(predX - b.x, -(predY - b.y));
						bullets.push({ x: b.x, y: b.y, angle, damage: 1, _ricochet: (b._ricochet || 0) + 1 });
					}
				}
				if (e.hp <= 0) {
					createExplosion(e.x, e.y, e.type === 'tank');
					score += e.score;
					document.getElementById('score').textContent = score;
					level = Math.floor(score / 200) + 1;
					document.getElementById('level').textContent = level;
					// 随机掉落道具，哨兵必定掉落
					if (e.guaranteedDrop || Math.random() < 0.4) {
						// 权重表：哨兵掉落 heal 的权重是其他单个道具的 2 倍
						const healWeight = e.type === 'sentry' ? 20 : 1;
						const weightedTypes = [
							...Array(10).fill('multishot'),
							...Array(10).fill('atkspeed'),
							...Array(10).fill('shield'),
							...Array(10).fill('bulletspeed'),
							...Array(10).fill('movespeed'),
							...Array(10).fill('ricochet'),
							...Array(10).fill('energyregen'),
							...Array(10).fill('pierce'),
							...Array(healWeight).fill('heal'),
						];
						powerups.push({ x: e.x, y: e.y, type: weightedTypes[Math.floor(Math.random() * weightedTypes.length)] });
					}
					enemies.splice(ei, 1);
				}
			}
		});
	});
	bullets = bullets.filter(b => !b._dead);

	// 碰撞：敌方子弹/敌机击中玩家
	const pr = player.w / 2 - 8;
	[...enemyBullets, ...enemies].forEach((obj, i) => {
		const dx = obj.x - player.x, dy = obj.y - player.y;
		if (Math.sqrt(dx * dx + dy * dy) < pr + (obj.h ? obj.h / 2 - 8 : 4)) {
			// 道具护盾优先
			if (player.shieldActive && player.shieldHits > 0) {
				player.shieldHits--;
				if (player.shieldHits <= 0) player.shieldActive = false;
				if (i < enemyBullets.length) enemyBullets.splice(i, 1);
				else enemies.splice(i - enemyBullets.length, 1);
				return;
			}
			// K键格挡盾
			if (player.parryActive) {
				const parryElapsed = timestamp - player.parryStart;
				const totalParryWindow = 500 * playerEnergyRegenEfficiency;
				const imperfectParryWindow = 300 / playerAtkSpeed;
				const perfectParryWindow = totalParryWindow - imperfectParryWindow;
				if (parryElapsed < perfectParryWindow) {
					// 完美格挡：喷火花并立即结束格挡状态
					sfxPerfectParry.currentTime = 0;
					sfxPerfectParry.play();
					createParrySparks(player.x, player.y, true);
					addSkillEnergy(12);
					player.parryActive = false;
					player.parryCooldownUntil = timestamp + 1000;
					// 完美格挡：免伤并向包含发射者在内的3个随机敌人发射反击子弹；敌人不足则随机散射补足
					const shooter = (i < enemyBullets.length && obj.shooter) ? obj.shooter : obj;
					const otherTargets = enemies.filter(e => e !== shooter);
					for (let j = otherTargets.length - 1; j > 0; j--) {
						const k = Math.floor(Math.random() * (j + 1));
						[otherTargets[j], otherTargets[k]] = [otherTargets[k], otherTargets[j]];
					}
					const targets = enemies.includes(shooter)
						? [shooter, ...otherTargets.slice(0, 2)]
						: otherTargets.slice(0, 3);
					for (let j = 0; j < 3; j++) {
						let angle;
						const target = targets[j];
						if (target) {
							const dist = Math.hypot(target.x - player.x, target.y - player.y);
							const travelTime = dist / playerBulletSpeed;
							const targetX = target.x;
							const targetY = target.y + (target.speed || 0) * travelTime;
							angle = Math.atan2(targetX - player.x, -(targetY - player.y));
						} else {
							angle = (Math.random() - 0.5) * (Math.PI / 2);
						}
						bullets.push({ x: player.x, y: player.y - player.h / 2, angle, damage: 1, _parryCounter: true });
					}
					showNotification('⚡️完美格挡！');
					if (i < enemyBullets.length) enemyBullets.splice(i, 1);
					else enemies.splice(i - enemyBullets.length, 1);
					return;
				} else if (parryElapsed <= totalParryWindow) {
					// 不精准格挡音效
					sfxUnexactParry.currentTime = 0;
					sfxUnexactParry.play();
					// 不完美格挡窗口随攻击速度缩短：25%概率免伤，但重置攻击冷却
					if (Math.random() < 0.25) {
						lastShot = timestamp;
						addSkillEnergy(3);
						showNotification('🛡️格挡！');
						if (i < enemyBullets.length) enemyBullets.splice(i, 1);
						else enemies.splice(i - enemyBullets.length, 1);
						return;
					}
					// 未格挡，正常受伤
				} else {
					player.parryActive = false;
				}
			}
			sfxHurt.currentTime = 0;
			sfxHurt.play().catch(() => { });
			createExplosion(player.x, player.y, true);
			if (i < enemyBullets.length) enemyBullets.splice(i, 1);
			else enemies.splice(i - enemyBullets.length, 1);
			lives--;
			addSkillEnergy(2);
			showNotification(`💔受损，剩余${lives}点生命值！`);
			document.getElementById('lives').textContent = lives;
			if (lives <= 0) endGame();
			else { player.x = canvas.width / 2; player.y = canvas.height - 80; }
		}
	});
	// 更新爆炸
	explosions.forEach(ex => ex.frame++);
	explosions = explosions.filter(ex => ex.frame < ex.maxFrame);
}
function showNotification(text) {
	notifications.push({ text, born: performance.now() });
	if (notifications.length > 4) notifications.shift();
}
function draw() {
	// 背景
	ctx.fillStyle = '#050a1a';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 星空
	stars.forEach(s => {
		ctx.save();
		ctx.globalAlpha = 0.4 + s.brightness * 0.6;
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	});

	if (!gameStarted) {
		drawStartMenu();
		return;
	}

	// 敌人
	enemies.forEach(e => drawEnemy(e));

	// 子弹
	bullets.forEach(b => drawBullet(b, b._missile ? '#ffe066' : '#d97706'));
	enemyBullets.forEach(b => drawBullet(b, '#e74c3c'));

	// 道具
	powerups.forEach(p => {
		const cfg = {
			heal: { color: '#ff4d6d', label: '❤️' },
			multishot: { color: '#00e5ff', label: '⚔️' },
			atkspeed: { color: '#ffe600', label: '🔥' },
			bulletspeed: { color: '#00ffcc', label: '🧨' },
			movespeed: { color: '#a78bfa', label: '🚀' },
			shield: { color: '#7fff7f', label: '🛡️' },
			ricochet: { color: '#ff9ef7', label: '🔀' },
			energyregen: { color: '#4dabf7', label: '🎈' },
			pierce: { color: '#b8f7ff', label: '🌀' }
		}[p.type];
		ctx.save();
		ctx.shadowColor = cfg.color; ctx.shadowBlur = 14;
		ctx.strokeStyle = cfg.color; ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
		ctx.stroke();
		ctx.font = '14px sans-serif';
		ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
		ctx.fillText(cfg.label, p.x, p.y);
		ctx.restore();
	});

	// 玩家
	drawPlayer();

	// 护盾光环
	if (player.shieldActive) {
		ctx.save();
		ctx.strokeStyle = '#7fff7f';
		ctx.lineWidth = 3;
		ctx.shadowColor = '#7fff7f'; ctx.shadowBlur = 18;
		ctx.globalAlpha = 0.75;
		ctx.beginPath();
		ctx.arc(player.x, player.y, player.w / 2 + 10, 0, Math.PI * 2);
		ctx.stroke();
		ctx.restore();
	}

	// 爆炸
	explosions.forEach(ex => drawExplosion(ex));
	// 格挡火花
	updateAndDrawSparks();

	// 技能图标
	drawSkillIcon();

	// 道具提示通知
	const now = performance.now();
	notifications.forEach((n, i) => {
		const age = now - n.born;
		const alpha = age < 1600 ? 1 : 1 - (age - 1600) / 600;
		const y = canvas.height - 60 - i * 28;
		ctx.save();
		ctx.globalAlpha = Math.max(0, alpha);
		ctx.font = 'bold 15px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		const w = ctx.measureText(n.text).width + 24;
		ctx.fillStyle = 'rgba(0,0,0,0.55)';
		ctx.beginPath();
		ctx.roundRect(canvas.width / 2 - w / 2, y - 12, w, 24, 6);
		ctx.fill();
		ctx.fillStyle = '#ffe066';
		ctx.shadowColor = '#ffe066';
		ctx.shadowBlur = 8;
		ctx.fillText(n.text, canvas.width / 2, y);
		ctx.restore();
	});
}

function gameLoop(timestamp) {
	update(timestamp);
	draw();
	requestAnimationFrame(gameLoop);
}

function endGame() {
	gameRunning = false;
	bgm.pause();
	bgm.currentTime = 0;
	bgmStarted = false;
	sfxDie.currentTime = 0;
	sfxDie.play().catch(() => { });
	document.getElementById('finalScore').textContent = score;
	document.getElementById('gameOver').style.display = 'block';
}

function resetGameState() {
	score = 0; lives = 3; level = 1;
	bullets = []; enemyBullets = []; enemies = []; explosions = []; powerups = [];
	notifications = [];
	skillEnergy = 0;
	skillSpaceWasDown = false;
	lastEnemySpawn = 0;
	lastShot = 0;
	playerAtkSpeed = 1.0;
	playerBulletSpeed = 7;
	playerEnergyRegenEfficiency = 1.0;
	playerPierceChance = 0;
	player.speed = 1.5;
	player.x = canvas.width / 2; player.y = canvas.height - 80;
	player.bulletCount = 1;
	player.ricochetChance = 0;
	player.shieldActive = false; player.shieldHits = 0; player.shieldExpiry = 0;
	player.parryActive = false; player.parryStart = 0; player.parryCooldownUntil = 0;
	player.tilt = 0; player.targetTilt = 0;
	document.getElementById('score').textContent = 0;
	document.getElementById('lives').textContent = 3;
	document.getElementById('level').textContent = 1;
	document.getElementById('gameOver').style.display = 'none';
}

function beginGame() {
	gameStarted = true;
	gameRunning = true;
	resetGameState();
}

function restartGame() {
	beginGame();
}

// 资源预加载：等待音效与玩家图片加载完成后再隐藏加载页并开始游戏
function startGame() {
	const loadingEl = document.getElementById('loading');
	if (loadingEl) loadingEl.style.display = 'none';
	requestAnimationFrame(gameLoop);
}

(function preloadAssets() {
	const tasks = [];
	// 音效：等待可完整播放（error 也算结束，避免缺资源时卡死）
	[bgm, sfxPerfectParry, sfxUnexactParry, sfxPowerup, sfxPewPool[0], sfxHurt, sfxDie].forEach(a => {
		a.preload = 'auto';
		tasks.push(new Promise(resolve => {
			if (a.readyState >= 4) return resolve();
			a.addEventListener('canplaythrough', resolve, { once: true });
			a.addEventListener('error', resolve, { once: true });
			a.load();
		}));
	});
	// 玩家图片
	tasks.push(new Promise(resolve => {
		if (player.imgLoaded) return resolve();
		player.img.addEventListener('load', resolve, { once: true });
		player.img.addEventListener('error', resolve, { once: true });
	}));
	// 兜底：最多等待 8 秒，防止个别资源加载失败时一直停在加载页
	const timeout = new Promise(resolve => setTimeout(resolve, 8000));
	Promise.race([Promise.all(tasks), timeout]).then(startGame);
})();
