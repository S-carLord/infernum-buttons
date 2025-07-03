// Initialize variables
let clickCount = parseInt(localStorage.getItem("tilambucadasCount")) || 0;
let isProcessing = false;
const clickDelay = 300;
let challengeShown = localStorage.getItem("challengeShown") === "true";

// Initialize counter display
updateCounterDisplay();

// Modal control functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.opacity = "1";
  modal.style.pointerEvents = "auto";
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.opacity = "0";
  modal.style.pointerEvents = "none";
}

// Set up modal handlers
document.getElementById("closeModal").addEventListener("click", () => hideModal("successModal"));
document.getElementById("closeResponse").addEventListener("click", () => hideModal("responseModal"));

document.getElementById("acceptChallenge").addEventListener("click", function () {
  hideModal("challengeModal");
  showResponse("😏", "BELEZA!", "Beleza, então! Eu que não vou atrapalhar");
  challengeShown = true;
  localStorage.setItem("challengeShown", "true");
});

document.getElementById("declineChallenge").addEventListener("click", function () {
  hideModal("challengeModal");
  showResponse("😠", "AH É?", "Você acha que tem escolha? Lambe mais rápido isso aí, pô!");
  challengeShown = true;
  localStorage.setItem("challengeShown", "true");
});

function showResponse(emoji, title, text) {
  document.getElementById("responseEmoji").textContent = emoji;
  document.getElementById("responseTitle").textContent = title;
  document.getElementById("responseText").textContent = text;
  showModal("responseModal");
}

function updateCounterDisplay() {
  const counter = document.getElementById("tilambucadasCount");
  counter.textContent = clickCount;
  counter.classList.add("counter-pop");
  setTimeout(() => counter.classList.remove("counter-pop"), 300);
}

function createRandomWaterEffect() {
  const effectType = Math.floor(Math.random() * 5); // 0-4
  const container = document.getElementById("waterDrops");

  switch (effectType) {
    case 0: // Muitas gotas pequenas (chuva fina)
      createWaterDrops(50, 2, 5, 0.3, 1);
      break;

    case 1: // Gotas médias (padrão)
      createWaterDrops(15, 5, 10, 0.5, 1.5);
      break;

    case 2: // Poucas gotas grandes
      createWaterDrops(5, 15, 25, 1, 2);
      break;

    case 3: // Uma única gota gigante
      createWaterDrops(1, 40, 50, 2, 3);
      break;

    case 4: // Jato de água com respingos
      createWaterJet();
      break;
  }
}

function createWaterDrops(count, minSize, maxSize, minDuration, maxDuration) {
  const container = document.getElementById("waterDrops");
  for (let i = 0; i < count; i++) {
    const drop = document.createElement("div");
    drop.className = "water-drop";
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.top = "0";

    const size = minSize + Math.random() * (maxSize - minSize);
    drop.style.width = `${size}px`;
    drop.style.height = `${size}px`;

    // Variação de cor (tons de azul)
    const hue = 190 + Math.random() * 30;
    const opacity = 0.5 + Math.random() * 0.5;
    drop.style.background = `hsla(${hue}, 100%, 70%, ${opacity})`;

    const duration = minDuration + Math.random() * (maxDuration - minDuration);
    drop.style.animationDuration = `${duration}s`;

    container.appendChild(drop);

    // Criar splash quando a gota chegar ao final
    setTimeout(() => {
      createSplash(drop);
      drop.remove();
    }, duration * 1000 * 0.9);
  }
}

function createSplash(drop) {
  const splash = document.createElement("div");
  splash.className = "water-splash";
  splash.style.left = drop.style.left;
  splash.style.top = "calc(100vh - 20px)";
  splash.style.background = drop.style.background;

  document.getElementById("waterDrops").appendChild(splash);
  setTimeout(() => splash.remove(), 500);
}

function createWaterJet() {
  const container = document.getElementById("waterDrops");
  const jet = document.createElement("div");
  jet.className = "water-jet";
  jet.style.left = `${30 + Math.random() * 40}vw`;
  jet.style.top = "0";

  const hue = 190 + Math.random() * 30;
  jet.style.background = `linear-gradient(to bottom, 
                hsla(${hue}, 100%, 80%, 0.8), 
                hsla(${hue}, 100%, 80%, 0)`;

  container.appendChild(jet);

  // Criar pequenas gotas que saem do jato
  const jetInterval = setInterval(() => {
    if (Math.random() > 0.3) {
      const drop = document.createElement("div");
      drop.className = "water-drop";
      drop.style.left = jet.style.left;
      drop.style.top = `${Math.random() * 100}px`;
      drop.style.width = `${3 + Math.random() * 5}px`;
      drop.style.height = drop.style.width;
      drop.style.background = `hsla(${hue}, 100%, 70%, 0.7)`;
      drop.style.animationDuration = `${0.5 + Math.random()}s`;
      container.appendChild(drop);

      setTimeout(() => drop.remove(), 1000);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(jetInterval);
    jet.remove();
  }, 800);
}

function tiltThePipe() {
  if (isProcessing) return;

  isProcessing = true;
  const pipe = document.getElementById("pipe");
  pipe.classList.add("active");

  // Efeitos visuais aleatórios
  createRandomWaterEffect();

  // Update counter
  clickCount++;
  localStorage.setItem("tilambucadasCount", clickCount);
  updateCounterDisplay();

  setTimeout(() => {
    // Show success modal only on first 2 clicks
    if (clickCount <= 2) {
      showModal("successModal");
    }
    // Show challenge modal only on 9th click if not shown before
    else if (clickCount === 9 && !challengeShown) {
      showModal("challengeModal");
    }

    pipe.classList.remove("active");
    isProcessing = false;
  }, 500);
}

// Initialize modal states
hideModal("successModal");
hideModal("challengeModal");
hideModal("responseModal");
