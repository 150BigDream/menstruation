// pages/profile/profile.js
//TODO 图片要改
Page({
  data: {
    userinfo:null,
    serviceList: [
      { icon: 'cart.png', info: '提醒设置', url: 'remind' },//注意要有空格，才是string，否則是any
      { icon: 'vip.png', info: '关于我们', url: 'about' }
    ]
  },
  login() {
    wx.login({
      complete: (res) => { },
      fail: (res) => { },
      success: (result) => {
        this.setData.userinfo=wx.getUserInfo({
          complete: (res) => {},
        })
       },
      timeout: 0,
    })
  },
  onLoad: function (options) {


  },
})