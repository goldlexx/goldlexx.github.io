import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Сайт публикуется в корне домена (https://goldlexx.github.io/): пути /img, /fonts, /logo и маршрутизатор рассчитаны на корень
// __BUILD_DATE__ — дата сборки (ГГГГ-ММ-ДД): начальная «сегодняшняя» дата для порядка событий, одинаковая при пререндере и гидратации
export default defineConfig({ base: '/', define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) }, plugins: [react()] })
