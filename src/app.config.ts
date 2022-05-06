
export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/add/add",
    "pages/mine/mine"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#07c160",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white"
  },
  tabBar: {
    color: "#404040",
    selectedColor: "#07c160",
    backgroundColor: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/image/icon1.png",
        selectedIconPath: "./assets/image/icon1_select.png"
      },
      {
        pagePath: "pages/add/add",
        text: "新建",
        iconPath: "./assets/image/icon2.png",
        selectedIconPath: "./assets/image/icon2_select.png"
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "./assets/image/icon3.png",
        selectedIconPath: "./assets/image/icon3_select.png"
      }]
  }
});
