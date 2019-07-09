// common.js defines all api connection
var common_js = require('utils/common.js')

App({
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false
    },
    globalData: {
        userInfo: null,
        appid: 'wxf8d95f61a9af2b5b',
        secret: '1bbfcf88325f79d78f229e7de9afb48c',
        userID: null,
        //wx openid of user
        u_openid: '',
        //DB user id
        u_id: {},
        audio_correct: null,
        audio_fighting: null,
        audio_result: null,
        audio_bgm_mc: null,
        audio_bgm: null,
        soundOn: false
    },
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        var that = this;

        // 登录
        wx.login({
            success: res => {
                if (res.code) {
                    var d = that.globalData;
                    console.log(that.globalData.appid)
                    var api = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                    console.log(res.code)
                    wx.request({
                        url: api,
                        data: {},
                        method: 'GET',
                        success: res => {
                            console.log(res)
                            this.globalData.u_openid = res.data.openid

                            var api = "https://huatu.project.tszho.me/api/auth/insertOpenID.php?openid=" + res.data.openid;
                            wx.request({
                                url: api,
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                success: res => {
                                    console.log(res.data.userid)
                                    this.globalData.userID = res.data.userid;
                                }
                            })
                        }
                    })
                }
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        //get audio from server to prevent loading delay.
        this.globalData.audio_bgm_mc = wx.createInnerAudioContext()
        this.globalData.audio_bgm_mc.src = 'https://huatu.project.tszho.me/front-end/multiple_choice/FunnyBone.mp3'
        this.globalData.audio_bgm_mc.loop = true;

        this.globalData.audio_bgm = wx.createInnerAudioContext()
        this.globalData.audio_bgm.src = 'https://huatu.project.tszho.me/front-end/bgm_new_happy_day.mp3'
        this.globalData.audio_bgm.loop = true;

        this.globalData.audio_correct = wx.createInnerAudioContext()
        this.globalData.audio_correct.src = 'https://huatu.project.tszho.me/front-end/multiple_choice/correct.mp3'

        this.globalData.audio_fighting = wx.createInnerAudioContext()
        this.globalData.audio_fighting.src = 'https://huatu.project.tszho.me/front-end/multiple_choice/fighting.mp3'

        this.globalData.audio_result = wx.createInnerAudioContext()
        this.globalData.audio_result.src = 'https://huatu.project.tszho.me/front-end/multiple_choice/result.mp3'

        wx.onAppRoute((route) => {
            //console.log(route);
            if (this.globalData.soundOn == true) {
                if (route.path !== 'pages/test/multiple_choice/multiple_choice') {
                    this.globalData.audio_bgm_mc.stop();
                    this.globalData.audio_bgm.play();
                } else {
                    this.globalData.audio_bgm.stop();
                    this.globalData.audio_bgm_mc.play();
                }
            }
        })

    },
    //define all api connection
    func: {
        requestTestResult: common_js.requestTestResult,
        submitTestResult: common_js.submitTestResult,
        requestUserData: common_js.requestUserData,
        requestArticle: common_js.requestArticle,
        requestArticleSpecific: common_js.requestArticleSpecific,
        requestJsonQuestionRecord: common_js.requestJsonQuestionRecord,
        requestCollection: common_js.requestCollection,
        submitCollection: common_js.submitCollection,
        requestCollectionSpecific: common_js.requestCollectionSpecific,
        cancelCollection: common_js.cancelCollection
    }
});