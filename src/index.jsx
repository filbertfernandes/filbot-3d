import React from 'react'
import App from './App'
import './style.css'
import ReactDOM from 'react-dom/client'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)