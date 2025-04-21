
import type { Config } from "tailwindcss";

// Modern, clean CRM color palette, including both light and dark for pro UX
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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Segoe UI', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Professional palette---purple, indigo, blue, modern neutrals
        primary: {
          DEFAULT: "#7E69AB",
          foreground: "#fff"
        },
        secondary: {
          DEFAULT: "#F5F6FA",
          foreground: "#403E43"
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#fff"
        },
        info: "#0EA5E9",
        success: "#4ADE80",
        warning: "#FEF7CD",
        error: "#EA384C",
        card: {
          DEFAULT: "#fff",
          foreground: "#403E43"
        },
        // Use these for table/grid lines for subtle glassy effect
        border: "#E5DEFF",
        muted: {
          DEFAULT: "#F1F0FB",
          foreground: "#898CA3"
        },
        gray: {
          50: "#F9FAFB",
          100: "#F1F0FB",
          200: "#E5E7EB",
          300: "#E5DEFF",
          400: "#C8C8C9",
          500: "#848484",
          600: "#555555",
          700: "#403E43",
          800: "#222222",
          900: "#1A1F2C",
        },
      },
      boxShadow: {
        card: "0 1px 16px 0 rgba(39,41,86,0.08)",
        btn: "0 2px 4px rgba(153,141,255,0.06)"
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem"
      },
      // Animations can make things modern!
      keyframes: {
        'fade-in': {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        'fade-out': {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.4s ease",
        "fade-out": "fade-out 0.3s ease"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

