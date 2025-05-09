import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages/');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data) : [];
      setMessages(messagesArray);
    });
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const messagesRef = ref(db, 'messages/');
    push(messagesRef, {
      text: input,
      user: username,
      createdAt: Date.now(),
    });
    setInput('');
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f0f4f8', color: '#111827', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#1f2937' }}>Sohbet Odası</h2>

      <div
        style={{
          marginBottom: 20,
          maxHeight: '60vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          padding: 15,
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              backgroundColor: msg.user === username ? '#d1fae5' : '#e5e7eb',
              padding: 10,
              borderRadius: 8,
              marginBottom: 8,
              textAlign: msg.user === username ? 'right' : 'left',
              fontWeight: '500',
            }}
          >
            <strong style={{ color: '#6b7280' }}>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: '1px solid #ccc',
            outline: 'none',
            backgroundColor: '#fff',
            color: '#111827',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Gönder
        </button>
      </div>
    </div>
  );
}

export default Chat;
