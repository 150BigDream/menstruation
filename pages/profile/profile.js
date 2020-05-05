// pages/profile/profile.js
//TODO 图片要改
Page({
  data: {
    serviceList: [
      { icon: 'cart.png', info: '提醒设置',url: 'remind' },//注意要有空格，才是string，否則是any
      { icon: 'vip.png', info: '关于我们',url: 'about' }
    ]
  },
  onLoad: function (options) {


  },
})