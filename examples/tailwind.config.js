/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in': 'fade-in 0.5s cubic-bezier(.3,.89,.44,1)'
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
				  }
				},
				'fade-in-up': {
				  '0%': {
					opacity: '0',
					transform: 'translateY(25px)'
				  },
				  '100%': {
					opacity: '1',
					transform: 'translateY(0)'
				  }
				},
				'fade-in': {
				  '0%': {
					opacity: '0'
				  },
				  '100%': {
					opacity: '1'
				  }
				}
			  }
		},
	},
  plugins: [],
}
