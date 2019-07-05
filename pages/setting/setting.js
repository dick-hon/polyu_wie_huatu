const app = getApp()

Page({
    data: {
        userInfo: {},
        soundSwitch: true
    },
    onShow: function() {
        this.setData({
            soundSwitch: app.globalData.soundOn
        })
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    soundSwitch(event) {
        const detail = event.detail;
        console.log(event.detail);
        this.setData({
            'soundSwitch': detail.value
        })
        if (this.data.soundSwitch == false) {
            app.globalData.soundOn = false;
            app.globalData.audio_bgm.stop();
        } else {
            app.globalData.soundOn = true;
            app.globalData.audio_bgm.play();
        }
    }
})