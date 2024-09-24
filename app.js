let squareCount = 0;  // Start with 1 red square by default
let largeSquareCount = 0;
let totalValue = 0;
let clickCount = 0; // Track number of clicks used to reach mutliple of 10

function updateCounter() {
  //const totalValue = squareCount + largeSquareCount * 10;
  document.getElementById('counter').innerText = `Score: ${clickCount}`;
}

function updateCount() {
  document.getElementById('count').innerText = `Count: ${totalValue}`;
}

// Function to create and add squares to the container
function addSquares(numSquares) {
  const squareContainer = document.getElementById('squareContainer');

  clickCount++;


  // Add new squares
  for (let i = 0; i < numSquares; i++) {
    const newSquare = document.createElement('div');
    newSquare.classList.add('square');
    squareContainer.appendChild(newSquare);
  }

  // Update the square count
  squareCount += numSquares;

  //Total value
  totalValue = squareCount + (largeSquareCount * 10)
  
  //call updateCount function
  updateCount();
  
  //call updateCounter function
  updateCounter();

  // Check if the number of squares is an exact multiple of 10
  if (squareCount >= 10 && squareCount % 10 === 0) {
    transformSquares();
  }
}

// Function to transform small squares into large squares
function transformSquares() {
  const squareContainer = document.getElementById('squareContainer');
  const squares = document.querySelectorAll('.square');
  const multiplesOf10 = Math.floor(squareCount / 10);  // Calculate how many sets of 10 squares to transform

  // Turn all small squares green
  squares.forEach(square => {
    square.style.backgroundColor = '#66FF00';
  });

  // Wait for 1 second and then remove the small squares
  setTimeout(() => {
    // Remove all the small squares
    squares.forEach(square => {
      square.remove();
    });

    // Add one large red square for each multiple of 10
    for (let i = 0; i < multiplesOf10; i++) {
      const largeSquare = document.createElement('div');
      largeSquare.classList.add('large-square');
      squareContainer.insertBefore(largeSquare, squareContainer.firstChild);  // Add large square at the beginning
    }

    // Update the counts to reflect the transformation
    largeSquareCount += multiplesOf10;  // Increment large squares based on multiples of 10
    squareCount -= multiplesOf10 * 10;  // Reduce the small square count by the multiples of 10

    // Reset click count after reaching a multiple of 10
    //clickCount = 0;

    // Update the counter display
    updateCounter();
  }, 1000);
}

const modal = document.getElementById("modal");
if (totalValue == 100) {
    document.getElementById('modal').innerText = `You won!`;
}

// Add the default square when the game starts
window.onload = () => {
  addSquares(1);  // Add 1 square by default on load
};

// Button event listeners
document.getElementById('addSquareButton').addEventListener('click', () => addSquares(1));
document.getElementById('add3SquaresButton').addEventListener('click', () => addSquares(3));
document.getElementById('add5SquaresButton').addEventListener('click', () => addSquares(5));
