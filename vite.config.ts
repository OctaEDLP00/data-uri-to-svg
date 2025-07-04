import { basename } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { cwd } from 'node:process'

const isGitHubPages = true
const folderName = `${basename(cwd())}/`
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const base = mode === 'production' && isGitHubPages ? `/${folderName}` : '/'

export default defineConfig({
  root: 'src',
  base,
  mode,
  envDir: '../',
  publicDir: '../public',
  plugins: [tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).pathname,
    },
  },
  build: {
    outDir: '../dist',
    assetsDir: './',
  },
})
