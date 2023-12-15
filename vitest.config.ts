import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'html']
    },
    include: ['**/__tests__/*.{js,tsx,ts}']
  }
})
