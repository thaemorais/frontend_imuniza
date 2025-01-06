const flowbite = require("flowbite-react/tailwind");

module.exports = {
	content: ["./src/**/*.{jsx, js}", flowbite.content()],
	theme: {
		extend: {},
	},
	plugins: [flowbite.plugin()],
};
