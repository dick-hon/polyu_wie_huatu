const app = getApp()
Page({
    data: {
        article_id: '',
        article_target: '',
        article: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow(options) {
        this.setData({
            article_id: this.options.id
        })
        console.log("article_id" + this.data.article_id);
        var temp = this.data.article_id;
        var that = this;
        app.func.requestArticle(function(article) {
            console.log(article);
            that.setData({
                article: article
            });
        }, temp)
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    actionLike() {
        console.log("like!");
        this.setData({
            clicked: true
        })
    },
    actionCancel() {
        console.log("cancel!");
        this.setData({
            clicked: true
        })
    },
    clickArticle: function(e) {
        if(this.data.clicked == false) {
            console.log(e.currentTarget.dataset.id);
        } else {
            this.setData({
                clicked: false
            })
        }
    }
})