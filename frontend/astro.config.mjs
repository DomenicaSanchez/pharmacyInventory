// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "process.env.PUBLIC_API_URL": JSON.stringify(process.env.PUBLIC_API_URL),
    },
  },
});
