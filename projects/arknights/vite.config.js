import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Relative assets also support a downloaded build or another Pages subdirectory.
  base: './',
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] },
})
