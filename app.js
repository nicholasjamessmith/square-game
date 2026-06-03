let squareCount = 0;
let largeSquareCount = 0;
let totalValue = 0;
let clickCount = 0;
let gameActive = false;
let timeLeft = 60;
let timerInterval = null;

const startButton = document.getElementById('startButton');
const addSquareButton = document.getElementById('addSquareButton');
const add3SquaresButton = document.getElementById('add3SquaresButton');
const add5SquaresButton = document.getElementById('add5SquaresButton');
const gameButtons = [addSquareButton, add3SquaresButton, add5SquaresButton];
const modal = document.getElementById('modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalClose = document.querySelector('.close');
const modalScore = document.getElementById('modal-score');
const modalCount = document.getElementById('modal-count');
const timerEl = document.getElementById('timer');

function updateTimerDisplay() {
  timerEl.innerText = `Time: ${timeLeft}`;
}

function updateCounter() {
  document.getElementById('counter').innerText = `Score: ${clickCount}`;
}

function updateCount() {
  document.getElementById('count').innerText = `Count: ${totalValue}`;
}

function setButtonsDisabled(disabled) {
  gameButtons.forEach((btn) => {
    btn.disabled = disabled;
  });
}

function showModal() {
  modalScore.innerText = `Score: ${clickCount}`;
  modalCount.innerText = `Count: ${totalValue}`;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timeLeft = 60;
  updateTimerDisplay();
  gameActive = true;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  gameActive = false;
  setButtonsDisabled(true);
  showModal();
}

function resetToIdle() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  gameActive = false;
  const squareContainer = document.getElementById('squareContainer');
  squareContainer.innerHTML = '';

  squareCount = 0;
  largeSquareCount = 0;
  totalValue = 0;
  clickCount = 0;
  timeLeft = 60;

  hideModal();
  setButtonsDisabled(true);
  startButton.disabled = false;
  startButton.style.display = 'inline-block';
  updateTimerDisplay();
  updateCounter();
  updateCount();
}

function startGame() {
  startButton.disabled = true;
  startButton.style.display = 'none';
  setButtonsDisabled(false);
  gameActive = true;
  addSquares(1, true);
  startTimer();
}

function addSquares(numSquares, isInitial = false) {
  if (!gameActive) return;

  const squareContainer = document.getElementById('squareContainer');

  if (!isInitial) {
    clickCount++;
  }

  for (let i = 0; i < numSquares; i++) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('square');
    squareContainer.appendChild(newSquare);
  }

  squareCount += numSquares;
  totalValue = squareCount + (largeSquareCount * 10);

  updateCount();
  updateCounter();

  if (squareCount >= 10 && squareCount % 10 === 0) {
    transformSquares();
  }
}

function transformSquares() {
  const squareContainer = document.getElementById('squareContainer');
  const squares = document.querySelectorAll('.square');
  const multiplesOf10 = Math.floor(squareCount / 10);

  squares.forEach((square) => {
    square.style.backgroundColor = '#66FF00';
  });

  setTimeout(() => {
    if (!gameActive) return;

    squares.forEach((square) => {
      square.remove();
    });

    for (let i = 0; i < multiplesOf10; i++) {
      const largeSquare = document.createElement('div');
      largeSquare.classList.add('large-square');
      squareContainer.insertBefore(largeSquare, squareContainer.firstChild);
    }

    largeSquareCount += multiplesOf10;
    squareCount -= multiplesOf10 * 10;
    totalValue = squareCount + (largeSquareCount * 10);

    updateCount();
    updateCounter();
  }, 1000);
}

modalClose.addEventListener('click', resetToIdle);
modalBackdrop.addEventListener('click', resetToIdle);

addSquareButton.addEventListener('click', () => addSquares(1));
add3SquaresButton.addEventListener('click', () => addSquares(3));
add5SquaresButton.addEventListener('click', () => addSquares(5));

startButton.addEventListener('click', startGame);

window.onload = () => {
  resetToIdle();
};
