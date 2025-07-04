function executeCommand() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");

  if (input.value.trim() === "") return;

  // Add command to terminal
  output.innerHTML += `<p class="mb-2"><span class="text-green-400">user@cyberterm:~$</span> ${input.value}</p>`;

  // Process command
  const response = processCommand(input.value.toLowerCase());
  output.innerHTML += `<p class="mb-2">${response}</p>`;

  // Clear input and scroll to bottom
  input.value = "";
  output.scrollTop = output.scrollHeight;
}

function processCommand(cmd) {
  const responses = ["ERROR: Command not recognized. Type 'help' for available commands.", "SYSTEM: Processing request...", "WARNING: Insufficient permissions for this operation.", "INFO: Command executed with exit code 0.", "ALERT: Unauthorized access attempt logged.", "SUCCESS: Operation completed."];

  if (cmd === "help") {
    return "Available commands: status, scan, hack, clear, about";
  } else if (cmd === "clear") {
    document.getElementById("terminalOutput").innerHTML = "";
    return "";
  } else if (cmd === "hack") {
    runHackSequence();
    return "Initializing hack sequence...";
  } else if (cmd === "tilambucar") {
    tiltThePipe();
    return "Executing tilambucar protocol...";
  } else if (cmd === "status") {
    return "System status: ONLINE<br>Firewall: ACTIVE<br>Neural load: 45%";
  } else if (cmd === "about") {
    return "CyberTerminal v4.2.0<br>Neural interface system<br>(c) 2023 CyberSystems Inc.";
  } else {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Allow Enter key to execute command
document.getElementById("terminalInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    executeCommand();
  }
});

// Original button functions
function tiltThePipe() {
  const pipe = document.getElementById("pipe");
  pipe.classList.add("active");

  // Create particles
  for (let i = 0; i < 20; i++) {
    createParticle();
  }

  setTimeout(() => {
    pipe.classList.remove("active");
  }, 2000);
}

function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "absolute";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "#0ff0fc";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.boxShadow = "0 0 10px #0ff0fc, 0 0 20px #0ff0fc";

  // Random position around the button
  const btn = document.querySelector(".tilambucador-btn");
  const btnRect = btn.getBoundingClientRect();
  const x = btnRect.left + btnRect.width / 2 + (Math.random() - 0.5) * 40;
  const y = btnRect.top + btnRect.height / 2 + (Math.random() - 0.5) * 40;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);

  // Animate particle
  const angle = Math.random() * Math.PI * 2;
  const velocity = 2 + Math.random() * 3;
  const lifetime = 1000 + Math.random() * 1000;

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

document.querySelector(".infernal-btn").addEventListener("click", () => {
  // Glitch effect on click
  document.body.style.overflow = "hidden";
  document.body.style.filter = 'url("#glitch")';

  setTimeout(() => {
    document.body.style.filter = "none";
  }, 300);

  // Add dramatic effect to terminal
  const output = document.getElementById("terminalOutput");
  output.innerHTML += `<p class="text-red-400 mb-2">WARNING: SYSTEM DESTRUCTION SEQUENCE INITIATED</p>`;
  output.scrollTop = output.scrollHeight;
});

// Additional cyber effects
function runHackSequence() {
  const output = document.getElementById("terminalOutput");
  const originalText = output.innerHTML;

  // Clear terminal
  output.innerHTML = '<p class="text-purple-400">Initializing hack sequence...</p>';

  // Simulate hacking progress
  let progress = 0;
  const hackInterval = setInterval(() => {
    progress += 10;
    output.innerHTML = `
                    <p class="text-purple-400">Hack progress: ${progress}%</p>
                    <p class="text-xs">Bypassing firewall${".".repeat(Math.floor(progress / 10))}</p>
                    <p class="text-xs">Injecting payload${".".repeat(Math.floor(progress / 15))}</p>
                `;

    if (progress >= 100) {
      clearInterval(hackInterval);
      output.innerHTML += `
                        <p class="text-green-400 mt-2">SUCCESS: System compromised</p>
                        <p class="text-xs">Access level: ROOT</p>
                    `;

      // Add glitch effect to whole page
      document.body.style.filter = 'url("#glitch")';
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 500);
    }

    output.scrollTop = output.scrollHeight;
  }, 200);
}

// Add some random terminal messages on load
window.onload = function () {
  const messages = ["System boot sequence complete", "Neural interface established", "Firewall protocols active", "Monitoring systems online", "Ready for user input"];

  const output = document.getElementById("terminalOutput");
  messages.forEach((msg, i) => {
    setTimeout(() => {
      output.innerHTML += `<p class="mb-2"><span class="text-green-400">system@cyberterm:~$</span> ${msg}</p>`;
      output.scrollTop = output.scrollHeight;
    }, i * 500);
  });
};
