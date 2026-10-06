import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)

// En build el #root llega con el HTML del prerender y hay que hidratarlo; en
// dev llega vacío, así que ahí corresponde montar de cero.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
