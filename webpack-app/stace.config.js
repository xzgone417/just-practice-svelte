const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { webScripts, htmls } = require("./libs/package");

/**
 * 静态页面配置
 */
module.exports = {
  // 重组js入口文件
  entrys: () => {
    let params = {};
    webScripts.forEach((name) => {
      params[name] = path.resolve(__dirname, `./src/js/${name}.js`);
    });
    console.log({ ...params });
    return { ...params };
  },

  // 重组静态页面文件
  staticHtmls: () => {
    return htmls.map((item) => {
      return new HtmlWebpackPlugin({
        inject: "body",
        template: path.resolve(__dirname, `./src/${item.template}`),
        filename: item.name,
        chunks: [...item.chunks],
        minify: false,
        // scriptLoading: "blocking", // 将scriptLoading属性设置为'blocking'，这样生成的script标签就不会包含defer属性
      });
    });
  },
  // 监听热更html页面
};
