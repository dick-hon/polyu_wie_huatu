 // common.js define all request function

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

 //This define the app.func.requestTestOption at test.js page.
 module.exports = {
     requestTestOption: requestTestOption,
     requestTestDetail: requestTestDetail,
 }