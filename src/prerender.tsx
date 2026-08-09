import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Entry del build SSR que consume scripts/prerender.mjs. Vive separado de
// main.tsx a propósito: así react-dom/server nunca entra al bundle del cliente.
export async function prerender() {
  return {
    html: renderToString(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  };
}
