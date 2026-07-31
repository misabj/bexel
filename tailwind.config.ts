import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        // Cyan spark used for gradients / glow highlights
        spark: {
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        // Neutral surface tokens for dark mode
        ink: {
          900: "#070b16",
          850: "#0a1020",
          800: "#0e1526",
          700: "#141d33",
          600: "#1c2842",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 33, 64, 0.08), 0 8px 24px rgba(15, 33, 64, 0.06)",
        "card-hover":
          "0 2px 6px rgba(15, 33, 64, 0.10), 0 16px 40px rgba(15, 33, 64, 0.10)",
        glow: "0 0 0 1px rgba(249,115,22,0.15), 0 8px 40px -8px rgba(249,115,22,0.45)",
        "glow-spark":
          "0 0 0 1px rgba(56,189,248,0.15), 0 8px 40px -8px rgba(56,189,248,0.45)",
        "inner-top": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-brand":
          "linear-gradient(to right, rgba(15,33,64,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,33,64,0.06) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(60% 55% at 50% 0%, rgba(249,115,22,0.18), transparent 70%), radial-gradient(50% 50% at 85% 20%, rgba(56,189,248,0.16), transparent 70%)",
        "accent-gradient":
          "linear-gradient(120deg, #f97316 0%, #fb923c 40%, #38bdf8 120%)",
        "brand-gradient":
          "linear-gradient(135deg, #0f2140 0%, #152b52 50%, #1a386c 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(4%,-6%) scale(1.15)", opacity: "0.9" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
