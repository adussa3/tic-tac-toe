import Log from "./components/Log";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

const PLAYERS = { X: "Player 1", O: "Player 2" };

function deriveActivePlayer(gameTurns) {
    let activePlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") activePlayer = "O";
    return activePlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const [square1, square2, square3] = combination;
        const firstSquareSymbol = gameBoard[square1.row][square1.column];
        const secondSquareSymbol = gameBoard[square2.row][square2.column];
        const thirdSquareSymbol = gameBoard[square3.row][square3.column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            // NOTE: we DON'T want to do "player: activePlayer" because we would be combining two different states
            // we're not getting the prev value of activePlayer! It's possible that changes made to the state aren't applied
            // before the re-render
            return [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
        });
    };

    const handleRestart = () => {
        setGameTurns([]);
    };

    const handlePlayerNameChange = (symbol, newName) => {
        // We can dynamically get the key by using [symbol]
        // this gets the actual symbol's value!
        setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newName }));
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
                    <Player initialName={PLAYERS.Y} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
