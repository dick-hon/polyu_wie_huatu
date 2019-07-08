 // common.js define all request function
 // can use post method 
 function requestTestResult(callback, user_id) {
     console.log(user_id);
     wx.showLoading({
         title: '加载中',
     })
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
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
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
             q_id: resultData[0],
             user_answer: resultData[1],
             isCorrect: resultData[2],
             userID: resultData[3]
         },
         success: res => {
             //wx.hideLoading();
         },
         fail: function(res) {
             //wx.hideLoading();
         }
     })
 }

 function requestUserData(callback, user_id) {
     wx.showLoading({
         title: '加载中',
     })
     var api_url = 'https://huatu.project.tszho.me/api/user/getUserInfo.php?user_id=' + user_id;
     wx.request({
         url: api_url,
         header: {
             'Content-Type': 'application/json'
         },
         success: res => {
             wx.hideLoading();
             if (res.data) {
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("common.js getUser data failed");
         }
     })
 }

 function requestArticle(callback, level_id) {
     wx.showLoading({
         title: '加载中',
     })
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
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, level_id)
             } else {
                 return typeof callback == "function" && callback(false, level_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("requestArticle failed");
         }
     })
 }

 function requestArticleSpecific(callback, article_id) {
     wx.showLoading({
         title: '加载中',
     })
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
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, article_id)
             } else {
                 return typeof callback == "function" && callback(false, article_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("requestArticleSpecific failed");
         }
     })
 }

 function requestJsonQuestionRecord(callback, q_num) {
     wx.showLoading({
         title: '加载中',
     })
     wx.request({
         url: "https://huatu.project.tszho.me/api/test/multiple_choice/json_questionRecord.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             q_num: q_num
         },
         success: res => {
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, q_num)
             } else {
                 return typeof callback == "function" && callback(false, q_num)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("requestJsonQuestionRecord failed");
         }
     })
 }

 function requestCollection(callback, user_id) {
     wx.showLoading({
         title: '加载中',
     })
     wx.request({
         url: "https://huatu.project.tszho.me/api/collection/requestCollection.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             user_id: user_id
         },
         success: res => {
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("requestCollection failed");
         }
     })
 }

 function submitCollection(submitData) {
     wx.showLoading({
         title: '加载中',
     })
     wx.request({
         url: "https://huatu.project.tszho.me/api/collection/submitCollection.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             //TODO: user_id;
             article_id: submitData[0],
             user_id: submitData[1]
         },
         success: res => {
             wx.hideLoading();
             console.log("submitCollection successed");
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("submitCollection failed");
         }
     })
 }

 function requestCollectionSpecific(callback, user_id) {
     wx.showLoading({
         title: '加载中',
     })
     wx.request({
         url: "https://huatu.project.tszho.me/api/collection/requestCollectionSpecific.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
             user_id: user_id
         },
         success: res => {
             wx.hideLoading();
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data, user_id)
             } else {
                 return typeof callback == "function" && callback(false, user_id)
             }
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("requestCollectionSpecific failed");
         }
     })
 }

function cancelCollection(cancelData) {
    wx.showLoading({
        title: '加载中',
    })
     wx.request({
         url: "https://huatu.project.tszho.me/api/collection/cancelCollection.php",
         header: {
             "Content-Type": "application/x-www-form-urlencoded"
         },
         method: "POST",
         data: {
            collection_id: cancelData
         },
         success: res => {
             wx.hideLoading();
             console.log("cancelCollection successed");
         },
         fail: function(res) {
             wx.hideLoading();
             console.log("cancelCollection failed");
         }
     })
 }
 //This define the app.func.requestTestOption at test.js page.
 module.exports = {
     requestTestResult: requestTestResult,
     requestUserData: requestUserData,
     submitTestResult: submitTestResult,
     requestArticle: requestArticle,
     requestArticleSpecific: requestArticleSpecific,
     requestJsonQuestionRecord: requestJsonQuestionRecord,
     requestCollection: requestCollection,
     submitCollection: submitCollection,
     requestCollectionSpecific: requestCollectionSpecific,
     cancelCollection: cancelCollection
 }