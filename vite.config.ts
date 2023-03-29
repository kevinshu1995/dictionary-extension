import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        "process.env": {},
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./lib"),
            "@composables": resolve(__dirname, "./lib/utils/composables"),
        },
    },
    server: {
        proxy: {
            "/wordnik": {
                target: "https://api.wordnik.com/",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/wordnik/, ""),
            },
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            name: "dictionary",
            fileName: "dictionary",
            formats: ["iife"],
        },
        rollupOptions: {
            external: [resolve(__dirname, "lib/components/TestSection.vue")],
        },
    },
});

