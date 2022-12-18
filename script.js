const playButton = document.getElementById("btn-play");
const boardDom = document.querySelector("table");
const dialogueBox = document.querySelector(".game-dialogue");
const zones = document.querySelectorAll(".zone");

const domController = (() => {
    const start = () => {
        playButton.style.display = "none";
        boardDom.style.display = "inline-block";
        document.getElementById("game-text-box").style.display = "block";
    }

    zones.forEach((zone) => {
        zone.addEventListener("click", (e) => {
            console.log(e.target.dataset.index)
            gameController.play(e.target.dataset.index)
        })
    })

    return {
        start
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
    return {
        board, setZone, getZone
    }
})()

const gameController = (() => {
    const playerX = Player("X")
    const playerO = Player("O")
    let turn = true

    const getCurrentPlayerSymbol = () => {
        if (turn) {
            playerO.getSymbol()
        } else {
            playerX.getSymbol()
        }
        turn = !turn;
    }

    const play = (zoneIndex) => {
        gameBoard.setZone(zoneIndex, getCurrentPlayerSymbol())

        // code to check if a player won
        // code to check if its a draw
    }


    playButton.addEventListener("click", () => {
        domController.start()
        play()
    })

    return {
        play
    };
})();