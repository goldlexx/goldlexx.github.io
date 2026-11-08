import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Сайт публикуется в корне домена (https://goldlexx.github.io/): пути /img, /fonts, /logo и маршрутизатор рассчитаны на корень
export default defineConfig({ base: '/', plugins: [react()] })
