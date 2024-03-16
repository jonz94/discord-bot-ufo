import { copyFileSync, existsSync } from 'node:fs'

const envFiles = ['.env', '.env.dev']

envFiles.forEach((envFile) => {
  if (!existsSync(envFile)) {
    copyFileSync('.env.example', envFile)
    console.log(`copy .env.example into ${envFile}`)
  }
})
