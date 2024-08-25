import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import Chat from './Chat';
import MovementRules from './MovementRules'; 
import { connectWebSocket } from './websocket';

const App = () => {
    const [gameState, setGameState] = useState(null);
    const [websocket, setWebSocket] = useState(null);

    useEffect(() => {
        const ws = connectWebSocket((message) => {
            const data = JSON.parse(message.data);
            console.log('WebSocket message received:', data);
            if (data.type === 'gameState') {
                setGameState(data.state);
            }
        });
        setWebSocket(ws);
    
    }, []);
    
    

    return (
        <div style={styles.container}>
            <h1>Chess-like Game</h1>
            {gameState && (
                <>
                    <div style={styles.boardContainer}>
                        <GameBoard gameState={gameState} websocket={websocket} />
                    </div>
                    
                    <div style={styles.chatContainer}>
                        <Chat websocket={websocket} />
                    </div>
                    <MovementRules />
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
    },
    boardContainer: {
        marginBottom: '20px'
    },
    chatContainer: {
        marginTop: '20px', 
    },
};

export default App;
