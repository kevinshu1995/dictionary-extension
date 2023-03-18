module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-prefix-selector": {
            prefix: "#dictionary-extension-app-container", // you can change this whatever you want
        },
        "tailwindcss/nesting": {},
    },
};

