function player() {
    let score = 0;
    let name;
    let symbol;
    const resetScore = () => {
        score = 0;
    }

    const incrementScore = () => {
        score++;
    }
    const setName = (newName) => {
        name = newName;
    }
    const setSymbol = (newSymbol) => {
        symbol = newSymbol;
    }
    const getName = () => name;
    const getSymbol = () => symbol;

    const getScore = () => score;

    return { 
        getName,
        getSymbol,
        setName,
        setSymbol,
        getScore,
        resetScore,
        incrementScore,
    };
}

const gameBoard = (() => {
    const full = false;
    const board = ['', '', '', '', '', '', '', '', ''];

    const isFull = () => {
        return board.every(cell => cell !== '');
    }

    const getBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    const markCell = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol;
            return true;
        }
        return false;
    }

    return {
        getBoard,
        isFull,
        markCell,
        resetBoard
    };
})();

function displayBoard() {
    const board = gameBoard.getBoard();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

const ticTacToe = (() => {
    const nextRoundButton = document.querySelector('#next-round');
    const player1Element = document.querySelector('.player.one');
    const player2Element = document.querySelector('.player.two');
    const drawElement = document.querySelector('.draw-count');
    const drawDiv = document.querySelector('.draw');

    const player1 = player();
    const player2 = player();
    let gameOver = false;
    let drawCount = 0;

    player1.setName('Player 1');
    player1.setSymbol('X');
    player2.setName('Player 2');
    player2.setSymbol('O');

    let currentPlayer = player1;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];  

    const displayScores = () => {  
        const player1Score = document.querySelector('.player-one-score');
        const player2Score = document.querySelector('.player-two-score');
        player1Score.textContent = `${player1.getScore()}`;
        player2Score.textContent = `${player2.getScore()}`;
    }

    const switchPlayer = () => {
        player1Element.classList.toggle('active');
        player2Element.classList.toggle('active');
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const handleCellClick = (index) => {
        const resultElement = document.querySelector('.round-result');
        if (gameBoard.markCell(index, currentPlayer.getSymbol()) && !gameOver) {
            displayBoard();
            if (checkWin()) {
                currentPlayer.incrementScore();
                gameOver = true;
                nextRoundButton.classList.add('active');
                displayScores();
                resultElement.textContent = `${currentPlayer.getName()} wins!`;
                resultElement.classList.add('white-border');
            } else if (gameBoard.isFull()) {
                drawCount++;
                drawElement.textContent = `${drawCount}`;
                gameOver = true;
                nextRoundButton.classList.add('active');
                resultElement.textContent = `It's a draw!`;
                resultElement.classList.add('white-border');
                drawDiv.classList.add('active');
                player1Element.classList.remove('active');
                player2Element.classList.remove('active');

            } else {
                switchPlayer();
            }
        }

    }

    const checkWin = () => {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard.getBoard()[index] === currentPlayer.getSymbol();
            });
        });
    }

    const resetGame = () => {
        drawCount = 0;
        drawElement.textContent = `${drawCount}`;
        player1Element.classList.add('active');
        player2Element.classList.remove('active');
        drawDiv.classList.remove('active');
        nextRoundButton.classList.remove('active');
        player1.resetScore();
        player2.resetScore();
        gameOver = false;
        gameBoard.resetBoard();
        displayBoard();
        displayScores();
        const resultElement = document.querySelector('.round-result');
        resultElement.textContent = '';
        resultElement.classList.remove('white-border');
    }

    const nextRound = () => {
        if (gameOver) {
            nextRoundButton.classList.remove('active');
            player1Element.classList.add('active');
            player2Element.classList.remove('active');
            drawDiv.classList.remove('active');
            const resultElement = document.querySelector('.round-result');
            resultElement.textContent = '';
            resultElement.classList.remove('white-border');
            gameOver = false;
            gameBoard.resetBoard();
            displayBoard();
        }
    }

    const play = (player1Name, player2Name) => {
        resetGame();
        player1.setName(player1Name);
        player2.setName(player2Name);
        const player1NameElement = document.querySelector('.player.one>div');
        const player2NameElement = document.querySelector('.player.two>div');
        player1NameElement.textContent = `(${player1.getSymbol()}) ${player1.getName()}`;
        player2NameElement.textContent = `(${player2.getSymbol()}) ${player2.getName()}`;
        const cells = document.querySelectorAll('.cell');
        const restartButton = document.querySelector('#reset');
        const nextRoundButton = document.querySelector('#next-round');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index));
        });
        restartButton.addEventListener('click', resetGame);
        nextRoundButton.addEventListener('click', nextRound);

    }
    
    return {
        play,
        nextRound,
        handleCellClick,
    };
})();

const dialog = document.querySelector('dialog');
dialog.showModal();

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
    const player1Name = (document.querySelector('#player1-name').value) ? document.querySelector('#player1-name').value : 'Player 1';
    const player2Name = (document.querySelector('#player2-name').value) ? document.querySelector('#player2-name').value : 'Player 2';
    dialog.close();
    ticTacToe.play(player1Name, player2Name);
});

