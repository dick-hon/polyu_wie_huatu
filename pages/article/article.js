const app = getApp()
Page({
    data: {
        article_id: '',
        level_id: '',
        article_target: '',
        article_specific: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow(options) {
        this.setData({
            article_id: this.options.id,
            level_id: this.options.level_id
        })
        switch (this.data.level_id) {
            case '1':
                this.setData({
                    article_target: "小學一年級"
                })
                break;
            case '2':
                this.setData({
                    article_target: "小學二年級"
                })
                break;
            case '3':
                this.setData({
                    article_target: "小學三年級"
                })
                break;
            case '4':
                this.setData({
                    article_target: "小學四年級"
                })
                break;
            case '5':
                this.setData({
                    article_target: "小學五年級"
                })
                break;
            case '6':
                this.setData({
                    article_target: "小學六年級"
                })
                break;
        }
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