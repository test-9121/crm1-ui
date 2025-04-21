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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '#232842',
				input: '#EAECEF',
				ring: '#4654FF',
				background: '#F7F8FC',
				foreground: '#1A1F2C',
				primary: {
					DEFAULT: '#4654FF',
					foreground: '#fff'
				},
				secondary: {
					DEFAULT: '#232842',
					foreground: '#F7F8FC'
				},
				sidebar: {
					DEFAULT: '#181E29',
					foreground: '#F6F7FB',
					accent: '#4654FF',
					'accent-foreground': '#fff',
					border: '#1C2232'
				},
				card: {
					DEFAULT: '#F7F8FC',
					foreground: '#1A1F2C'
				},
				success: {
					DEFAULT: '#23CE6B'
				},
				warning: {
					DEFAULT: '#FFB020'
				},
				error: {
					DEFAULT: '#F6685E'
				}
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
