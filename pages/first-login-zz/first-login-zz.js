// pages/first-login-zz/first-login-zz.js
const appInstance = getApp()

Page({
  data: {
    lastStart: '',
    fsustainDay: null,
    fintervalDay: null,
    array: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    interval: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  },
  
  //TODO 选piker2 3也会变？
  bindDateChange: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    var lastStart=this.data.lastStart
    this.setData({
      lastStart : e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    var fsustainDay=this.data.fsustainDay
    this.setData({
      index: e.detail.value,
      fsustainDay: this.data.array[e.detail.value]
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker3发送选择改变，携带值为', e.detail.value)
    var fintervalDay=this.data.fintervalDay
    this.setData({
      index: e.detail.value,
      fintervalDay:this.data.interval[e.detail.value]
    })
  },

  submit:function(){
    wx.request({
      url: 'http://127.0.0.1:8081/submit',
      data:{
        lastStart:this.data.lastStart,
        fsustainDay:this.data.fsustainDay,
        fintervalDay:this.data.fintervalDay,
        openID: appInstance.openID
      },   
      success:(res)=>{
        wx.navigateBack({
        })
      }   
    })
  }
})