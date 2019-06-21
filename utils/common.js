 // common.js define all request function

 function requestTestOption(callback) {
     wx.request({
         url: 'http://localhost/huatu/testAns_mc.php',
         headers: {
             'Content-Type': 'application/json'
         },
         success: res => {
             if (res.data) {
                 //console.log('common.js : get loged')
                 return typeof callback == "function" && callback(res.data)
             } else {
                 return typeof callback == "function" && callback(false)
             }
         },
         fail: function(res) {
             console.log("testAns failed");
         }
     })
 }

function requestTestDetail(callback) {
     wx.request({
         url: 'http://localhost/huatu/testAns_ans.php',
         headers: {
             'Content-Type': 'application/json'
         },
         success: res => {
             if (res.data) {
                 //console.log('common.js : get loged2')
                 return typeof callback == "function" && callback(res.data)
             } else {
                 return typeof callback == "function" && callback(false)
             }
         },
         fail: function(res) {
             console.log("testAns failed");
         }
     })
 }

 //This define the app.func.requestTestOption at test.js page.
 module.exports = {
     requestTestOption: requestTestOption,
     requestTestDetail: requestTestDetail,
 }