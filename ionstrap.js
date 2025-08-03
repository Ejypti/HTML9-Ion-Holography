(function () {
  const IonSynth = {
    synthesizeBeam: function (element, options = {}) {
      console.log(`[IonSynth] Synthesizing beam for`, element);
      const beamColor = options.wavelength || '532nm';
      const intensity = options.intensity || '8000lux';
      element.style.boxShadow = `0 0 80px ${intensity.replace("lux", "") / 1000}px ${beamColor}`;
      element.style.transition = "box-shadow 1s ease-in-out";
      element.setAttribute("data-ionized", "true");
    },
    injectQuantum: function (data) {
      console.log("[IonSynth] Injected quantum stream:", data);
    },
    calibratePhase: function (mode = "auto") {
      console.log(`[IonSynth] Phase calibrated: ${mode}`);
    }
  };

  navigator.linearLight = {
    requestHologram: function (el) {
      return new Promise((resolve) => {
        console.log("[Navigator] LinearLight mode enabled for:", el);
        el.style.filter = "drop-shadow(0 0 2rem cyan)";
        resolve("Hologram initialized");
      });
    }
  };

  HTMLElement.prototype.ionize = function () {
    console.log(`[IonStrap] Ionizing element: ${this.tagName}`);
    this.style.animation = "glow 1.5s infinite alternate";
    this.setAttribute("ion-status", "active");
  };

  const canvas = document.getElementById("ion-beam-display");
  const ctx = canvas.getContext("2d");

  function animateBeams() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const length = Math.random() * 200 + 50;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.sin(i) * length, y - length);
      ctx.strokeStyle = `hsla(${i * 36}, 100%, 50%, 0.2)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    requestAnimationFrame(animateBeams);
  }
  animateBeams();

  const hud = document.createElement('div');
  hud.id = "ion-hud";
  hud.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 255, 255, 0.1);
    color: #0ff;
    font-family: monospace;
    padding: 10px;
    border: 1px solid #0ff;
    font-size: 12px;
    z-index: 9999;
  `;
  document.body.appendChild(hud);

  setInterval(() => {
    hud.innerHTML = `IonScope HUD<br>
      Photonic Flux: ${(Math.random() * 999).toFixed(2)} LPF<br>
      Phase Lock: ${Math.random() > 0.5 ? "✔" : "✖"}<br>
      Atmospheric Refraction: ${(Math.random() * 100).toFixed(1)}%<br>
      Beam Sync: ${Math.random() > 0.2 ? "Stable" : "Decaying"}`;
  }, 2000);

  const pew = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=");
  window.addEventListener('click', () => pew.play());

  window.addEventListener("DOMContentLoaded", () => {
    const beams = document.querySelectorAll("ion-beam");
    beams.forEach((beam) => {
      IonSynth.synthesizeBeam(beam, {
        wavelength: beam.getAttribute("linear-wavelength") || '520nm',
        intensity: beam.getAttribute("ion-intensity") || '8500lux'
      });
    });

    const lenses = document.querySelectorAll("ion-lens");
    lenses.forEach((lens) => {
      lens.ionize();
    });
  });

  window.IonSynth = IonSynth;
})();