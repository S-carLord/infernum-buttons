const title = document.querySelector(".title");
const subtitle = document.querySelector("p");
const button = document.querySelector(".infernal-btn");
let stage = 0;
let destroyed = false;

const demonicSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-demonic-voice-666-39.mp3");
const laughSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-evil-laugh-1331.mp3");
const fireSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-crackling-fire-1190.mp3");
demonicSound.volume = 0.5;
laughSound.volume = 0.7;
fireSound.volume = 0.3;
fireSound.loop = true;

// Função para criar partículas de brasa
function createEmberParticles(element) {
  const textRect = element.getBoundingClientRect();
  const text = element.textContent;
  const letterCount = text.length;

  for (let i = 0; i < letterCount * 3; i++) {
    setTimeout(() => {
      // Posição aleatória dentro do elemento de texto
      const x = textRect.left + Math.random() * textRect.width;
      const y = textRect.top + Math.random() * textRect.height;

      const particle = document.createElement("div");
      particle.classList.add("ember-particle");

      // Tamanho aleatório entre 2px e 6px
      const size = 2 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Posicionamento inicial
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Animação da partícula
      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 50;
      const duration = 0.5 + Math.random() * 1;

      particle.style.transition = `all ${duration}s ease-out`;
      particle.style.opacity = "1";

      document.body.appendChild(particle);

      // Movimento da partícula
      setTimeout(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px)`;
        particle.style.opacity = "0";
      }, 10);

      // Remover após animação
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }, i * 30);
  }
}

button.addEventListener("click", () => {
  if (destroyed) return;

  if (stage === 0) {
    document.body.style.transition = "all 0.5s";
    document.body.style.filter = "brightness(1.5)";
    demonicSound.play().catch(() => {});
    fireSound.play().catch(() => {});

    for (let i = 0; i < 5; i++) createRandomFlame();

    title.classList.add("burning");
    subtitle.classList.add("burning");

    // Criar partículas de brasa para o título e subtítulo
    createEmberParticles(title);
    createEmberParticles(subtitle);

    button.textContent = "O PORTAL ESTÁ ABERTO";
    button.style.background = "linear-gradient(45deg, #333, #555)";
    button.style.borderColor = "#555";

    setTimeout(() => {
      document.body.style.filter = "brightness(1)";
      title.classList.remove("burning");
      subtitle.classList.remove("burning");

      title.style.opacity = "0";
      subtitle.style.opacity = "0";

      setTimeout(() => {
        fireSound.pause();
        title.textContent = "O portal para o santuário está aberto";
        title.className = "title text-5xl md:text-7xl font-bold text-red-600 mb-8 animate-pulse";
        title.style.opacity = "1";

        const diabloRef = document.createElement("p");
        diabloRef.textContent = "- inspirado em Diablo IV -";
        diabloRef.className = "text-xl text-red-300 mt-4";
        title.parentNode.insertBefore(diabloRef, subtitle);

        stage = 1;
      }, 700);
    }, 2000);
  } else if (stage === 1) {
    title.textContent = "O que mais você quer, Mortal?";
    title.className = "title text-4xl md:text-6xl font-bold text-red-600 mb-8";

    subtitle.textContent = "Copie esse botão e coloque no seu projeto, eu permito, mas não finja que foi você quem criou isso sozinho HAHAHAHA";
    subtitle.className = "text-xl md:text-2xl text-red-200 mb-12 max-w-2xl mx-auto";
    subtitle.style.opacity = "1";

    button.textContent = "EU AVISEI!";
    button.style.background = "linear-gradient(45deg, #333, #555)";
    button.style.borderColor = "#555";

    stage = 2;
  } else if (stage === 2) {
    destroyed = true;
    title.remove();
    subtitle.remove();

    for (let i = 0; i < 50; i++) {
      setTimeout(() => createRandomFlame(), i * 50);
    }

    setTimeout(() => button.remove(), 1000);
    laughSound.play().catch(() => {});
  }
});

function createRandomFlame() {
  const flame = document.createElement("div");
  flame.classList.add("flame");
  flame.style.left = `${Math.random() * 100}%`;
  flame.style.top = `${Math.random() * 100}%`;
  const size = 50 + Math.random() * 100;
  flame.style.width = `${size}px`;
  flame.style.height = `${size}px`;
  flame.style.animationDuration = `${1 + Math.random() * 3}s`;
  document.body.appendChild(flame);

  setTimeout(() => {
    flame.remove();
  }, 2000);
}

setInterval(() => {
  if (Math.random() > 0.7) createRandomFlame();
}, 1000);
