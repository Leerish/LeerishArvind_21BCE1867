const WebSocket = require('ws');
const { processMove } = require('./gameLogic');

const wss = new WebSocket.Server({ port: 8080 });

let game = {
    grid: Array.from({ length: 5 }, () => Array(5).fill(null)),
    currentPlayer: 'A',
    gameOver: false
};


game.grid[0] = ['A-H1', 'A-P1', null, 'A-P2', 'A-H2'];
game.grid[4] = ['B-H1', 'B-P1', null, 'B-P2', 'B-H2'];

wss.on('connection', (ws) => {
    console.log('New client connected');

    
    ws.send(JSON.stringify({
        type: 'gameState',
        state: game
    }));

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        const data = JSON.parse(message);
        if (data.type === 'move') {
            if (game.gameOver) return;

            const { player, character, move } = data;
            game = processMove(game, player, character, move);

            
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'gameState',
                        state: game
                    }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
