const domController = (() => {
    const playButton = document.getElementById("btn-play");
    const boardDom = document.querySelector("table");
    const dialogueBox = document.querySelector(".game-dialogue");
    const resetButton = document.getElementById("btn-reset");
    const zones = document.querySelectorAll(".zone");
    const icons = document.querySelectorAll("i")

    const start = () => {
        playButton.style.display = "none";
        boardDom.style.display = "inline-block";
        document.getElementById("game-text-box").style.display = "block";
    }

    zones.forEach((zone) => {
        zone.addEventListener("click", (e) => {
            if (gameController.getGameOver() || e.target.textContent !== "") return;
            gameController.play(parseInt(e.target.dataset.index, 10))
        })
    })

    const updateGameboard = () => {
        for (let i = 0; i < zones.length; i++) {
            zones[i].textContent = gameBoard.getZone(i);
        }
    };

    const reset = () => {
        zones.forEach((e) => {
            e.textContent = ""
        })
    }

    resetButton.addEventListener("click", () => {
        reset()
        gameBoard.reset()
        gameController.reset()
        domController.dialogueBox.innerHTML = `Turn: Player ${gameController.getplayerNext()}`
    })

    return {
        start, playButton, dialogueBox, icons, updateGameboard
    }
})()


const Player = (symbol) => {
    const getSymbol = () => symbol

    return {
        getSymbol
    }
}

const gameBoard = (() => {
    const board = Array(9).fill("")

    const setZone = (index, symbol) => {
        board[index] = symbol;
    };

    const getZone = (index) => board[index];

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }
    return {
        board, setZone, getZone, reset
    }
})()

const gameController = (() => {
    const playerO = Player("O")
    const playerX = Player("X")
    let turn = true
    let gameOver = false
    let playerLost = ""
    const getPlayerLost = () => playerLost
    let playerNext = ""
    const getplayerNext = () => playerNext


    const getGameOver = () => gameOver;

    const reset = () => {
        gameOver = false
    }

    const checkDraw = () => {
        if (gameBoard.board.every((e => e !== ""))) {
            domController.dialogueBox.innerHTML = "Draw"
        }
    }

    const playerTurn = (zone, currentPlayer, opposingPlayer) => {
        gameBoard.setZone(zone, currentPlayer.getSymbol())
        domController.updateGameboard()
        if (checkWinner(zone, currentPlayer.getSymbol())) {
            gameOver = true;
            playerLost = opposingPlayer.getSymbol()
            domController.dialogueBox.innerHTML = `Player ${currentPlayer.getSymbol()} Won!`
        } else {
            domController.dialogueBox.innerHTML = `Turn: Player ${opposingPlayer.getSymbol()}`
        }
        playerNext = opposingPlayer.getSymbol()
    }

    const play = (zoneIndex) => {
        if (turn) {
            playerTurn(zoneIndex, playerX, playerO)
        } else {
            playerTurn(zoneIndex, playerO, playerX)
        }
        checkDraw()
        turn = !turn;
    }

    const checkWinner = (zoneIndex, symbol) => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winCombinations
            .filter((combination) => combination.includes(zoneIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getZone(index) === symbol
                )
            );
    };

    domController.playButton.addEventListener("click", () => {
        domController.start()
        domController.dialogueBox.innerHTML = `Turn: Player ${playerO.getSymbol()}`
    })

    return {
        play, checkWinner, checkDraw, getGameOver, reset, getplayerNext
    };
})();