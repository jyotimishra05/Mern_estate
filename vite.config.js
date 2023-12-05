import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{   //each time when you see "/api" added "http://localhost:3000" in the beginning
        target:'http://localhost:3000',
        secure:false
      }
    }
  },
  plugins: [react()],
})
