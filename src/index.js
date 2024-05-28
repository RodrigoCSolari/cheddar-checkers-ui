import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { getConfig } from './utils/networkConfig'
import { Wallet } from './utils/wallet'

const root = ReactDOM.createRoot(document.getElementById('root'))

const CONTRACT_ADDRESS = getConfig().contractName

export const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
