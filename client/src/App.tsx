import { Route, Routes } from 'react-router-dom';
import './App.css'
import { io } from "socket.io-client";
import { Home } from './components/home/Home';
import { Chat } from './components/chat/Chat';

function App() {
  const socket = io('http://localhost:5000');

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </>
  )
}

export default App