import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import {ghPages} from "vite-plugin-gh-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    ghPages({
      // 可选：自定义发布目录，默认 'dist'
      // dir: 'dist',
    }),],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,"src")
    }
  }
})
