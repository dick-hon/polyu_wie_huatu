const app = getApp()
Page({
    data: {
        level_id: '',
        article_target: '',
        article: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow(options) {
        this.setData({
            level_id: this.options.id
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
        var temp = this.data.level_id;
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
    actionLike: function(e) {
        console.log("like!");
        console.log(this.data.article[e.currentTarget.dataset.id]);
        //to pass the corrsponding question result to db
        //================================== TODO: get user_id
        var temp = 1;
        //console.log(this.data.article[e.currentTarget.dataset.id].article_id);
        //console.log(temp);
        var submitData = [this.data.article[e.currentTarget.dataset.id].article_id, temp];
        app.func.submitCollection(submitData);

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
        if (this.data.clicked == false) {
            console.log(e.currentTarget.dataset.id);
            wx.navigateTo({
                // Sytnax: ``,
                url: `../article/article?id=${e.currentTarget.dataset.id}`,
            });
        } else {
            this.setData({
                clicked: false
            })
        }
    }
})