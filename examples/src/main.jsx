import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Your own Tailwind build first: both stylesheets emit utilities at the same
// specificity, so whichever loads last wins. Loading the library last keeps its
// `dark:` defaults from being overridden by your plain `bg-white` / `text-*`.
import './tailwind.css'
import 'react-tailwind-flex-modal/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
