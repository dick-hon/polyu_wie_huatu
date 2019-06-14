const WXAPI = require('../../library/noodle_shop/wxapi/main.js')
const CONFIG = require('../../library/noodle_shop/config.js')
const app = getApp()

Page({
    data: {
        swiperCurrent: 0, //当前banner所在位置
        bannerList: [],
        shopSubList: [],
        goodsRecommend: [], // 推荐商品 --> ans 1,2,3,4
    },
    onShow() {
        const _this = this
        WXAPI.banners().then(function (res) {
            if (res.code === 0) {
                _this.setData({
                    bannerList: res.data
                })
            }
        })
        WXAPI.shopSubList().then(res => {
            if (res.code === 0) {
                _this.setData({
                    shopSubList: res.data
                })
            }
        })
        WXAPI.goods({
            recommendStatus: 1
        }).then(res => {
            if (res.code === 0) {
                _this.setData({
                    goodsRecommend: res.data //TODO: to fetch data from db
                })
            }
            console.log(res.data);
        })
    },
    swiperchange: function (e) { // banner滚动事件
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    toDetailsTap: function (e) { //to create a button for answering the questions 
        wx.navigateTo({
            url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
        })
    },
    tapBanner: function (e) {
        if (e.currentTarget.dataset.id != 0) {
            wx.navigateTo({
                url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
            })
        }
    },
    bindTypeTap: function (e) {
        this.setData({
            selectCurrent: e.index
        })
    },
    onLoad: function (e) {
        // const that = this
        // if (e && e.scene) {
        //   const scene = decodeURIComponent(e.scene)
        //   if (scene) {        
        //     wx.setStorageSync('referrer', scene.substring(11))
        //   }
        // }
        wx.setNavigationBarTitle({
            title: wx.getStorageSync('mallName')
        })
        // /**
        //  * 示例：
        //  * 调用接口封装方法
        //  */

        // WXAPI.goodsCategory().then(function(res) {
        //   let categories = [{
        //     id: 0,
        //     icon: '/images/fl.png',
        //     name: "全部"
        //   }];
        //   if (res.code == 0) {
        //     categories = categories.concat(res.data)
        //   }
        //   const _n = Math.ceil(categories.length / 2)
        //   that.setData({
        //     categories: categories,
        //     category_box_width: 150 * _n,
        //     activeCategoryId: 0,
        //     curPage: 1
        //   });
        //   that.getGoodsList(0);
        // })
        // WXAPI.goods({
        //   recommendStatus: 1
        // }).then(res => {
        //   if (res.code === 0){
        //     that.setData({
        //       goodsRecommend: res.data
        //     })
        //   }      
        // })
        // that.getCoupons()
        // that.getNotice()
        // that.kanjiaGoods()
        // that.pingtuanGoods()
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    getGoodsList: function (categoryId, append) {
        if (categoryId == 0) {
            categoryId = "";
        }
        var that = this;
        wx.showLoading({
            "mask": true
        })
        WXAPI.goods({
            categoryId: categoryId,
            nameLike: that.data.inputVal,
            page: this.data.curPage,
            pageSize: this.data.pageSize
        }).then(function (res) {
            wx.hideLoading()
            if (res.code == 404 || res.code == 700) {
                let newData = {
                    loadingMoreHidden: false
                }
                if (!append) {
                    newData.goods = []
                }
                that.setData(newData);
                return
            }
            let goods = [];
            if (append) {
                goods = that.data.goods
            }
            for (var i = 0; i < res.data.length; i++) {
                goods.push(res.data[i]);
            }
            that.setData({
                loadingMoreHidden: true,
                goods: goods,
            });
        })
    },
    getCoupons: function () {
        var that = this;
        WXAPI.coupons().then(function (res) {
            if (res.code == 0) {
                that.setData({
                    coupons: res.data
                });
            }
        })
    },
    onShareAppMessage: function () {
        return {
            title: wx.getStorageSync('mallName'),
            path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid'),
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    getNotice: function () {
        var that = this;
        WXAPI.noticeList({ pageSize: 5 }).then(function (res) {
            if (res.code == 0) {
                that.setData({
                    noticeList: res.data
                });
            }
        })
    },
    toSearch: function () {
        this.setData({
            curPage: 1
        });
        this.getGoodsList(this.data.activeCategoryId);
    },
    // 以下为搜索框事件
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    // 以下为砍价业务
    kanjiaGoods() {
        const _this = this
        WXAPI.kanjiaList().then(function (res) {
            if (res.code == 0) {
                _this.setData({
                    kanjiaList: res.data.result,
                    kanjiaGoodsMap: res.data.goodsMap
                })
            }
        })
    },
    goCoupons: function (e) {
        wx.navigateTo({
            url: "/pages/coupons/index"
        })
    },
    pingtuanGoods() { // 获取团购商品列表
        const _this = this
        WXAPI.goods({
            pingtuan: true
        }).then(res => {
            if (res.code === 0) {
                _this.setData({
                    pingtuanList: res.data
                })
            }
        })
    },
    goMap(e) { // 打开地图
        const id = e.currentTarget.dataset.id
        const item = this.data.shopSubList.find(ele => {
            return ele.id == id
        })
        wx.openLocation({
            latitude: item.latitude,
            longitude: item.longitude,
            name: item.name,
            address: item.address
        })
    },
    callPhone(e) {
        const tel = e.currentTarget.dataset.tel
        wx.makePhoneCall({
            phoneNumber: tel
        })
    }
})