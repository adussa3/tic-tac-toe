import { useState } from "react";

export default function Player({ initialName = "Player", symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);

    // We should NOT lift the playerName state up into App because it's being used by the input
    // on EVERY keystroke
    //
    // If we move into the App component, then the ENTIRE app (the GameBoard and Log) is re-rendered on every keystroke!
    // This is really redundant and NOT what we want to do!
    //
    // Also, it would be tricky, because we call the Player component twice in App and every Player component should
    // manage it's own playerName
    //
    // Instead, we add a new state in the App component, where we store the currently set playerNames
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = (symbol) => {
        // NOTE: when isEditing is true on click, that means we're done editing and we'll set it to false
        //       then we change the name
        if (isEditing) onChangeName(symbol, playerName);
        setIsEditing((prevIsEditing) => !prevIsEditing);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setPlayerName(value);
    };

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {/*
                    This is a controlled component! It listens to the change of the input and feeding the updated value
                    back into the input (this is called two-way binding)
                */}
                {isEditing && <input type="text" className="player-name" onChange={handleChange} value={playerName} required />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick(symbol)}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
