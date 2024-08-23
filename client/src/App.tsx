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
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chat' element={<Chat socket={socket} />} />
      </Routes>
    </>
  )
}

export default App