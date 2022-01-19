module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	jit: true,
	theme: {
		extend: {
			minWidth: {
				5: '1.25rem',
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			cursor: ['disabled'],
			backgroundColor: ['active'],
		},
	},
	plugins: [],
};
