//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    openid:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   handGetUserInfo(e){
      const{userInfo} = e.detail;
      wx.setStorageSync('userinfo', userInfo);
      console.log(userInfo.nickName);
      const name =userInfo.nickName;
      wx.showModal({
        cancelColor: 'cancelColor',
        title :'微信登陆',
        content:'是否使用微信登陆',
        cancelText:'否',
        confirmText:'是',
        success(res){
          if(res.confirm){
            wx.switchTab({
              url: "../login-wang/login-wang",
            })
          }
          else if(res.cancel){
            console.log("登陆失败");
            wx.showToast({
              title: '登陆失败',
              icon: 'loading'
            })
          }
          console.log("jin");
           wx.request({
             url: 'http://localhost:8081/name',
             method:'get',
             data:{
               name:name
             }
            })  
            wx.redirectTo({
              url: "../DataAnalysis-wang/DataAnalysis-wang",
            })}
          })
        }
    
  })