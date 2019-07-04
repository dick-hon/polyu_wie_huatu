//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        userData: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        json_questionRecord: {},
        json_index: 1
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShow: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    msg: "dick" //test
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        var u = this;
        app.func.requestUserData(function(u_info) {
            // console.log("HERERERE");
            u.setData({
                userData: u_info
            })
        }, '1')

    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    clickMe: function() {
        this.setData({
            clickMsg: "The button has been click"
        })
    },
    ifUserInDB: function() {
        console.log(this.data.userData);
        //console.log(app.globalData.audio_correct.src);
        //app.globalData.audio_correct.play();

        //json_api Testing ==> OK
        /*
        var temp = 15;
        var that = this;
        app.func.requestJsonQuestionRecord(function (json_questionRecord) {
            console.log(json_questionRecord);
            that.setData({
                json_questionRecord: json_questionRecord
            });
        }, temp)
        */
    },
    next: function() {
        //console.log(json_questionRecord[this.data.json_index])
        //console.log(thid.data.json_questionRecord)
        console.log(this.data.json_questionRecord[this.data.json_index]);
        this.setData({
            json_index: this.data.json_index + 1
        })
    }
})