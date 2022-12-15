const playButton = document.getElementById("btn-play");
const boardDom = document.querySelector("table");

const game = (() => {
    const start = () => {
        playButton.style.display = "none";
        boardDom.style.display = "inline-block";
        document.getElementById("game-text-box").style.display = "block";
    };
    return {
        start,
    };
})();

playButton.addEventListener("click", game.start);




// const player = (name, symbol) => {
//     const create = () => {

//     }

// };

// const gameBoard = {
//     const board = Array.apply(null, { length: 9 })

// };
