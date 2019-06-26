Page({
    data: {
    },
    imageError: function (e) {
        console.log('image3发生error事件，携带值为', e.detail.errMsg)
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})