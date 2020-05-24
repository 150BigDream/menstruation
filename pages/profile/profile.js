// pages/profile/profile.js
//TODO 图片要改
const app = getApp()

Page({
  data: {
    userinfo: null,
    fintervalDay: null,
    fsustainDay: null,
    serviceList: [
      { icon: 'cart.png', info: '提醒设置', url: 'remind' },
      { icon: 'vip.png', info: '关于我们', url: 'about' }
    ]
  },
  bindgetUserInfo: function () {
    wx.getUserInfo({
      success: (res) => {
        console.log(res.userInfo)
        this.setData({ userinfo: res.userInfo })
      },
    })
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://127.0.0.1:8081/onLogin',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data.openID)
              app.openid=res.data.openID
              if (res.data.fsustainDay == null && res.data.fintervalDay == null) {
                wx.navigateTo({
                  url: '/pages/first-login-zz/first-login-zz',
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onLoad: function (options) {


  },
})