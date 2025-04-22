
import { createRoot } from 'react-dom/client'
import React from 'react' // Import React explicitly
import App from './App.tsx'
import './index.css'

// Make sure we're creating the root correctly
const rootElement = document.getElementById("root")
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error("Root element not found")
}
