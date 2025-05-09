import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setEntered(true);
    }
  };

  return (
    <div style={{ padding: 20, backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      {!entered ? (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20%' }}>
          <h2 style={{ color: '#1f2937' }}>Kullanıcı adını gir:</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Adınızı yazın..."
            style={{
              padding: 10,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #ccc',
              width: '250px',
              marginBottom: 20,
            }}
          />
          <br />
          <button
            type="submit"
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
            Giriş Yap
          </button>
        </form>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
