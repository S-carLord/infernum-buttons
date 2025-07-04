// Elementos principais
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const button = document.querySelector(".infernal-btn");
const portalGlow = document.querySelector(".portal-glow");
const portalRings = document.querySelectorAll(".portal-ring");
const hellDistortion = document.querySelector(".hell-distortion");
const crack = document.querySelector(".crack");
let stage = 0;
let destroyed = false;
let portalActive = false;

// Sons em base64 para funcionar offline
const demonicSound = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
const laughSound = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
const fireSound = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
const portalSound = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");

// Configuração de volume
demonicSound.volume = 0.5;
laughSound.volume = 0.7;
fireSound.volume = 0.3;
portalSound.volume = 0.4;
fireSound.loop = true;
portalSound.loop = true;

// Função para criar partículas de brasa
function createEmberParticles(element) {
  const textRect = element.getBoundingClientRect();
  const text = element.textContent;
  const letterCount = text.length;

  for (let i = 0; i < letterCount * 3; i++) {
    setTimeout(() => {
      const x = textRect.left + Math.random() * textRect.width;
      const y = textRect.top + Math.random() * textRect.height;

      const particle = document.createElement("div");
      particle.classList.add("ember-particle");

      const size = 2 + Math.random() * 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = 20 + Math.random() * 50;
      const duration = 0.5 + Math.random() * 1;

      particle.style.transition = `all ${duration}s ease-out`;
      particle.style.opacity = "1";

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px)`;
        particle.style.opacity = "0";
      }, 10);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }, i * 30);
  }
}

// Função para criar chamas aleatórias
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

// Função para ativar o portal
function activatePortal() {
  portalActive = true;
  portalGlow.classList.add("active");
  portalRings.forEach((ring) => ring.classList.add("active"));
  hellDistortion.classList.add("active");
  crack.classList.add("active");
  setTimeout(() => {
    portalSound.play().catch(() => {});
  }, 100);
}

// Função para maximizar o portal
function maximizePortal() {
  portalGlow.classList.add("max");

  // Aumentar intensidade do som do portal
  portalSound.volume = 0.8;
}

// Função para criar efeito de terremoto
function earthquake() {
  document.body.style.animation = "shake 0.5s";
  setTimeout(() => {
    document.body.style.animation = "";
  }, 500);
}

// Adicionar estilo de terremoto dinamicamente
const style = document.createElement("style");
style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translate(0, 0) rotate(0); }
                10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px) rotate(-1deg); }
                20%, 40%, 60%, 80% { transform: translate(5px, -5px) rotate(1deg); }
            }
        `;
document.head.appendChild(style);

// Evento de clique no botão
button.addEventListener("click", () => {
  if (destroyed) return;

  earthquake(); // Efeito de terremoto

  if (stage === 0) {
    // Primeiro clique - Ativar portal
    document.body.style.transition = "all 0.5s";
    document.body.style.filter = "brightness(1.5)";
    setTimeout(() => {
      demonicSound.play().catch(() => {});
      fireSound.play().catch(() => {});
    }, 100);
    activatePortal();

    for (let i = 0; i < 5; i++) createRandomFlame();

    title.classList.add("burning");
    subtitle.classList.add("burning");

    createEmberParticles(title);
    createEmberParticles(subtitle);

    button.innerHTML = "O PORTAL ESTÁ ABERTO";
    button.style.background = "linear-gradient(135deg, #333, #555)";
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
        title.className = "title text-5xl md:text-7xl font-bold mb-8 animate-pulse";
        title.style.opacity = "1";

        const diabloRef = document.createElement("p");
        diabloRef.textContent = "- inspirado em Diablo IV -";
        diabloRef.className = "text-xl text-red-300 mt-4";
        title.parentNode.insertBefore(diabloRef, subtitle);

        stage = 1;
      }, 700);
    }, 2000);
  } else if (stage === 1) {
    // Segundo clique - Maximizar portal
    setTimeout(() => {
      maximizePortal();
    }, 500);
    title.textContent = "O que mais você quer, Mortal?";
    title.className = "title text-4xl md:text-6xl font-bold mb-8";

    subtitle.textContent = "Copie esse botão e coloque no seu projeto, eu permito, mas não finja que foi você quem criou isso sozinho HAHAHAHA";
    subtitle.className = "subtitle text-xl md:text-2xl text-red-200 mb-12 max-w-2xl mx-auto";
    subtitle.style.opacity = "1";

    button.innerHTML = "EU AVISEI!";
    button.style.background = "linear-gradient(135deg, #333, #555)";
    button.style.borderColor = "#555";

    stage = 2;
  } else if (stage === 2) {
    // Terceiro clique - Destruir tudo
    destroyed = true;
    title.remove();
    subtitle.remove();

    for (let i = 0; i < 50; i++) {
      setTimeout(() => createRandomFlame(), i * 50);
    }

    setTimeout(() => {
      button.remove();
      setTimeout(() => {
        laughSound.play().catch(() => {});
      }, 100);

      // Efeito final - Tela vermelha
      document.body.style.backgroundColor = "#8b0000";
      document.body.style.transition = "background-color 2s";

      setTimeout(() => {
        document.body.innerHTML = `
                            <div class="flex items-center justify-center h-full">
                                <div class="text-center px-4">
                                    <h1 class="text-5xl md:text-7xl font-bold text-black mb-8">VOCÊ FOI AVISADO</h1>
                                    <p class="text-xl md:text-2xl text-gray-800 mb-12">O portal para o inferno agora está em seu coração...</p>
                                    <button onclick="location.reload()" class="px-6 py-3 bg-gray-800 text-red-400 font-bold rounded-none border-2 border-red-600 hover:bg-gray-900 transition-all">
                                        Tentar novamente?
                                    </button>
                                </div>
                            </div>
                        `;
      }, 2000);
    }, 1000);
  }
});

// Criar chamas aleatórias periodicamente
setInterval(() => {
  if (Math.random() > 0.7 && !destroyed) createRandomFlame();
}, 1000);

// Efeito de digitação no subtítulo inicial
const originalSubtitle = '"O mal nunca morre. Ele apenas dorme... e agora acorda."';
subtitle.textContent = "";
let charIndex = 0;

function typeWriter() {
  if (charIndex < originalSubtitle.length) {
    subtitle.textContent += originalSubtitle.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50 + Math.random() * 50);
  }
}

// Iniciar efeito de digitação após um breve delay
setTimeout(typeWriter, 1000);
