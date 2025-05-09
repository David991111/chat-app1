import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue } from './firebase'; // Firebase'yi import ettik
import { Input, Button } from '@mui/material';

const OpenChatMemo = () => {
  const [messages, setMessages] = useState([]); // Mesajları tutacağız
  const [input, setInput] = useState(''); // Kullanıcı girişini tutacağız
  const [userId, setUserId] = useState('user1'); // Örnek kullanıcı ID'si

  useEffect(() => {
    // Mesajları dinleyelim
    const messagesRef = ref(db, 'messages/' + userId);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data) : [];
      setMessages(messagesArray); // Mesajları state'e set ediyoruz
    });

    return () => unsubscribe(); // Cleanup işlemi
  }, [userId]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      content: input, // Kullanıcının mesajı
      timestamp: new Date().toISOString(), // Mesajın zaman damgası
      role: 'user', // Kullanıcı rolü
    };

    const messagesRef = ref(db, 'messages/' + userId); // Kullanıcıya özel mesajlar
    push(messagesRef, newMessage); // Yeni mesajı Firebase'e ekle

    setInput(''); // Giriş alanını sıfırla

    // Bot cevabı ekleyelim (sadece simülasyon)
    setTimeout(() => {
      const botMessage = {
        content: "Merhaba, ben ChatGPT! Size nasıl yardımcı olabilirim?", 
        timestamp: new Date().toISOString(),
        role: 'assistant', // Bot rolü
      };
      push(messagesRef, botMessage); // Bot mesajını ekleyelim
    }, 1000); // Bot mesajını biraz geciktirelim
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">OpenChatMemo</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}>
            <strong>{msg.role === 'user' ? 'Sen' : 'ChatGPT'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Kullanıcı girişi
          placeholder="Bir şeyler yaz..."
          className="flex-grow"
        />
        <Button onClick={handleSend}>Gönder</Button>
      </div>
    </div>
  );
};

export default OpenChatMemo;
