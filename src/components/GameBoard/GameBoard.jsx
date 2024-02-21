import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // RECALL: we DON'T want to directly update the matrix because it's still has the same memory address (this can cause weird bugs)
    //         instead, we need to return a copy of the matrix with a NEW memory address
    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
            if (!updatedGameBoard[rowIndex][colIndex]) updatedGameBoard[rowIndex][colIndex] = "X";
            return updatedGameBoard;
        });
    };

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
