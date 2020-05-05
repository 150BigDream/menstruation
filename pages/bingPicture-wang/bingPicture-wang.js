//logs.js
// const util = require('../../utils/util.js')

var Charts = require('../../utils/wxcharts');       //引入wxcharts.js  
const app = getApp()
Page({
  data:{
   drink:'',
   exercise:'',
   getupEarly:'',
   breakfast:'',
   reading:''
  },
 //！！！！！饼图
  onReady: function () {
    // 页面渲染完成
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext();
    wx.request({
      url: 'http://localhost:8081/bing',
      success:(res)=>{
        this.setData({
          drink:res.data[0]
 
        })
        this.setData({
          exercise:res.data[1]
          
        })
        this.setData({
          getupEarly:res.data[2]
        })
        this.setData({
          breakfast:res.data[3]
         
        })
        this.setData({
          reading:res.data[4]
        })

    // 画饼图
    //var array = [30, 20, 12, 10,2,2];// 数据源
    var colors = ["#f091f0", "#3173e7", "#5eadef", "#fcca4c","#f1f9fe","#00ff00"];// 颜色
    var total = 24;//总数
    let { screenWidth, screenHeight } = wx.getSystemInfoSync();//获取屏幕宽度
    var canvasWidth = screenWidth * 0.94 - 20;//获取canvas宽度
    //    定义圆心坐标
    var point = { x: canvasWidth / 2 , y: 120 };
    //    定义半径大小
    var radius = [120,110,95,80,65,50];
    /*    循环遍历所有的pie */
    for (var i = 0; i < res.data.length; i++) {
      context.beginPath();
      //多层饼图循环
      for (i = 0; i < res.data.length;i++){
      //    1.先计算始末弧度
 //判断手机类型 解决小程序canvas在Android上显示不全的bug
        if (this.data.brand == 'iPhone') {
          var start = 1.2 * Math.PI; //起点弧度
          var end = res.data[i] / total * 2 * Math.PI + 1.2 * Math.PI;//结束弧度
        } else {
          var start = 1.2 * Math.PI; //起点弧度
          //结束弧度 添加0.0000001的误差，避免始末弧度相差360度，安卓不显示的问题
          var end = (res.data[i] / total - 0.0000001) * 2 * Math.PI + 1.2 * Math.PI;
        }
    
      //    3.添加阴影效果
      context.shadowOffsetX = 5; // 阴影Y轴偏移
      context.shadowOffsetY = 5; // 阴影X轴偏移
      context.shadowBlur = 10; // 模糊尺寸
      context.shadowColor = 'rgba(0, 0, 0, 0.2)'; // 颜色

      context.arc(point.x, point.y, radius[i], start, end , false);
      //      4.连线回圆心
      context.lineTo(point.x, point.y);
      //      5.填充样式
      context.setFillStyle(colors[i]);
      //      6.填充动作
      context.fill();
      //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
      wx.drawCanvas({
          //指定canvasId,canvas 组件的唯一标识符
          canvasId: 'Canvas'+ i +'',
          actions: context.getActions()
      });
    }
    }  }
  })
  },
 
  })


