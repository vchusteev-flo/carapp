import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	
  theme: {
  	extend: {
      backgroundImage: {
        bgMainFull: "url('../../public/carBggg.webp')",
      },
  		colors: {
				charcoal: {
          DEFAULT: '#384656',
          100: '#0b0e11',
          200: '#171c23',
          300: '#222a34',
          400: '#2d3845',
          500: '#384656',
          600: '#556b83',
          700: '#7a8fa8',
          800: '#a6b5c5',
          900: '#d3dae2'
        },
        gunmetal: {
          DEFAULT: '#283039',
          100: '#080a0b',
          200: '#101317',
          300: '#181d22',
          400: '#20262e',
          500: '#283039',
          600: '#4a596a',
          700: '#6d8299',
          800: '#9eabbb',
          900: '#ced5dd'
        },
        united_nations_blue: {
          DEFAULT: '#4D9DEB',
          100: '#061f38',
          200: '#0c3e70',
          300: '#135da8',
          400: '#197ce0',
          500: '#4d9deb',
          600: '#70afef',
          700: '#94c3f3',
          800: '#b7d7f7',
          900: '#dbebfb'
        },
        atomic_tangerine: {
          DEFAULT: '#FB9776',
          100: '#471302',
          200: '#8e2704',
          300: '#d63a07',
          400: '#f9602d',
          500: '#fb9776',
          600: '#fcab90',
          700: '#fcc0ac',
          800: '#fdd5c8',
          900: '#feeae3'
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
