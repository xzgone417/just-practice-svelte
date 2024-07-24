module.exports = {
  // 引用JS文件
  webScripts: [
    "common",
    "index",
  ],
  // 需要生成的静态页面
  htmls: [
    {
      name: "index.html",
      template: "view/index.html",
      chunks: ["index"],
    },
    {
      name: "common.html",
      template: "view/common.html",
      chunks: ["common"],
    },
  ],
};
