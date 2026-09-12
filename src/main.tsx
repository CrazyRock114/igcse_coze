import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initAssistLevel } from '@/lib/i18n'
import './index.css'

// Apply the saved Chinese-support level before first paint, so the page does not
// flash the wrong variant.
initAssistLevel()

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
