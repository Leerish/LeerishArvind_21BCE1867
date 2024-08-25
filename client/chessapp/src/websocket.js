export function connectWebSocket(onMessage) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = onMessage;

    ws.onopen = () => {
        console.log('WebSocket connection opened');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return ws;
}
