const app = getApp()
Page({
    data: {
        article_id: '',
        article_specific: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow(options) {
        this.setData({
            article_id: this.options.id
        })
        console.log("article_id" + this.data.article_id);
        var temp = this.data.article_id;
        var that = this;
        app.func.requestArticleSpecific(function (article_specific) {
            console.log(article_specific);
            that.setData({
                article_specific: article_specific
            });
        }, temp)
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    startExercise: function () {
        wx.navigateTo({
            url: `../test/multiple_choice/multiple_choice?id=${this.data.article_id}`,
        });
    }
})