/* ============================================================
   MICRO-BREAK PODS — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- State ---- */
  let selectedMins = 5;
  let lightingMode = 'warm';
  let audioMode = 'none';
  let breathGuideOn = false;
  let timerInterval = null;
  let remainingSeconds = 300;
  let totalSeconds = 300;
  let breathPhase = 0;
  let breathInterval = null;
  const CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

  /* ---- Lighting themes ---- */
  const lightingBg = {
    warm: 'radial-gradient(ellipse at 60% 40%, rgba(245,166,35,0.18) 0%, rgba(13,26,20,0.95) 60%)',
    cool: 'radial-gradient(ellipse at 40% 60%, rgba(126,203,255,0.18) 0%, rgba(10,16,28,0.97) 60%)',
    dim:  'radial-gradient(ellipse at 50% 50%, rgba(155,89,182,0.12) 0%, rgba(8,8,18,0.98) 65%)',
  };
  const lightingActive = {
    warm: 'rgba(255,166,35,0.08)',
    cool: 'rgba(100,180,255,0.08)',
    dim:  'rgba(120,80,160,0.08)',
  };

  const audioLabels = {
    none:   '',
    rain:   '🌧  Rain sounds',
    forest: '🌿  Forest ambience',
    breath: '🫁  Breathing guidance',
  };

  /* ---- DOM refs ---- */
  const podSim       = document.getElementById('pod-sim');
  const simBg        = document.getElementById('sim-bg');
  const stateIdle    = document.getElementById('state-idle');
  const stateActive  = document.getElementById('state-active');
  const stateComplete= document.getElementById('state-complete');
  const simTimer     = document.getElementById('sim-timer');
  const ringProgress = document.getElementById('ring-progress');
  const breathGuide  = document.getElementById('breath-guide');
  const breathText   = document.getElementById('breath-text');
  const breathCircle = document.getElementById('breath-circle');
  const audioLabel   = document.getElementById('audio-label');
  const startBtn     = document.getElementById('start-btn');
  const stopBtn      = document.getElementById('stop-btn');
  const restartBtn   = document.getElementById('restart-btn');
  const breathToggle = document.getElementById('breath-guide-toggle');

  /* ---- Duration buttons ---- */
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMins = parseInt(btn.dataset.mins, 10);
    });
  });

  /* ---- Lighting buttons ---- */
  document.querySelectorAll('.light-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.light-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      lightingMode = btn.dataset.mode;
      if (podSim.contains(stateActive) && !stateActive.classList.contains('hidden')) {
        applyLighting();
      }
    });
  });

  /* ---- Audio buttons ---- */
  document.querySelectorAll('.audio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.audio-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      audioMode = btn.dataset.audio;
    });
  });

  /* ---- Breathing toggle ---- */
  breathToggle.addEventListener('change', () => {
    breathGuideOn = breathToggle.checked;
  });

  /* ---- Start session ---- */
  startBtn.addEventListener('click', startSession);
  restartBtn.addEventListener('click', resetSession);
  stopBtn.addEventListener('click', endSession);

  function startSession() {
    totalSeconds = selectedMins * 60;
    remainingSeconds = totalSeconds;

    updateTimerDisplay(remainingSeconds);
    setRingProgress(1);

    showState('active');
    applyLighting();

    audioLabel.textContent = audioLabels[audioMode];

    if (breathGuideOn || audioMode === 'breath') {
      breathGuide.classList.remove('hidden');
      startBreathCycle();
    } else {
      breathGuide.classList.add('hidden');
    }

    timerInterval = setInterval(tick, 1000);
  }

  function tick() {
    remainingSeconds--;
    updateTimerDisplay(remainingSeconds);
    setRingProgress(remainingSeconds / totalSeconds);

    if (remainingSeconds <= 0) {
      endSession(true);
    }
  }

  function endSession(completed) {
    clearInterval(timerInterval);
    clearInterval(breathInterval);
    timerInterval = null;
    breathInterval = null;
    resetBg();
    if (completed === true) {
      showState('complete');
    } else {
      resetSession();
    }
  }

  function resetSession() {
    clearInterval(timerInterval);
    clearInterval(breathInterval);
    timerInterval = null;
    breathInterval = null;
    resetBg();
    breathGuide.classList.add('hidden');
    showState('idle');
  }

  /* ---- Helpers ---- */
  function showState(name) {
    stateIdle.classList.add('hidden');
    stateActive.classList.add('hidden');
    stateComplete.classList.add('hidden');
    if (name === 'idle')     stateIdle.classList.remove('hidden');
    if (name === 'active')   stateActive.classList.remove('hidden');
    if (name === 'complete') stateComplete.classList.remove('hidden');
  }

  function updateTimerDisplay(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    simTimer.textContent = m + ':' + s;
  }

  function setRingProgress(fraction) {
    const offset = CIRCUMFERENCE * (1 - fraction);
    ringProgress.style.strokeDasharray = CIRCUMFERENCE;
    ringProgress.style.strokeDashoffset = offset;
  }

  function applyLighting() {
    simBg.style.background = lightingBg[lightingMode];
    podSim.style.background = lightingActive[lightingMode];
  }

  function resetBg() {
    simBg.style.background = '';
    podSim.style.background = '#0d1a14';
  }

  /* ---- Breathing cycle ---- */
  const breathPhases = [
    { text: 'Breathe in…',  duration: 4000 },
    { text: 'Hold…',        duration: 2000 },
    { text: 'Breathe out…', duration: 4000 },
    { text: 'Hold…',        duration: 2000 },
  ];

  function startBreathCycle() {
    breathPhase = 0;
    runBreathPhase();
  }

  function runBreathPhase() {
    if (!stateActive || stateActive.classList.contains('hidden')) return;
    const phase = breathPhases[breathPhase % breathPhases.length];
    breathText.textContent = phase.text;
    breathInterval = setTimeout(() => {
      breathPhase++;
      runBreathPhase();
    }, phase.duration);
  }

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  /* ---- Active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollY = window.scrollY + 80;
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--teal)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ---- Pod illustration timer sync ---- */
  const heroTimerDisplay = document.querySelector('.pod-timer-display');
  const heroStatus = document.querySelector('.pod-status');

  function updateHeroIllustration() {
    if (!timerInterval) {
      if (heroTimerDisplay) heroTimerDisplay.textContent = selectedMins === 5 ? '05:00' : '10:00';
      if (heroStatus) heroStatus.textContent = 'Ready';
    } else {
      const m = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
      const s = (remainingSeconds % 60).toString().padStart(2, '0');
      if (heroTimerDisplay) heroTimerDisplay.textContent = m + ':' + s;
      if (heroStatus) heroStatus.textContent = 'Active';
    }
  }

  const origTick = tick;
  function tick() {
    remainingSeconds--;
    updateTimerDisplay(remainingSeconds);
    setRingProgress(remainingSeconds / totalSeconds);
    updateHeroIllustration();
    if (remainingSeconds <= 0) endSession(true);
  }

  // Override the interval reference to use patched tick
  startBtn.removeEventListener('click', startSession);
  startBtn.addEventListener('click', () => {
    totalSeconds = selectedMins * 60;
    remainingSeconds = totalSeconds;
    updateTimerDisplay(remainingSeconds);
    setRingProgress(1);
    showState('active');
    applyLighting();
    audioLabel.textContent = audioLabels[audioMode];
    if (breathGuideOn || audioMode === 'breath') {
      breathGuide.classList.remove('hidden');
      startBreathCycle();
    } else {
      breathGuide.classList.add('hidden');
    }
    timerInterval = setInterval(tick, 1000);
    updateHeroIllustration();
  });

  /* ---- Duration change updates hero pod display ---- */
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!timerInterval) updateHeroIllustration();
    });
  });

  /* ---- Init ---- */
  updateTimerDisplay(300);
  setRingProgress(1);

})();
