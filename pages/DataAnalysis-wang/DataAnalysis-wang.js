// pages/index1/index1.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   day1:'',
   day2:'',
   day2Advice1:'',
   day2Advice2:'',
   breakfast:'',
   exersize:'',
   earlyTobed:'',
   reading:'',
   drinkwater:'',
  },
  
  onLoad:function(){
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
    wx.request({
      url: 'http://localhost:8081/day',
      method:'get',
      data:{
      time:time,
      openid:getApp().globalData.openid,
      },
      success:(res) =>{
        this.setData({
          day1: res.data.day1
        })
        this.setData({
          day2: res.data.day2
        })
        if(res.data.day1>27 && res.data.day1<33)
          this.setData({
            day1Advice1:'本月生理期正常',
            day1Advice2:'生理期期间多喝热水，少吃生冷食物',
          })
        else
        this.setData({
          day1Advice1:'本月生理期偏离正常周期',
          day1Advice2:'多多注意身体，生理期要忌口！',
        })
        
        if(res.data.吃早餐<res.data.day2)
        this.setData({
          breakfast: '吃早餐次数少于'+res.data.day2+'次，早餐不规律哦！'
        })
        else
        this.setData({
          breakfast: '最近有坚持吃早餐！'
        })
        if(res.data.锻炼<res.data.day2)
        this.setData({
          exersize: '锻炼次数为'+res.data.锻炼+'次，多多增加锻炼哦！'
        })
        else
        this.setData({
          exersize: '最近有坚持锻炼！'
        })
        if(res.data.阅读<res.data.day2)
        this.setData({
          reading: '阅读次数为'+res.data.阅读+'次，早餐不规律哦！'
        })
        else
        this.setData({
          reading: '最近有坚持阅读哦！'
        })
        if(res.data.早睡<res.data.day2)
        this.setData({
          earlyTobed: '早睡次数为'+res.data.早睡+'次，早睡对皮肤好哦！'
        })
        else
        this.setData({
          earlyTobed: '最近有坚持早睡！'
        })
        if(res.data.喝水<res.data.day2)
        this.setData({
          drinkwater: '喝水次数为'+res.data.喝水+'次，多喝水强身健体！'
        })
        else
        this.setData({
          drinkwater: '最近有坚持喝水！'
        })
      }
    })
   },
  })