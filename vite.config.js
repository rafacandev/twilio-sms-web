import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/twilio-sms-web",
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
