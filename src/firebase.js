import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

// Firebase yapılandırma bilgilerini buraya ekle
const firebaseConfig = {
  apiKey: "AIzaSyAtIs8pGuMArZFYTmvxAM-LF_6JIKfeLNQ",
  authDomain: "ercek-zamanli-chat.firebaseapp.com",
  databaseURL: "https://ercek-zamanli-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ercek-zamanli-chat",
  storageBucket: "ercek-zamanli-chat.firebasestorage.app",
  messagingSenderId: "1088318838814",
  appId: "1:1088318838814:web:65e4935cdaeb79234ff60f",
  measurementId: "G-FTE9F04038"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };