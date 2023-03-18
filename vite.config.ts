import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        "process.env": {},
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

