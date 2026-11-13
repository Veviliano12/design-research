import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTokens, tokensCssText } from './tokens.js'
import App from './App.jsx'
import './styles.css'
import './book.css'

const style = document.createElement('style')
style.setAttribute('data-tokens', 'true')
style.textContent = tokensCssText()
document.head.prepend(style)
applyTokens(document.documentElement)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
