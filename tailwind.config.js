/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				primary: "#272C38",
				secondary: "#1E2530",
				"light-gray": "#444",
			},
			textColor: {
				primary: "#999999",
			},
			borderColor: {
				primary: "#272C38",
				secondary: "#1E2530",
				"light-gray": "#444",
			},
		},
	},
	plugins: [
		require("tailwind-scrollbar-hide"),
		require("tailwind-scrollbar"),
	],
};
