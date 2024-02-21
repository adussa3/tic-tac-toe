export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => {
                                return (
                                    <li key={colIndex}>
                                        {/*
                                            In React, the disabled attribute is typically a boolean attribute that determines whether
                                            an element should be disabled or not. When you use disabled={playerSymbol}, you're actually
                                            setting the disabled attribute to the value of playerSymbol. In JavaScript, certain values
                                            like null, undefined, 0, false, etc., are considered "falsy" values, meaning they evaluate to 
                                            false in a boolean context.

                                            So, if playerSymbol is null, undefined, or any other falsy value, the element will be disabled. 
                                            However, if playerSymbol has any truthy value, the element will not be disabled.

                                            On the other hand, when you use disabled={playerSymbol !== null}, you're explicitly checking 
                                            whether playerSymbol is null. This ensures that the element is disabled only when playerSymbol 
                                            is exactly null, and it will be enabled for all other values, including other falsy values like 
                                            undefined, 0, false, '' or NaN.

                                            So, the difference lies in the behavior when playerSymbol is a falsy value other than null. 
                                            disabled={playerSymbol} will disable the element for any falsy value, while 
                                            disabled={playerSymbol !== null} will only disable the element when playerSymbol is exactly null.

                                            Since we have to take all this into account when we want to use the shorter syntax, 
                                            it may be easier/safer in general to just type !== null. But if we are sure that the altenative 
                                            is always a non-empty string, there should be no problem.
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
