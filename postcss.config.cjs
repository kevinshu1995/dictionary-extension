module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        "postcss-prefix-selector": {
            prefix: "#dictionary-extension-app-container", // you can change this whatever you want
            transform: function (prefix, selector, prefixedSelector, filePath, rule) {
                if (selector === "#dictionary-extension-app-container") {
                    return selector;
                }
                return prefixedSelector;
            },
        },
        "tailwindcss/nesting": {},
    },
};

