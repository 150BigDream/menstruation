//app.js
App({
  globalData:{
    token:'',
    openid:''
  },
  onLaunch: function () {
      this.login();
  },
  login(){
    console.log("执行了操作1");
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        console.log("进来了吗！！");
        console.log(code);
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
           this.globalData.openid = res.data;
           console.log(this.globalData.openid);
           wx.request({
            url: 'http://localhost:8081/reLogin',
            method:'get',
            data:{
            openid:this.globalData.openid,
            },
            success:(res) =>{
              console.log(res.data);
              console.log(res.data === 1);
            if(res.data === 1){
              console.log("进来了吗");
            wx.reLaunch({
              url: '../X/pages/home/home',
            })
          }
            else{
              wx.reLaunch({
                url: '../X/pages/login-wang/login-wang',
              })
            }
          
            }
           })
           //进行本地存储
           wx.setStorageSync('token', token);
          }
        })
      },

  // chek_token(token){
  //   console.log("执行了操作2");
  //   wx.request({
  //     url: 'http://localhost:8081/cis',
  //     method:'post',
  //     header:{
  //       token
  //     },
  //     success: function(res){
  //       console.log(res);
  //     },
  //     fail:function(res){
  //       console.log(res);
  //     }
  //   })
  // globalData: {
  //   userInfo: null
  // }
  // },
})
}
})