const app = getApp()
Page({
    data: {
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
    actionUnlike(e) {
        console.log("unlike!");
        console.log(e.currentTarget.dataset.id);
        //to pass the corrsponding question result to db
        //================================== TODO: get user_id
        var temp = 1;
        //console.log(this.data.article[e.currentTarget.dataset.id].article_id);
        //console.log(temp);
        //var submitData = [this.data.collections[e.currentTarget.dataset.id].article_id, temp];        
        var cancelData = e.currentTarget.dataset.id;
        app.func.cancelCollection(cancelData);
        //update lastest collection_list
        //=============================== TODO: get user_id 
        // var temp = this.data.user_id;
        var temp = 1;
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