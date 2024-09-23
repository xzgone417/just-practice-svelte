import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const envDir = `${process.cwd()}/config`;
  // 第三个参数prefixes默认为'VITE_',说明只能取'VITE_'开头的，如果取''，则全部环境变量都能读取,对应各个环境定义的变量
  const envConfig = loadEnv(mode, envDir);
  let viteRemoveConsole =
    envConfig.VITE_ENV === "production"
      ? removeConsole({ includes: ["log"] })
      : removeConsole({ includes: ["info"] });
  return defineConfig({
    envDir,
    clearScreen: true,
    plugins: [
      svelte({
        compilerOptions: {
          customElement: true, // 设置编译自定义元素
        },
      }),
      viteRemoveConsole,
    ],
    server: {},
    build: {
      lib: {
        entry: "src/index.ts", // 打包入口，需要先创建文件
        name: "sofishUi",
      },
      watch: {
        clearScreen: true,
      },
    },
  });
};
