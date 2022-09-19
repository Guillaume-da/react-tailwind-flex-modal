/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out'
			},
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-25px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				}
			},
		},
	},
  plugins: [],
}