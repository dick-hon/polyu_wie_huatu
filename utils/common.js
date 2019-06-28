 // common.js define all request function
 // can use post method 

 function requestTestOption(callback, temp) {
     var api_url = "https://huatu.project.tszho.me/api/test/multiple_choice/testOption_mc.php?q_id=" + temp;
     wx.request({
         url: api_url,
         headers: {
             'Content-Type': 'application/json'
         },
         success: res => {
             if (res.data) {
                 //console.log('common.js : get loged')
                 return typeof callback == "function" && callback(res.data, temp)
             } else {
                 return typeof callback == "function" && callback(false, temp)
             }
         },
         fail: function(res) {
             console.log("testAns failed");
         }
     })
 }

 function requestTestDetail(callback, temp) {
     var api_url = "https://huatu.project.tszho.me/api/test/multiple_choice/testDetail_mc.php?q_id=" + temp;
     wx.request({
         url: api_url,
         headers: {
             'Content-Type': 'application/json'
         },
         success: res => {
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, temp)
             } else {
                 return typeof callback == "function" && callback(false, temp)
             }
         },
         fail: function(res) {
             console.log("testAns failed");
         }
     })
 }

 function requestTestResult(callback, user_id) {
     console.log(user_id);
     wx.request({
         url: "https://huatu.project.tszho.me/api/test/test_result/requestTestResult.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             user_id: user_id
         },
         success: res => {
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             console.log("testAns failed");
         }
     })
 }

 function submitTestResult(resultData) {
     wx.request({
         url: "https://huatu.project.tszho.me/api/test/test_result/submitTestResult_mc.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             //TODO: user_id;
             q_id: resultData[0],
             user_answer: resultData[1],
             isCorrect: resultData[2]
         }
     })
 }

 function requestUserData(callback, user_id) {
     var api_url = 'https://huatu.project.tszho.me/api/user/getUserInfo.php?user_id=' + user_id;
     wx.request({
         url: api_url,
         header: {
             'Content-Type': 'application/json'
         },
         success: res => {
             if (res.data) {
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             console.log("common.js getUser data failed");
         }
     })
 }

function requestTestResult_Option(callback, user_id) {
    console.log(user_id);
    wx.request({
        url: "https://huatu.project.tszho.me/api/test/test_result/requestTestResult_Option.php",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
            user_id: user_id
        },
        success: res => {
            if (res.data) {
                //console.log('common.js : get loged2')
                return typeof callback == "function" && callback(res.data, user_id)
            } else {
                return typeof callback == "function" && callback(false, user_id)
            }
        },
        fail: function (res) {
            console.log("testAns failed");
        }
    })
}

function requestArticle(callback, level_id) {
    wx.request({
        url: "https://huatu.project.tszho.me/api/article/requestArticle.php",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
            level_id: level_id
        },
        success: res => {
            if (res.data) {
                //console.log('common.js : get loged2')
                return typeof callback == "function" && callback(res.data, level_id)
            } else {
                return typeof callback == "function" && callback(false, level_id)
            }
        },
        fail: function (res) {
            console.log("requestArticle failed");
        }
    })
}

function requestArticleSpecific(callback, article_id) {
    wx.request({
        url: "https://huatu.project.tszho.me/api/article/requestArticleSpecific.php",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
            article_id: article_id
        },
        success: res => {
            if (res.data) {
                //console.log('common.js : get loged2')
                return typeof callback == "function" && callback(res.data, article_id)
            } else {
                return typeof callback == "function" && callback(false, article_id)
            }
        },
        fail: function (res) {
            console.log("requestArticleSpecific failed");
        }
    })
}
 //This define the app.func.requestTestOption at test.js page.
 module.exports = {
     requestTestOption: requestTestOption,
     requestTestDetail: requestTestDetail,
     requestTestResult: requestTestResult,
     requestTestResult_Option: requestTestResult_Option,
     requestUserData: requestUserData,
     submitTestResult: submitTestResult,
     requestArticle: requestArticle,
     requestArticleSpecific: requestArticleSpecific
 }