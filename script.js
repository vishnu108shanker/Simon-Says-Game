(() => {
  // ---------- Config / State ----------
  const FLASH_DURATION = 500; // ms
  const BUTTON_COUNT = 4;

  const startBtn = document.querySelector("#start");
  const statusEl = document.querySelector("#begin");
  const buttons = Array.from(document.querySelectorAll(".button")); // NodeList -> Array

  let sequence = [];      // full game sequence (ids)
  let userSequence = [];  // current user input for this level
  let level = 0;
  let playing = false;    // true when the game is active
  let isPlayingBack = false; // true while the game is flashing the sequence

  // ---------- Helpers ----------
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getRandomButtonId = () => {
    // returns "button1" .. "button4"
    const idx = Math.floor(Math.random() * BUTTON_COUNT) + 1;
    return `button${idx}`;
  };

  const setStatus = (html) => {
    statusEl.innerHTML = html;
  };

  const enableUserInput = (enable) => {
    buttons.forEach((btn) => (btn.disabled = !enable));
  };

  // ---------- Visual flash helpers ----------
  const flashButton = async (btnEl, className = "btnFlash") => {
    btnEl.classList.add(className);
    await sleep(FLASH_DURATION);
    btnEl.classList.remove(className);
  };

  const flashButtonById = async (id, className = "btnFlash") => {
    const btn = document.getElementById(id);
    if (!btn) return;
    await flashButton(btn, className);
  };

  // ---------- Game flow ----------
  const startGame = async () => {
    if (playing) return; // ignore if already started
    playing = true;
    level = 0;
    sequence = [];
    setStatus("<h1>Game starts — good luck!</h1>");
    startBtn.textContent = "Restart";
    await nextLevel();
  };

  const nextLevel = async () => {
    userSequence = [];
    level += 1;
    setStatus(`<h1>Level ${level}</h1>`);

    // add new random button to sequence and play entire sequence
    sequence.push(getRandomButtonId());
    await playSequence();
  };

  const playSequence = async () => {
    isPlayingBack = true;
    enableUserInput(false);

    // Play each id in sequence with a short interval
    for (const id of sequence) {
      await flashButtonById(id, "btnFlash");
      await sleep(200); // small gap between flashes
    }

    isPlayingBack = false;
    enableUserInput(true);
  };

  const handleUserClick = async (evt) => {
    if (!playing || isPlayingBack) return;

    const btn = evt.currentTarget;
    const id = btn.id;
    // Visual feedback for user press
    await flashButton(btn, "userbtnFlash");

    userSequence.push(id);
    checkAnswer();
  };

  const checkAnswer = () => {
    const lastIndex = userSequence.length - 1;

    // Wrong selection
    if (userSequence[lastIndex] !== sequence[lastIndex]) {
      gameOver();
      return;
    }

    // If user finished the sequence for this level, go to next level
    if (userSequence.length === sequence.length) {
      // small delay so user sees final success flash
      setTimeout(() => nextLevel(), 700);
    }
  };

  const gameOver = () => {
    enableUserInput(false);
    playing = false;
    isPlayingBack = false;
    setStatus(
      `<h3>Game over — your score: <strong>${level - 1}</strong></h3>
       <p>Click Start to play again</p>`
    );
    startBtn.textContent = "Start";
    // Reset state so user can restart
    sequence = [];
    userSequence = [];
    level = 0;
  };

  // ---------- Event listeners ----------
  startBtn.addEventListener("click", startGame);

  // Add click listeners to each color button
  buttons.forEach((btn) => {
    btn.addEventListener("click", handleUserClick);
  });

  // initialize view
  enableUserInput(false);
  setStatus("<h1>Click Start to play</h1>");
})();
