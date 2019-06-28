const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
   
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})