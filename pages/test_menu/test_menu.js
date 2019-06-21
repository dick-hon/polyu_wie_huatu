const App = getApp();
const api = require('../../library/bread_travel/utils/api.js');
const util = require('../../library/bread_travel/utils/util.js');

const formatTime = util.formatTime;

Page({
    data: {
        trips: [],
        start: 0,
        loading: false,
        menu: []
    },

    onShow() {
        //fatch data from db
        var fatch = this
        wx.request({
            // add get variable into url ?= ada
            url: 'https://huatu.project.tszho.me/api/test/test_menu/test_menu.php',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                fatch.setData({
                    menu: res.data
                })
            },
            fail: function (res) {
                console.log("failed");
            }
        })
    },
    onLoad() {
        this.loadMore();
    },
    onPullDownRefresh() {
        this.loadMore(null, true);
    },
    loadMore(e, needRefresh) {
        const self = this;
        const loading = self.data.loading;
        const data = {
            next_start: self.data.start,
        };
        if (loading) {
            return;
        }
        self.setData({
            loading: true,
        });
        api.getHotTripList({
            data,
            success: (res) => {
                let newList = res.data.data.elements;
                newList.map((trip) => {
                    const item = trip;
                    item.data[0].date_added = formatTime(new Date(item.data[0].date_added * 1000), 1);
                    return item;
                });
                if (needRefresh) {
                    wx.stopPullDownRefresh();
                } else {
                    newList = self.data.trips.concat(newList);
                }
                self.setData({
                    trips: newList,
                });
                const nextStart = res.data.data.next_start;
                self.setData({
                    start: nextStart,
                    loading: false,
                });
            },
        });
    },
    clickLevel: function(e) {
        //console.log(e.currentTarget.dataset.id);
        if(e.currentTarget.dataset.id == 1) {
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
                success: function (res) {
                }
            })
        }
    },
});