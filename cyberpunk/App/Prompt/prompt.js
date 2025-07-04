function activateSystem(system) {
  const terminal = document.getElementById("terminalOutput");
  const statusElement = document.getElementById("systemStatus");
  const btnColors = {
    mainframe: "cyan",
    defense: "purple",
    override: "pink",
    alert: "yellow",
    selfDestruct: "red",
  };

  // Create particles
  for (let i = 0; i < 30; i++) {
    createParticle(btnColors[system]);
  }

  // Add command to terminal
  const commandLine = document.querySelector(".command-line");
  commandLine.classList.add("hidden");

  const newEntry = document.createElement("div");
  newEntry.className = "mb-2";

  // System specific responses
  let response = "";
  let status = "OPERATIONAL";
  let statusClass = "text-green-500";

  switch (system) {
    case "mainframe":
      response = "> Mainframe boot sequence initiated...\n> Core systems online\n> Quantum processors activated";
      break;
    case "defense":
      response = "> Defense protocols engaged\n> Firewall reinforced\n> Intrusion detection active";
      status = "SECURED";
      statusClass = "text-purple-400";
      break;
    case "override":
      response = "> ADMIN OVERRIDE ACCEPTED\n> WARNING: Security bypassed\n> Full access granted";
      status = "OVERRIDE ACTIVE";
      statusClass = "text-pink-400";
      break;
    case "alert":
      response = "> ALERT SIGNAL BROADCAST\n> All units notified\n> Emergency protocols engaged";
      status = "ALERT STATUS";
      statusClass = "text-yellow-400";
      break;
    case "selfDestruct":
      response = "> WARNING: SELF-DESTRUCT INITIATED\n> Countdown: 10...9...8...\n> ABORT? (Y/N)";
      status = "CRITICAL";
      statusClass = "text-red-500 animate-pulse";

      // Add dramatic effect
      document.body.style.filter = 'url("#glitch")';
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 500);
      break;
  }

  newEntry.innerHTML = `> <span class="text-${btnColors[system]}-400">${system.toUpperCase()} command received</span>\n${response}`;
  terminal.appendChild(newEntry);

  // Update status
  statusElement.textContent = status;
  statusElement.className = `font-bold ${statusClass}`;

  // Scroll to bottom
  terminal.scrollTop = terminal.scrollHeight;

  // Show command line again after delay
  setTimeout(() => {
    commandLine.classList.remove("hidden");
  }, 2000);
}

// Quick action functions
function quickAction(action) {
  const terminal = document.getElementById("terminalOutput");
  const commandLine = document.querySelector(".command-line");
  commandLine.classList.add("hidden");

  const newEntry = document.createElement("div");
  newEntry.className = "mb-2";

  let response = "";
  let color = "cyan";

  switch (action) {
    case "scan":
      response = "> Scanning network...\n> 3 devices found\n> No threats detected";
      color = "cyan";
      break;
    case "encrypt":
      response = "> Encryption protocol engaged\n> Data secured with AES-256\n> Key rotation complete";
      color = "purple";
      break;
    case "decrypt":
      response = "> Decryption in progress...\n> Access granted\n> Firewall temporarily lowered";
      color = "pink";
      break;
    case "ping":
      response = "> Pinging 192.168.1.1...\n> Reply received - 4ms\n> Connection stable";
      color = "yellow";
      break;
  }

  // Create particles
  for (let i = 0; i < 15; i++) {
    createParticle(color);
  }

  newEntry.innerHTML = `> <span class="text-${color}-400">${action.toUpperCase()} executed</span>\n${response}`;
  terminal.appendChild(newEntry);

  // Scroll to bottom
  terminal.scrollTop = terminal.scrollHeight;

  // Show command line again after delay
  setTimeout(() => {
    commandLine.classList.remove("hidden");
  }, 1500);
}

// Particle creation function
function createParticle(color = "cyan") {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Set size and color based on type
  const size = Math.random() * 6 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  const colors = {
    cyan: "#0ff0fc",
    purple: "#b026ff",
    pink: "#ff26f7",
    yellow: "#f4ff26",
    red: "#ff2626",
  };

  particle.style.background = colors[color] || colors.cyan;
  particle.style.boxShadow = `0 0 ${size * 2}px ${colors[color] || colors.cyan}, 0 0 ${size * 4}px ${colors[color] || colors.cyan}`;

  // Random position around the body
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);

  // Animate particle
  const angle = Math.random() * Math.PI * 2;
  const velocity = 1 + Math.random() * 4;
  const lifetime = 800 + Math.random() * 1200;

  let startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / lifetime;

    if (progress >= 1) {
      particle.remove();
      return;
    }

    const distance = (velocity * elapsed) / 20;
    const currentX = x + Math.cos(angle) * distance;
    const currentY = y + Math.sin(angle) * distance;

    particle.style.left = `${currentX}px`;
    particle.style.top = `${currentY}px`;
    particle.style.opacity = 1 - progress;

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Simulate typing in command line
function simulateTyping() {
  const commands = ["scan network --deep", "encrypt /core/systems --aes256", "ping 192.168.1.1 --count 4", "analyze threat_level", "override security --admin", "help"];

  const currentCommand = document.getElementById("currentCommand");
  let commandIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = commands[commandIndex];

    if (isDeleting) {
      currentCommand.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, 50);
      }
    } else {
      currentCommand.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 100 + Math.random() * 50);
      }
    }
  }

  setTimeout(type, 1000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  simulateTyping();

  // Add glitch effect to random elements occasionally
  setInterval(() => {
    const elements = document.querySelectorAll(".cyber-btn, .terminal, .cyber-card");
    const randomElement = elements[Math.floor(Math.random() * elements.length)];

    randomElement.classList.add("glitch-effect");
    setTimeout(() => {
      randomElement.classList.remove("glitch-effect");
    }, 300);
  }, 8000);
});
