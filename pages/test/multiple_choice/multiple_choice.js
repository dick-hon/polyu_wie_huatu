const app = getApp()

Page({
    data: {
        testDetail: {}, //title, ans
        testOption: {},
        current: 1,
        percent: 10,
        status: 'normal'
    },
    handleChange({detail}) {
        const type = detail.type;
        if (type === 'next') {
            this.setData({
                current: this.data.current + 1,
                percent: this.data.percent + 10
            });
            if (this.data.percent === 100) {
                this.setData({
                    status: 'success'
                });
            }
        } else if (type === 'prev') {
            this.setData({
                current: this.data.current - 1,
                percent: this.data.percent - 10,
                status: 'normal'
            });
            if (this.data.percent === 0) return;
        }
        if (this.data.percent === 100) return;
        
    },
    onShow() {
        var that = this;
        app.func.requestTestOption(function (testOption) {
            console.log(testOption);
            //console.log(ans[0].answer_id);
            that.setData({
                testOption: testOption
            });
        })

        var that2 = this;
        app.func.requestTestDetail(function (testDetail) {
            console.log(testDetail); //ok
            that.setData({
                testDetail: testDetail
            });
            //console.log("after setData");
            //console.log(testDetail); //ok
        })
    },
    checkAnswer: function(e) { //to create a button for answering the questions 
        console.log(e.currentTarget.dataset.id);
        //console.log(this.data.testDetail[0].question_answer); //undefined
        if (e.currentTarget.dataset.id == this.data.testDetail[0].question_answer) {
            wx.showToast({
                title: '恭喜!! 答對了!',
                icon: '',
                image: '../../../img_temp/correct.png',
                duration: 1500,
                mask: true,
                success: function (res) {
                    setTimeout(function () {
                        //wx.navigateBack()
                    }, 1500)
                },
            })
        } else {
            wx.showToast({
                title: '再試一次吧!',
                icon: '',
                image: '../../../img_temp/wrong.png',
                duration: 1500,
                mask: true,
                success: function (res) {
                    setTimeout(function () {
                        //wx.navigateBack()
                    }, 1500)
                },
            })
        }
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})