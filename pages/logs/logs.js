//logs.js
const util = require('../../utils/util.js')
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    logs: [],
    title: "User's Data",
    br: '\n',
    id: "id",
    tabs: ["Page 1", "Page 2", "Page 3"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
        success: function (res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
      }),
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow: function () {
      //fatch data from db
      var fatch = this
      wx.request({
          url: 'http://localhost/huatu/userInfo.php',
          headers: {
              'Content-Type': 'application/json'
          },
          success: function (res) {
              console.log(res.data);
              fatch.setData({
                  userInfo: res.data
              })
          },
          fail: function (res) {
              console.log("failed");
          }
      })
  },
tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
}
});
