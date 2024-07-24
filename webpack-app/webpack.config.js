const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { entrys, staticHtmls } = require("./stace.config");

module.exports = {
  entry: { ...entrys() },
  output: {
    filename: "js/[name].js", // 输出到浏览器的文件名，可能与压缩后的文件名不同
    clean: true, // 在生成文件之前清空 output 目录
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: [
          {
            loader: "svelte-loader",
            options: {
              //   preprocess: sveltePreprocess(),
            },
          },
        ],
      },
    ],
  },
  plugins: [...staticHtmls()],
  mode: "development",
  resolve: {
    // ...其他解析选项...
    conditionNames: ["svelte", "module", "js", "json"],
  },
  devServer: {
    // contentBase: path.join(__dirname, "public"),
    // static: {
    //   // 指定服务运行目录
    //   directory: path.resolve(__dirname, "dist"),
    // },
    port: 2677, //指定端口号
    open: true, //服务启动后自动在浏览器打开
  },
};
