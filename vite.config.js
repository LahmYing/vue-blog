import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      include: ["src/**/*.js", "src/**/*.ts", "src/**/*.vue"],
      exclude: ["node_modules"],
      cache: false,
      fix: true, // 保存时自动修复
    }),
  ],
});
