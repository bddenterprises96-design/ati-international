import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import App from './App.jsx'
import './index.css'

// Global EmailJS Public Key Initialization
emailjs.init('l9K4E835PGcGZMP2Z')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)