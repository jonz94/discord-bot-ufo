import { copyFileSync, existsSync } from 'node:fs'

const envFiles = ['.env', '.env.dev']

envFiles.forEach((envFile) => {
  if (!existsSync(envFile)) {
    try {
      copyFileSync('.env.example', envFile)
      console.log(`copy .env.example into ${envFile}`)
    } catch (error) {
      console.log(`error: cannot copy .env.example into ${envFile}`)
    }
  }
})
