const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
    //get UserInfo from WX
    if (app.globalData.userInfo) {
      console.log("IF")
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      console.log("else");
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    }
    console.log("personal_info.js 23")
    console.log(this.data.userInfo);
  },
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})