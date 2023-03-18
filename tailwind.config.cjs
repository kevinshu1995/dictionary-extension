/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "-",
    content: ["./index.html", "./lib/**/*.{vue,js,ts,jsx,tsx}"],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {},
    },
    plugins: [],
};

