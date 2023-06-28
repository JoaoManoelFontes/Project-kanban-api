/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
    test: {
        clearMocks: true,
        globals: true,
        setupFiles: ["dotenv/config"],
    },
})
