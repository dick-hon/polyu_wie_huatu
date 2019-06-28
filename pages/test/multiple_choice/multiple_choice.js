const app = getApp()
const { $Message } = require('../../../library/iview/base/index');

Page({
    data: {
        testDetail: {}, //title, ans
        testOption: {}, //mc
        testResult: {},
        testResult_Option: {},
        percent: 0, //bar
        status: 'normal',
        question_number: 1,
        result: [],
        activeName: '1',
        test_title: ''
    },
    onChange(event) {
        this.setData({
            activeName: event.detail
        });
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
    onShow(options) {
        /*
        console.log(this.options.id);
        this.setData({
            test_title: this.options.id
        })
        */

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
            isCorrect = 1;
            //audio sounds
            app.globalData.audio_correct.play();
            wx.showToast({
                title: '恭喜!! 答對了!',
                icon: '',
                image: '../../../img_temp/correct.png',
                duration: 1000,
                mask: true,
                success: function(res) {
                    setTimeout(function() {
                        //wx.navigateBack()
                    }, 500)
                },
            })
        } else {
            isCorrect = 0;
            //audio
            app.globalData.audio_fighting.play();
            wx.showToast({
                title: '對不起, 錯了!',
                icon: '',
                image: '../../../img_temp/wrong.png',
                duration: 1000,
                mask: true,
                success: function(res) {
                    setTimeout(function() {
                        //wx.navigateBack()
                    }, 500)
                },
            })
        }
        //to pass the corrsponding question result to db
        var resultData = [this.data.question_number, e.currentTarget.dataset.id, isCorrect];
        app.func.submitTestResult(resultData);
        //TODO: CHECK CONDITION HERE
        this.setData({
            percent: this.data.percent + 10,
            question_number: this.data.question_number + 1
        })
        if (this.data.percent === 100) {
            this.setData({
                status: 'success'
            });
        }
        if (this.data.question_number <= 10) {
            if (this.data.question_number == 6) {
                $Message({
                    content: '還差5題!!加油!'
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
        } else {
            wx.showToast({
                title: '完成了!',
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
            //audio
            app.globalData.audio_result.play();

            var user_id = 1; // for testing only
            var that3 = this;
            app.func.requestTestResult(function(testResult) {
                console.log(testResult);
                that3.setData({
                    testResult: testResult
                });
            }, user_id)

            var that4 = this;
            app.func.requestTestResult_Option(function(testResult_Option) {
                console.log(testResult_Option);
                that4.setData({
                    testResult_Option: testResult_Option
                });
            }, user_id)

        }
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})