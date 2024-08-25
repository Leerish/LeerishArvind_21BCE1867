import React, { useState } from 'react';

const Chat = ({ websocket }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message) {
            websocket.send(JSON.stringify({ type: 'chat', message }));
            setMessages([...messages, { sender: 'You', text: message }]);
            setMessage('');
        }
    };

    return (
        <div style={styles.chat}>
            <div style={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
};

const styles = {
    chat: {
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px',
        margin: '10px auto',  
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    messages: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginBottom: '10px'
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginRight: '10px'  
    },
    button: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default Chat;
