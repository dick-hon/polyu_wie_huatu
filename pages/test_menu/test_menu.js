const App = getApp();

Page({
    data: {
        trips: [],
        start: 0,
        loading: false,
        menu: []
    },

    onReady() {
        //fatch data from db
        var fatch = this
        wx.request({
            // add get variable into url ?= ada
            url: 'https://huatu.project.tszho.me/api/test/test_menu/test_menu.php',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                fatch.setData({
                    menu: res.data
                })
            },
            fail: function(res) {
                console.log("failed");
            }
        })
    },
    clickLevel: function(e) {
        //console.log(e.currentTarget.dataset.id);
        if (e.currentTarget.dataset.id == 1) {
            wx.navigateTo({
                // url: `../trip/trip?id=${ds.id}&name=${ds.name}`,
                url: `../test/multiple_choice/multiple_choice`
            });
        } else {
            wx.showToast({
                title: 'Primary 1 only',
                icon: '',
                image: '../../img_temp/wrong.png',
                duration: 1500,
                mask: true,
                success: function(res) {}
            })
        }
    },
});