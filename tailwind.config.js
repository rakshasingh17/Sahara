
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F0EBE1',
        },
        charcoal: {
          DEFAULT: '#3F3A34',
          light: '#5C554D',
          lighter: '#8A8178',
        },
        sage: {
          DEFAULT: '#6E8B78',
          hover: '#5A7363',
          light: '#E2E8E4',
          lightest: '#F0F4F1',
        },
        softblue: {
          DEFAULT: '#A8BBC9',
          light: '#E6EDF2',
        },
        warmborder: {
          DEFAULT: '#EAE0D5',
          dark: '#D8CFC4',
        }
      },
     fontFamily: {
  sans: ['DM Sans', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
},
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(63, 58, 52, 0.05)',
        'soft-hover': '0 8px 30px -4px rgba(63, 58, 52, 0.08)',
      }
    },
  },
  plugins: [],
}