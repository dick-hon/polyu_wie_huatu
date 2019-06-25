const app = getApp()

Page({
    data: {
        testDetail: {}, //title, ans
        testOption: {}, //mc
        current: 1,
        percent: 10,
        status: 'normal',
        question_number: 1,
        result: []
    },
    handleChange({
        detail
    }) { //suppose don't have next question, but now for testing only
        const type = detail.type;
        if (type === 'next') {
            this.setData({
                current: this.data.current + 1,
                percent: this.data.percent + 10,
                question_number: this.data.question_number + 1
            });
            if (this.data.percent === 100) {
                this.setData({
                    status: 'success'
                });
            }
            console.log(this.data.question_number);

            // fetch data from db
            var temp = this.data.question_number;

            var that = this;
            
            app.func.requestTestOption(function(testOption) {
                console.log(testOption);
                that.setData({
                    testOption: testOption
                });
            }, temp)

            var that2 = this;
            app.func.requestTestDetail(function(testDetail) {
                console.log(testDetail);
                that.setData({
                    testDetail: testDetail
                });
            }, temp)


        } else if (type === 'prev') {
            this.setData({
                current: this.data.current - 1,
                percent: this.data.percent - 10,
                status: 'normal'
            });
            if (this.data.percent === 0) return;
            this.setData({
                question_number: this.data.question_number - 1
            })
            console.log(this.data.question_number);
            //fetch data from db
            var temp = this.data.question_number;

            var that = this;
            app.func.requestTestOption(function(testOption) {
                console.log(testOption);
                that.setData({
                    testOption: testOption
                });
            }, temp)

            var that2 = this;
            app.func.requestTestDetail(function(testDetail) {
                console.log(testDetail);
                that.setData({
                    testDetail: testDetail
                });
            }, temp)
        }
        if (this.data.percent === 100) return;

    },
    onShow() {
        console.log(this.data.question_number);
        var temp = this.data.question_number;

        var that = this;
        app.func.requestTestOption(function(testOption) {
            console.log(testOption);
            that.setData({
                testOption: testOption
            });
        }, temp)

        var that2 = this;
        app.func.requestTestDetail(function(testDetail) {
            console.log(testDetail);
            that.setData({
                testDetail: testDetail
            });
        }, temp)
    },
    checkAnswer: function(e) { //to create a button for answering the questions 
        console.log(e.currentTarget.dataset.id);
        var isCorrect;
        //console.log(this.data.testDetail[0].question_answer); //undefined
        if (e.currentTarget.dataset.id == this.data.testDetail[0].question_answer) {
            isCorrect = 0;
            wx.showToast({
                title: '恭喜!! 答對了!',
                icon: '',
                image: '../../../img_temp/correct.png',
                duration: 1500,
                mask: true,
                success: function(res) {
                    setTimeout(function() {
                        //wx.navigateBack()
                    }, 1500)
                },
            })
            //TODO: CHECK CONDITION HERE
            if (this.data.percent === 100) {
                this.setData({
                    status: 'success'
                });
            }
            this.setData({
                current: this.data.current + 1,
                percent: this.data.percent + 10,
                question_number: this.data.question_number + 1
            })
            console.log(this.data.question_number);
            // fetch data from db
            var temp = this.data.question_number;
            // var temp = [this.data.question_number, this.data.status];

            var that = this;
            app.func.requestTestOption(function(testOption) {
                console.log(testOption);
                that.setData({
                    testOption: testOption
                });
            }, temp)
            var that2 = this;
            app.func.requestTestDetail(function(testDetail) {
                console.log(testDetail);
                that.setData({
                    testDetail: testDetail
                });
            }, temp)
        } else {
            isCorrect = 1;
            wx.showToast({
                title: '對不起, 錯了!',
                icon: '',
                image: '../../../img_temp/wrong.png',
                duration: 1500,
                mask: true,
                success: function(res) {
                    setTimeout(function() {
                        //wx.navigateBack()
                    }, 1500)
                },
            })

            if (this.data.percent === 100) {
                this.setData({
                    status: 'success'
                });
            }
            this.setData({
                current: this.data.current + 1,
                percent: this.data.percent + 10,
                question_number: this.data.question_number + 1
            })
            console.log(this.data.question_number);
            // fetch data from db
            var temp = this.data.question_number;

            var that = this;
            app.func.requestTestOption(function(testOption) {
                console.log(testOption);
                that.setData({
                    testOption: testOption
                });
            }, temp)

            var that2 = this;
            app.func.requestTestDetail(function(testDetail) {
                console.log(testDetail);
                that.setData({
                    testDetail: testDetail
                });
            }, temp)
        }
        //to pass the corrsponding question result to db

        var resultData = [this.data.question_number, e.currentTarget.dataset.id, isCorrect];
        console.log('===========');
        console.log(resultData);
        app.func.requestTestResult(resultData);;
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})