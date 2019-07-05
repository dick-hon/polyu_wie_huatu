const app = getApp()
Page({
    data: {
        article_target: '',
        article: {},
        collections: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow() {
        //=============================== TODO: get user_id 
        // var temp = this.data.user_id;
        var temp = 1;
        var that = this;
        app.func.requestCollection(function(collections) {
            console.log(collections);
            that.setData({
                collections: collections
            });
        }, temp)
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    actionUnlike: function() {
        console.log("unlike!");
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
    clickCollection: function(e) {
        if(this.data.clicked == false) {
            console.log(e.currentTarget.dataset.id);
            wx.navigateTo({
                // Sytnax: ``,
                url: `../collection/collection?id=${e.currentTarget.dataset.id}`,
            });
        } else {
            this.setData({
                clicked: false
            })
        }
    }
})