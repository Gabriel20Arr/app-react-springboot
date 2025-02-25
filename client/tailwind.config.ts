import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#2563EB",   // Azul principal
        secondary: "#1E40AF", // Azul oscuro (hover, destacados)
        background: "#F8FAFC", // Gris claro (fondo general)
        card: "#FFFFFF",       // Blanco puro (tarjetas, modales)
        text: "#1E293B",       // Gris oscuro (texto principal)
        textMuted: "#64748B",  // Gris medio (descripciones)
        price: "#16A34A",      // Verde (precios)
        border: "#E2E8F0",     // Gris claro (bordes, separadores)
        footer: "#334155"      // Gris oscuro (footer)
      },
    },
  },
  plugins: [],
} satisfies Config

