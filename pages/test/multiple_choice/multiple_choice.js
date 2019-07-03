const app = getApp()
const {
    $Message
} = require('../../../library/iview/base/index');

Page({
    data: {
        testDetail: {}, //title, ans
        testOption: {}, //mc
        testResult: {},
        testResult_Option: {},
        percent: 0, //bar
        status: 'normal',
        numberOfQuestion: 10,
        question_number: 9, //starts from index[0]
        result: [],
        activeName: '1',
        level_id: '',
        json_questionRecord: {} //to stores all question records in json
    },
    onChange(event) {
        this.setData({
            activeName: event.detail
        });
    },
    onShow(options) {
        //console.log(this.options.id);
        this.setData({
            level_id: this.options.id
        })
        //console.log(this.data.numberOfQuestion);
        var temp = this.data.numberOfQuestion;
        var that = this;
        app.func.requestJsonQuestionRecord(function(json_questionRecord) {
            console.log(json_questionRecord);
            that.setData({
                json_questionRecord: json_questionRecord
            });
        }, temp)
    },
    checkAnswer: function(e) { //to create a button for answering the questions 
        console.log(e.currentTarget.dataset.id);
        var isCorrect;
        //console.log(this.data.testDetail[0].question_answer); //undefined
        if (e.currentTarget.dataset.id == this.data.json_questionRecord[this.data.question_number].question_answer) {
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
        var resultData = [this.data.json_questionRecord[this.data.question_number].q_id, e.currentTarget.dataset.id, isCorrect];
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
        if (this.data.question_number <= 9) {
            if (this.data.question_number == 5) {
                $Message({
                    content: '還差5題!!加油!'
                });
            }
            //console.log(this.data.question_number);
            console.log(this.data.json_questionRecord[this.data.question_number]);
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
        }
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})