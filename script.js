const playButton = document.getElementById("btn-play");
const boardDom = document.querySelector("table");
const gameDialogue = document.querySelector(".game-dialogue");
const player1 = {}
const player2 = {}

const game = (() => {
    const start = () => {
        playButton.style.display = "none";
        boardDom.style.display = "inline-block";
        document.getElementById("game-text-box").style.display = "block";
        const enterNameText = "please enter your name and choose which symbol you'll play as"
        // runs function that generates dialogue that asks PLAYER 1 for name and symbol
        gameDialogue.innerHTML = `Player 1, ${enterNameText}`
    };
    return {
        start,
    };
})();

// const gameBoard = {
//     const board = Array.apply(null, { length: 9 })


// };
playButton.addEventListener("click", game.start);
