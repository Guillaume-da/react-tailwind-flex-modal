import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The example consumes the library from `file:..`; don't let its copy of React
  // shadow the one installed here, or hooks blow up with two React instances.
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
