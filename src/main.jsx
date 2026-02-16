import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // ეს არის პრობლემა!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* მეორე BrowserRouter აქ! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)