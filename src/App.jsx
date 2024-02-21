import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

function deriveActivePlayer(gameTurns) {
    let activePlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") activePlayer = "O";
    return activePlayer;
}
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const [square1, square2, square3] = combination;
        const firstSquareSymbol = gameBoard[square1.row][square1.column];
        const secondSquareSymbol = gameBoard[square2.row][square2.column];
        const thirdSquareSymbol = gameBoard[square3.row][square3.column];

        console.log(firstSquareSymbol);

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = firstSquareSymbol;
        }
    }

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            // NOTE: we DON'T want to do "player: activePlayer" because we would be combining two different states
            // we're not getting the prev value of activePlayer! It's possible that changes made to the state aren't applied
            // before the re-render
            return [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
        });
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
                </ol>
                {winner && <p>You won, {winner}!</p>}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
