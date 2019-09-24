// ALL THE CODE INSIDE DOM
window.addEventListener('DOMContentLoaded', () => {
  // BOARD const
  const board = []
  const boardWidth = 18
  const boardHeight = 12

  // SNAKE const
  let snakeX
  let snakeY
  let snakeLength
  let snakeDirection
  function initGame() {
    const grid = document.querySelector('#board')
    for (let y = 0; y < boardHeight; ++y) {
      const row = []
      for (let x = 0; x < boardWidth; ++x) {
        const cell = {}
        // Create a <div></div> and store it in the cell object
        cell.element = document.createElement('div')
        // Add it to the board
        grid.appendChild(cell.element)
        // Add to list of all
        row.push(cell)
      }
      // Add this row to the board
      board.push(row)
    }
    startGame()
    // Start the game loop (it will call itself with timeout)
    gameLoop()
  }
  function placeCoin() {
    // Random areas for coins to display
    var coinX = Math.floor(Math.random() * boardWidth)
    var coinY = Math.floor(Math.random() * boardHeight)
    board[coinY][coinX].coin = 1
  }
  function startGame() {
    // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2)
    snakeY = Math.floor(boardHeight / 2)
    snakeLength = 3
    snakeDirection = 'Up'
    // Clear the board
    for (var y = 0; y < boardHeight; ++y) {
      for (var x = 0; x < boardWidth; ++x) {
        board[y][x].snake = 0
        board[y][x].coin = 0
      }
    }
    // Center of board for snake
    board[snakeY][snakeX].snake = snakeLength

    // First coin on the board.
    placeCoin()
  }
  function gameLoop() {
    // Update position depending on which direction the snake is moving.
    switch (snakeDirection) {
      case 'Up': snakeY--
        break
      case 'Down': snakeY++
        break
      case 'Left': snakeX--
        break
      case 'Right': snakeX++
        break
    }
    // Check for walls, and restart if we collide with any
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
      startGame()
    }
    // Tail collision
    if (board[snakeY][snakeX].snake > 0) {
      startGame()
    }
    // Collect coins
    if (board[snakeY][snakeX].coin === 1) {
      snakeLength++
      board[snakeY][snakeX].coin = 0
      placeCoin()
    }
    // SCORE

    document.querySelector('#score').innerHTML = `Your score is ${snakeLength - 3} BTC`
    // Update the board at the new snake position
    board[snakeY][snakeX].snake = snakeLength
    // Loop over the entire board, and update every cell
    for (var y = 0; y < boardHeight; ++y) {
      for (var x = 0; x < boardWidth; ++x) {
        var cell = board[y][x]
        if (cell.snake > 0) {
          cell.element.className = 'snake'
          cell.snake -= 1
        } else if (cell.coin === 1) {
          cell.element.className = 'coin'
        } else {
          cell.element.className = ''
        }
      }
    }
    // This function call
    setTimeout(gameLoop, 1000 / snakeLength)
  }
  document.body.onkeydown = function enterKey(event) {
    // Update direction depending on key hit
    switch (event.key) {
      case 'ArrowUp': snakeDirection = 'Up'
        break
      case 'ArrowDown': snakeDirection = 'Down'
        break
      case 'ArrowLeft': snakeDirection = 'Left'
        break
      case 'ArrowRight': snakeDirection = 'Right'
        break
    }
    // This prevents the arrow keys from scrolling the window
    event.preventDefault()
  }
  initGame()
}) 