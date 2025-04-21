import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // A fresh palette built on suggested colors and gradients
        primary: {
          DEFAULT: "#8B5CF6",          // vivid purple
          100: "#E5DEFF",              // soft purple
          200: "#D6BCFA",              // light purple
          300: "#BFA2FC",
          400: "#A78BFA",
          500: "#8B5CF6",              // vivid purple
          600: "#7C3AED",              // modern purple
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          foreground: "#F6F6F7",       // light on purple
        },
        accent: {
          DEFAULT: "#33C3F0",          // sky blue
          foreground: "#222",
        },
        secondary: {
          DEFAULT: "#FEF7CD",          // soft yellow
          foreground: "#222",
        },
        destructive: {
          DEFAULT: "#ea384c",
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "#f1f0fb",
          foreground: "#555",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#1A1F2C",
        },
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#8B5CF6",
        // Additional soft accent colors for UI elements, gradients, or highlights
        blue: "#0EA5E9",
        orange: "#F97316",
        green: "#F2FCE2",
        pink: "#FFDEE2",
        peach: "#FDE1D3",
        gray: "#F6F6F7",
        dark: "#221F26",
        "glass-white": "rgba(255,255,255,0.7)"
      },
      borderRadius: {
        lg: "1rem", // More modern, pill-like roundness
        md: "0.75rem",
        sm: "0.5rem"
      },
      fontFamily: {
        sans: [
          'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ],
        heading: [
          'Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'
        ]
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "fade-in": "fade-in 0.3s ease",
        "fade-out": "fade-out 0.3s ease",
        "scale-in": "scale-in 0.2s ease"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(99deg,#8B5CF6 0%,#33C3F0 100%)",
        "glass-gradient": "linear-gradient(140deg,rgba(255,255,255,0.77) 0%,rgba(139,92,246,0.13) 100%)",
        "primary-gradient": "linear-gradient(90deg, #9b87f5 0%, #33c3f0 100%)",
        "card-gradient": "linear-gradient(90deg, #FDFCFB 0%, #E5DEFF 70%, #FEF7CD 100%)"
      },
      boxShadow: {
        xl: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        glass: "0 3px 8px 0 rgba(139,92,246,0.10)",
        soft: "0 4px 16px 0 rgba(139,92,246,0.10)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
