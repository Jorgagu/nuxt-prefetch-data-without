import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler(async () => {
  // simulates a slow backend
  await new Promise(resolve => setTimeout(resolve, 2000))
  return {
    generatedAt: new Date().toISOString(),
    users: [
      { id: 1, name: 'Ada Lovelace' },
      { id: 2, name: 'Grace Hopper' },
      { id: 3, name: 'Alan Turing' },
    ],
  }
})
