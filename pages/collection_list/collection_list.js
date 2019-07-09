const app = getApp()
Page({
    data: {
        collections: {},
        clicked: false // to avoid change page after clicked like/ cancel
    },
    onShow() {
        var temp = app.globalData.userID;
        console.log(app.globalData.userID);
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
    actionUnlike(e) {
        console.log("unlike!");
        console.log(e.currentTarget.dataset.id);
        //to pass the corrsponding question result to db 
        var cancelData = e.currentTarget.dataset.id;
        app.func.cancelCollection(cancelData);
        //update lastest collection_list 
        var temp = app.globalData.userID;
        var that = this;
        app.func.requestCollection(function (collections) {
            console.log(collections);
            that.setData({
                collections: collections
            });
        }, temp)
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