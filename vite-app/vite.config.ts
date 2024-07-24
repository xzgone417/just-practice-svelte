import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    // 库模式打包
    lib: {
      entry: "src/main.ts", // 打包入口，需要先创建文件
      name: "main",
    },
    watch: {
      clearScreen: true,
    },
  },
});
