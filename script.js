let engineAtual = null;
let runnerAtual = null;
let corposAtual = [];
const size = 70;
const teclaIds = ['tecla-s', 'tecla-o', 'tecla-a', 'tecla-p', 'tecla-h', 'tecla-i'];
let arrastando = false;
let corpoArrastado = null;
let elArrastado = null;
let lastX = 0;

document.addEventListener('mousemove', (e) => {
  if (!arrastando || !corpoArrastado) return;
  const container = document.getElementById('teclas-container');
  const rect = container.getBoundingClientRect();
  const novoX = e.clientX - rect.left;
  const novoY = e.clientY - rect.top;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  const wobble = Math.max(-0.5, Math.min(0.5, dx * 0.03));
  Matter.Body.setPosition(corpoArrastado, { x: novoX, y: novoY });
  Matter.Body.setAngle(corpoArrastado, wobble);
  if (elArrastado) {
    elArrastado.style.left = (corpoArrastado.position.x - size/2) + 'px';
    elArrastado.style.top = (corpoArrastado.position.y - size/2) + 'px';
    elArrastado.style.transform = `rotate(${wobble}rad)`;
  }
});

document.addEventListener('mouseup', () => {
  if (!arrastando) return;
  arrastando = false;
  if (elArrastado) {
    elArrastado.style.transition = 'transform 0.3s ease';
    elArrastado.style.transform = 'rotate(0deg)';
    elArrastado.style.cursor = 'grab';
    setTimeout(() => { elArrastado.style.transition = 'none'; }, 300);
  }
  if (corpoArrastado) {
    Matter.Body.setAngle(corpoArrastado, 0);
    Matter.Body.setStatic(corpoArrastado, true);
  }
  corpoArrastado = null;
  elArrastado = null;
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('escondida');
  } else {
    nav.classList.remove('escondida');
  }
});

function iniciarFisica() {
  const { Engine, Runner, Bodies, Body, World, Events } = Matter;

  if (engineAtual) {
    Runner.stop(runnerAtual);
    World.clear(engineAtual.world);
    Engine.clear(engineAtual);
  }

  const container = document.getElementById('teclas-container');
  const W = container.offsetWidth;
  const H = container.offsetHeight;

  const engine = Engine.create();
  const runner = Runner.create();
  engineAtual = engine;
  runnerAtual = runner;
  Runner.run(runner, engine);

  const chao = Bodies.rectangle(W/2, H + 25, W, 50, { isStatic: true });
  const paredeDir = Bodies.rectangle(W + 25, H/2, 50, H, { isStatic: true });
  const paredeEsq = Bodies.rectangle(-25, H/2, 50, H, { isStatic: true });
  World.add(engine.world, [chao, paredeDir, paredeEsq]);

  corposAtual = [];

  teclaIds.forEach((id, i) => {
    const x = W * 0.5 + (i % 3) * 80 + Math.random() * 40;
    const y = -100 - i * 120;
    const angulo = (Math.random() - 0.5) * 1.5;
    const corpo = Bodies.rectangle(x, y, size, size, {
      restitution: 0.3,
      friction: 0.8,
      frictionAir: 0.01,
      angle: angulo
    });
    corposAtual.push({ corpo, id });
    World.add(engine.world, corpo);
  });

  Events.on(engine, 'afterUpdate', () => {
    corposAtual.forEach(({ corpo, id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.left = (corpo.position.x - size/2) + 'px';
      el.style.top = (corpo.position.y - size/2) + 'px';
      el.style.transform = `rotate(${corpo.angle}rad)`;
    });
  });

  corposAtual.forEach(({ corpo, id }) => {
    const el = document.getElementById(id);
    el.addEventListener('mousedown', (e) => {
      arrastando = true;
      lastX = e.clientX;
      corpoArrastado = corpo;
      elArrastado = el;
      Body.setStatic(corpo, true);
      Body.setVelocity(corpo, { x: 0, y: 0 });
      Body.setAngularVelocity(corpo, 0);
      el.style.transition = 'none';
      el.style.cursor = 'grabbing';
      e.preventDefault();
    });
  });
}

function mostrarPagina(id) {
  document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
  document.getElementById(id).classList.add('ativa');
  document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('ativa'));
  if (event && event.target) event.target.classList.add('ativa');
  if (id === 'home') {
    document.body.classList.add('home-ativa');
    iniciarFisica();
  } else {
    document.body.classList.remove('home-ativa');
  }
}

function abrirProjeto(id) {
  mostrarPagina('projeto-aberto');
}

function alternarIdioma() {
  const btn = event.target;
  btn.textContent = btn.textContent === 'PT-BR' ? 'ENG' : 'PT-BR';
}

document.body.classList.add('home-ativa');
iniciarFisica();