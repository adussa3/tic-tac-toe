import { useState } from "react";

export default function Player({ initialName = "Player", symbol, isActive }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
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
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
