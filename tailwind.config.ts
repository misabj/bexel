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
        // Primary BEXEL tone - deep blue-green
        brand: {
          50: "#edf7f4",
          100: "#d5ece6",
          200: "#acd9ce",
          300: "#7abdae",
          400: "#4f9d8d",
          500: "#347f72",
          600: "#28665d",
          700: "#23534d",
          800: "#173f45",
          900: "#0f2f3a",
          950: "#082126",
        },
        // Accent - BEXEL green
        accent: {
          50: "#f5f8ec",
          100: "#e7efd2",
          200: "#d2e1aa",
          300: "#b8cd7b",
          400: "#9db84f",
          500: "#87a73b",
          600: "#6f8c2f",
          700: "#556c27",
          800: "#455723",
          900: "#3b4b22",
        },
        // Fresh mint highlight used for gradients / glow highlights
        spark: {
          400: "#86d3bd",
          500: "#45b997",
          600: "#2d9578",
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
        glow: "0 0 0 1px rgba(135,167,59,0.12), 0 8px 18px -12px rgba(135,167,59,0.28)",
        "glow-spark":
          "0 0 0 1px rgba(69,185,151,0.12), 0 8px 18px -12px rgba(69,185,151,0.28)",
        "inner-top": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-brand":
          "linear-gradient(to right, rgba(15,47,58,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,47,58,0.06) 1px, transparent 1px)",
        "grid-light":
          "linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(60% 55% at 50% 0%, rgba(135,167,59,0.18), transparent 70%), radial-gradient(50% 50% at 85% 20%, rgba(69,185,151,0.14), transparent 70%)",
        "accent-gradient":
          "linear-gradient(120deg, #87a73b 0%, #45b997 58%, #d9e8b4 120%)",
        "brand-gradient":
          "linear-gradient(135deg, #082126 0%, #0f2f3a 52%, #23534d 100%)",
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
