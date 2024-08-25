import React from 'react';

const GameBoard = ({ gameState, websocket }) => {
    const handleClick = (row, col) => {
        
        const moveCommand = prompt("Enter move command (e.g., FR, BL)");
        if (moveCommand) {
            const message = JSON.stringify({
                type: 'move',
                player: gameState.currentPlayer,
                character: `P:${moveCommand}`, // Example for Pawn
                move: moveCommand
            });
            websocket.send(message);
        }
    };

    return (
        <div style={styles.board}>
            {gameState.grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleClick(rowIndex, colIndex)}
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'white' : 'gray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                        }}
                    >
                        {cell}
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    board: {
        display: 'grid',
        gridTemplateColumns: `repeat(${5}, 50px)`,
        gridTemplateRows: `repeat(${5}, 50px)`,
        gap: '1px'
    },
};

export default GameBoard;
