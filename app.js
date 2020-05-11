//app.js
App({
  globalData:{
    token:''
  },
  onLaunch: function () {
    const token = wx.getStorageSync('token');
    console.log(token);
    //判断token是否有值
    if(token && token.length !=0){
     //已经存在token，验证token是否过期
     //this.chek_token();
     wx.redirectTo({
      url: "/pages/DataAnalysis-wang/DataAnalysis-wang",
    })
    }else{
      this.login();
    }},
  login(){
    console.log("执行了操作1");
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        wx.request({
          url: 'http://localhost:8081/cis',
          method:'get',
          data:{
          code:code
          },
          success:(res) =>{
            //取出token
            const token = res.data.code;
            //将token保存在globalDATa中
           this.globalData.token = token;
           //进行本地存储
           wx.setStorageSync('token', token);
          }
        })
      }
    })
  },
  chek_token(token){
    console.log("执行了操作2");
    wx.request({
      url: 'http://localhost:8081/cis',
      method:'post',
      header:{
        token
      },
      success: function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      }
    })
  globalData: {
    userInfo: null
  }
  }
})