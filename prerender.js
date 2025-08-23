import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function prerender() {
  const { render } = await import('./dist/server/entry-server.js')
  
  // Routes from App.tsx
  const routes = [
    '/',
    '/components', 
    '/notepad',
    '/markdown'
  ]
  
  const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
  
  for (const route of routes) {
    const appHtml = render(route)
    const html = template.replace('<!--app-html-->', appHtml)
    
    const filePath = route === '/' ? '/index' : route
    const fullPath = path.resolve(__dirname, `dist${filePath}.html`)
    
    // Ensure directory exists
    const dir = path.dirname(fullPath)
    fs.mkdirSync(dir, { recursive: true })
    
    fs.writeFileSync(fullPath, html)
    console.log(`Generated: ${fullPath}`)
  }
}

prerender().catch(console.error)