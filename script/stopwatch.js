const circle = document.querySelector('.progress-ring__circle');
const timeDisplay = document.querySelector('.time-display');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const pomodoroButtons = document.querySelectorAll('.pomodoro-btn');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

let totalSeconds = 25 * 60;
let remaining = totalSeconds;
let interval;

function updateDisplay() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2,'0');
  const seconds = (remaining % 60).toString().padStart(2,'0');
  timeDisplay.textContent = `${minutes}:${seconds}`;
  const percent = ((totalSeconds - remaining) / totalSeconds) * 100;
  setProgress(percent);
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(interval);
      remaining = totalSeconds;
      updateDisplay();
      setProgress(0);
      return;
    }
    remaining--;
    updateDisplay();
  }, 1000);
}

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  remaining = totalSeconds;
  updateDisplay();
  setProgress(0);
});

// Function to set theme color for everything
function setThemeColor(color) {
  circle.style.stroke = color;
  timeDisplay.style.color = color;
  startBtn.style.backgroundColor = color;
  resetBtn.style.backgroundColor = color;
  startBtn.style.boxShadow = `0 6px 12px ${hexToRgba(color, 0.2)}`;
  resetBtn.style.boxShadow = `0 6px 12px ${hexToRgba(color, 0.2)}`;

  pomodoroButtons.forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.style.backgroundColor = color;
      btn.style.color = '#fff';
    } else {
      btn.style.backgroundColor = '#eee';
      btn.style.color = '#333';
    }
  });
}

// Handle session buttons
pomodoroButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    pomodoroButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    clearInterval(interval);

    let color;
    if (btn.textContent === "Study Session") {
      totalSeconds = 25 * 60;
      color = "#5C3E94"; 
    } else if (btn.textContent === "Short Break") {
      totalSeconds = 5 * 60;
      color = "#4CAF50"; 
    } else if (btn.textContent === "Long Break") {
      totalSeconds = 15 * 60;
      color = "#FF9800"; 
    }

    remaining = totalSeconds;
    updateDisplay();
    setProgress(0);
    setThemeColor(color);
  });
});

// Start button
startBtn.addEventListener('click', () => startTimer());

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

updateDisplay();
setThemeColor("#5C3E94");