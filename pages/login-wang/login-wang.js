//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
            else if(res.cancel){
              console.log("登陆失败");
              wx.showToast({
                title: '登陆失败',
                icon: 'loading'
              })
            }
          },
      })
    },
  })