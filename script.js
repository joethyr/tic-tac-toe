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
            if (e.target.textContent !== "") return;
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
    const board = new Array(9)

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

    const play = (zoneIndex) => {
        if (turn) {
            gameBoard.setZone(zoneIndex, playerO.getSymbol())
            domController.updateGameboard()
            domController.dialogueBox.innerHTML = `Turn: Player ${playerX.getSymbol()}`
            console.log(gameBoard.board)
        } else {
            gameBoard.setZone(zoneIndex, playerX.getSymbol())
            domController.updateGameboard()
            domController.dialogueBox.innerHTML = `Turn: Player ${playerO.getSymbol()}`
            console.log(gameBoard.board)

        }
        // code to check if a player won
        // code to check if its a draw
        turn = !turn;
    }


    domController.playButton.addEventListener("click", () => {
        domController.start()
        domController.dialogueBox.innerHTML = `Turn: Player ${playerO.getSymbol()}`
        // play()
    })

    return {
        play
    };
})();