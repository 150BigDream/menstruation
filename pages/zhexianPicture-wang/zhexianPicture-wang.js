// pages/canvas/index.js
Page({
  canvasIdErrorCallback: function(e) {
   console.error(e);
  },
  /**
  * 页面的初始数据
  */
  data: {
   canvasWidth: 0,
   canvasHeight: 300,
   canvasDefaultVal: {
     maxVal: 0,
     totalData: 0,
     data: []
   },
   zheAdvice:'',
   ZheLength:0,

  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function(e) {
   var _this = this;
   wx.getSystemInfo({
     success: function(res) {
       _this.setData({
         canvasWidth: res.windowWidth - 3
       });
     },
   })
  },
  
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function() {
   var ctx = wx.createCanvasContext("curve-img");
   ctx.setFillStyle('red')
   ctx.setStrokeStyle('green')
   ctx.setLineJoin('miter')
   var max = 0;
   var min = 1000;
   var dataValue = [];
   wx.request({
    url: 'http://localhost:8081/zhexian',
    method:'get',
    data:{
      openid:getApp().globalData.openid,
    },
    success:(res) =>{
      if(res.data.length ===1)
       dataValue = [["第一次",0]];
      else if(res.data.length ===2)
       dataValue =[["第一次",0],["第二次",0]];
     else if(res.data.length ===3)
       dataValue =[["第一次",0],["第二次",0],["第三次",0]];
      else if(res.data.length ===4)
       dataValue =[["第一次",0],["第二次",0],["第三次",0],["第四次",0]];
       else if(res.data.length ===5)
       dataValue =[["第一次",0],["第二次",0],["第三次",0],["第四次",0],["第五次",0]];
       else if(res.data.length ===6)
       dataValue =[["第一次",0],["第二次",0],["第三次",0],["第四次",0],["第五次",0],["第六次",0]];
     for(var i=0;i<res.data.length;i++){
       if(max<res.data[i])
       max = res.data[i];
       if(min>res.data[i])
       min = res.data[i];
     dataValue[i][1] = res.data[i];
      dataValue[i][1] = res.data[i];
     }
     max = max-min;//算出来最大值和最小值之间的差距
     if(max>7)
     this.setData({
       zheAdvice:'有浮动过大的生理周期，多多注意！'
     })
     else
     this.setData({
      zheAdvice:'生理期相对平稳！'
    })
   //初始化 画布
   this.oncInit(ctx, dataValue);
   // 绘制图形表与数据连线
   this.onDrawingXY(ctx);
   ctx.draw();
  }
})
},
  oncInit: function(ctx, data) {
   // 设置X轴默认总值
   let totalX = 6;
   // 设置最大值、宽度、高度值
   var maxVal = 0,
    totalData = data.length,
    cWidth = this.data.canvasWidth,
     totalData = data.length;
   var cWidth = this.data.canvasWidth,
     cHeight = this.data.canvasHeight;
   for (let i = 0; i < totalData; i++) {
     let val = parseInt(data[i][1]);
     if (val > maxVal) {
       maxVal = val;
     }
   }
   maxVal+=3;
   // 初始化图
   ctx.setFillStyle = "#888888";
   ctx.beginPath();
   ctx.setLineWidth(1);
   ctx.moveTo(3, cHeight);
   //ctx.lineTo(cWidth , cHeight);
   ctx.lineTo(cWidth + 3, cHeight);
   ctx.stroke();
   ctx.closePath();
   // 设置全局变量
   this.setData({
     canvasDefaultVal: {
       data: data,
       maxVal: maxVal,
       maxValMean: maxVal / (totalX),
       totalData: totalData,
       totalX: totalX,
       totalY: totalData,
       xMarign: cHeight / (totalX + 1),
       yMarign: cWidth / (totalData)
      // yMarign: cWidth / totalData
     },
     canvasHeight: cHeight
   });
  
  },
  onDrawingXY: function(ctx) {
   var xMarign = 0,
     yMarign = 0,
     data = this.data.canvasDefaultVal.data,
     mean = 0,
     meanVal = parseInt(this.data.canvasDefaultVal.maxVal),
     listX = [],
     listY = [],
     rise_val = 0;
   // 绘制 X 轴
   for (let i = 0; i < this.data.canvasDefaultVal.totalX; i++) {
     let val = 0;
     ctx.beginPath();
     meanVal = parseInt(this.data.canvasDefaultVal.maxVal) - mean;
     xMarign += parseInt(this.data.canvasDefaultVal.xMarign);
     mean += parseInt(this.data.canvasDefaultVal.maxValMean);
     ctx.fillText(meanVal, 4, xMarign);
     this.drawing(ctx, 3, xMarign, this.data.canvasWidth, xMarign);
   }
   // 计算获取 1 = ？ 的距离
   rise_val = parseFloat(this.data.canvasDefaultVal.xMarign / this.data.canvasDefaultVal.maxValMean);
  
   // 绘制 Y 轴
   for (let i = 0; i < this.data.canvasDefaultVal.totalY; i++) {
     ctx.beginPath();
     yMarign += (parseInt(this.data.canvasDefaultVal.yMarign) - 1);
     ctx.fillText(data[i][0], yMarign - 25, this.data.canvasHeight);
     
     // 绘制线条
     // this.drawing(ctx, yMarign, 0, yMarign, this.data.canvasHeight);
  
     // 计算绘制圆点坐标
     let x = 0;
     x = data[i][1] * rise_val;
     x = (this.data.canvasHeight) - (x+2);
     ctx.beginPath();
     ctx.arc(yMarign, x, 3, 0, Math.PI * 2, true);
     ctx.fillText(data[i][1], yMarign - 25, x + 10);
     ctx.stroke();
     ctx.closePath();
     ctx.fill();
  
     // 绘制点线条
     listX[i] = yMarign;
     listY[i] = x;
     ctx.beginPath();
     this.dotDrawing(ctx, listX, listY);
     ctx.stroke();
     ctx.closePath();
   }
  
   
  
  },
  drawing: function(ctx, x, y, X, Y) {
   ctx.setLineWidth(1);
   ctx.moveTo(x, y);
   ctx.lineTo(X, Y);
   ctx.stroke();
   ctx.closePath();
  },
  dotDrawing: function (ctx,xList,yList){
   for(let i=0;i<xList.length-1;i++){
     ctx.setLineWidth(1);
     ctx.moveTo(xList[i], yList[i]);
     ctx.lineTo(xList[i+1], yList[i+1]);
     
   }
  }

  })