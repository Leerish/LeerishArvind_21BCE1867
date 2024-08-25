import React from 'react';

const MovementRules = () => {
    return (
        <div style={{ marginTop: '20px', borderTop: '1px solid black', paddingTop: '10px' }}>
            <h2>Movement Rules</h2>
            <ul>
                <li><strong>Pawn (P):</strong> Moves 1 step in any direction (L, R, F, B).</li>
                <li><strong>Hero1 (H1):</strong> Moves 2 steps straight in any direction (L, R, F, B). Kills any opponent's character in its path.</li>
                <li><strong>Hero2 (H2):</strong> Moves 2 steps diagonally in any direction (FL, FR, BL, BR). Kills any opponent's character in its path.</li>
                <li><strong>Hero3 (H3):</strong> Moves 2 steps straight and 1 step to the side in any direction (FL, FR, BL, BR, RF, RB, LF, LB). Kills only the character at its final landing position.</li>
            </ul>
        </div>
    );
};

export default MovementRules;
