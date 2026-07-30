import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary business color — deep BIM navy
        brand: {
          50: "#eef4fb",
          100: "#d6e4f5",
          200: "#adc8ea",
          300: "#7ba3d9",
          400: "#4a7bc2",
          500: "#2b5aa3",
          600: "#1f4585",
          700: "#1a386c",
          800: "#152b52",
          900: "#0f2140",
          950: "#0a1730",
        },
        // Accent — construction amber/orange
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 33, 64, 0.08), 0 8px 24px rgba(15, 33, 64, 0.06)",
        "card-hover":
          "0 2px 6px rgba(15, 33, 64, 0.10), 0 16px 40px rgba(15, 33, 64, 0.10)",
      },
      backgroundImage: {
        "grid-brand":
          "linear-gradient(to right, rgba(15,33,64,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,33,64,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
