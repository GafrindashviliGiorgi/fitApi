import './App.css'
import Header from './headers/Header'
import { Routes, Route } from 'react-router-dom'

import Home from './Routes/Home'
import Food from './Routes/Food'
import BuyFood from './Routes/BuyFood'
import Snaks from './Routes/Snaks'
import ChatBot from './routes/Chatbot'  // ← შეცვლილი

function App() {
  return (
    <div>
      <div className='header'>
        <Header/>
      </div>

      <div className="flex1">
        <h1 className='title'>fitApi</h1>
        <input className='serchBar' type="text" placeholder="Serch for something"/>     
        <div className="flex2">
          <p className='name'></p>
          <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWui3ck64C6ACKyr5EQDDhfxkkhRwTc_a2nQ&s" alt="" />
        </div>      
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/BuyFood" element={<BuyFood />} />
        <Route path="/Snaks" element={<Snaks />} />
        <Route path="/Chatbot" element={<ChatBot />} />  {/* ← შეცვლილი */}
      </Routes>
    </div>
  )
}

export default App