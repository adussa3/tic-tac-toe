const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // // RECALL: we DON'T want to directly update the matrix because it's still has the same memory address (this can cause weird bugs)
    // //         instead, we need to return a copy of the matrix with a NEW memory address
    // const handleSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //         if (!updatedGameBoard[rowIndex][colIndex]) updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     });

    //     onSelectSquare();
    // };

    let gameBoard = initialGameBoard;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        {/** NOTE: you don't have to check for null for the disabled attribute because null is falsey
                                         *         but I'm just adding it for clarity
                                         */}
                                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                            {playerSymbol}
                                        </button>
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
