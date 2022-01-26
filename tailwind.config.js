module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'media',
	jit: true,
	theme: {
		extend: {
			minWidth: {
				5: '1.25rem',
			},
			maxWidth: {
				'1/2': '50%',
			},
			fontFamily: {
				sans: '"Fira Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
